## 🌟 Key Features

- **Dynamic Scales**: Watch Lady Justice tilt based on your ethical score.
- **I gonna Judge you**: A "popped-out" speech bubble delivers witty verdicts.
- **Deep Analysis**: 6 core metrics evaluated via Google Gemini Flash.
- **Professional Reports**: Download an "Official Verdict" PDF of your results.

---

## 🚀 Deployment Guide (Split-Service Setup)

This project is designed for a **monorepo deployment**. You can host the frontend on Vercel and the backend on Render while keeping everything in one GitHub repo.

### 1. Backend (Render.com)

1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Set the following configurations:
   - **Root Directory**: `backend`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn ethics_checker.wsgi:application`
4. Add **Environment Variables** in the Render dashboard:
   - `GEMINI_API_KEY`: (Your Google Gemini Key)
   - `SECRET_KEY`: (A random secure string)
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `your-backend-url.onrender.com,localhost,127.0.0.1`

### 2. Frontend (Vercel)

1. Create a new **Project** on [Vercel](https://vercel.com).
2. Connect the same GitHub repository.
3. In the project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. Add a **Environment Variable**:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com` (The URL you got from Render).
5. Click **Deploy**.

---

## 🛠️ Local Development

### Backend Setup

1. `cd backend`
2. `py -m venv venv`
3. `venv\Scripts\activate`
4. `pip install -r requirements.txt`
5. Create `.env` from `.env.example`.
6. `python manage.py runserver`

### Frontend Setup

1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 🎨 Design Palette

- **Primary Dark**: `#061E29`
- **Primary Light**: `#F3F4F4`
- **Font**: Playfair Display (Serif) & Inter (Sans-Serif for Judge)

## ⚖️ Disclaimer

This tool provides AI-generated estimates and is intended for educational and guidance purposes. It is not a substitute for professional academic or legal review.

---

_Developed with a bit of code and a lot of judgement._
