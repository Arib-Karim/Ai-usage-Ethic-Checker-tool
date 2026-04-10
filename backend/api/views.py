import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google import genai
from google.genai import types

def get_mock_response():
    return {
        "ethical_score": 78,
        "ethical_percentage": "78%",
        "internet_similarity": "65%",
        "internet_similarity_reason": "Phrasing is generic and likely appears in many articles.",
        "result_availability": "2%",
        "result_availability_reason": "This is a very specific prompt that rarely yields direct ready-made answers online.",
        "bias_risk": "15%",
        "bias_risk_reason": "Slightly leans towards a specific viewpoint but no major bias found.",
        "harmful_intent": "5%",
        "harmful_intent_reason": "No harmful or malicious intent detected in the prompt.",
        "originality_score": "55%",
        "originality_score_reason": "The idea is standard; relying on common knowledge rather than novel thought.",
        "safety_score": "85%",
        "safety_score_reason": "Content is safe for public and academic use.",
        "explanation": "This text appears to be a standard query with moderate originality. It looks somewhat inspired by other resources but lacks harmful intent.",
        "suggestions": [
            "Add personal context or examples",
            "Rephrase in your own words",
            "Include your own analysis first"
        ],
        "judging_message": "Pretty clean! Your professor would probably not suspect a thing. 😉"
    }

def get_rate_limit_error():
    return "Objection! The AI Judge is on a court-ordered coffee break. (Rate Limit Hit - Please wait a moment before appealing again.)"

def get_generic_error(msg):
    return f"Objection! The trial has been derailed: {msg}"

@csrf_exempt
def check_ethics(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            text = body.get('text', '')

            if not text or len(text) < 10:
                return JsonResponse({'error': 'Text must be at least 10 characters length.'}, status=400)

            api_key = os.environ.get('GEMINI_API_KEY')
            if not api_key:
                # Return mock data if no key is set, allows development to continue
                return JsonResponse(get_mock_response())

            # Real API call
            client = genai.Client(api_key=api_key)
            
            system_prompt = "You are an AI Ethics Analyzer. Your job is to evaluate text/prompts for ethical AI usage. You must analyze the input and return a structured JSON response. You are slightly sarcastic and judgy, but never mean or offensive. Think of yourself as a witty teaching assistant who's seen it all."
            
            analysis_prompt = f"""Analyze the following text for AI ethics and usage concerns.

TEXT TO ANALYZE:
\"\"\"
{text}
\"\"\"

Evaluate this text and return a JSON object with the following structure.
Be accurate but slightly humorous in your judging_message.

IMPORTANT RULES:
1. ethical_score must be 0-100
2. All percentages must be realistic (not all 0% or 100%)
3. judging_message should match the score tone
4. suggestions should be actionable and specific
5. internet_similarity estimates how likely this exact phrasing exists online
6. result_availability estimates the chance of getting a direct result for the exact prompt/topic from the internet
7. For every stat above, provide a 1-sentence reasoning (e.g. bias_risk_reason) explaining WHY they got that exact score.

Return ONLY valid JSON, no markdown, no explanation outside JSON:
{{
 "ethical_score": <number 0-100>,
 "ethical_percentage": "<number>%",
 "internet_similarity": "<number>%",
 "internet_similarity_reason": "<1-sentence reason>",
 "result_availability": "<number>%",
 "result_availability_reason": "<1-sentence reason>",
 "bias_risk": "<number>%",
 "bias_risk_reason": "<1-sentence reason>",
 "harmful_intent": "<number>%",
 "harmful_intent_reason": "<1-sentence reason>",
 "originality_score": "<number>%",
 "originality_score_reason": "<1-sentence reason>",
 "safety_score": "<number>%",
 "safety_score_reason": "<1-sentence reason>",
 "explanation": "<2-4 sentence analysis>",
 "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
 "judging_message": "<witty one-liner based on score>"
}}"""

            # Real API call with retry for 503
            import time
            max_retries = 3
            response = None
            for i in range(max_retries):
                try:
                    response = client.models.generate_content(
                        model='gemini-flash-latest',
                        contents=analysis_prompt,
                        config=types.GenerateContentConfig(
                            system_instruction=system_prompt,
                            response_mime_type="application/json",
                        ),
                    )
                    break
                except Exception as e:
                    err_str = str(e)
                    if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                        return JsonResponse({'error': get_rate_limit_error()}, status=429)
                    if "503" in err_str and i < max_retries - 1:
                        time.sleep(1)
                        continue
                    return JsonResponse({'error': get_generic_error(err_str)}, status=500)
            
            if not response or not response.text:
                return JsonResponse({'error': 'The AI judge refused to answer (likely safety filtered).'}, status=400)

            # Robust JSON parsing (handles markdown blocks if LLM ignores response_mime_type)
            clean_text = response.text.strip()
            if clean_text.startswith('```'):
                # Extract content between backticks
                lines = clean_text.splitlines()
                if lines[0].startswith('```json'):
                    clean_text = '\n'.join(lines[1:-1])
                else:
                    clean_text = '\n'.join(lines[1:-1])
            
            try:
                result = json.loads(clean_text)
                return JsonResponse(result)
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {str(e)}")
                print(f"Raw response: {response.text}")
                return JsonResponse({'error': f"Failed to parse analysis result: {str(e)}"}, status=500)

        except Exception as e:
            print(f"General Error: {str(e)}")
            return JsonResponse({'error': f"Analysis failed: {str(e)}"}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
