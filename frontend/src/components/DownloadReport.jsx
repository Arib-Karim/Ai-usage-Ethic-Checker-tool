import React from 'react';
import jsPDF from 'jspdf';
import { FaDownload } from 'react-icons/fa';

export default function DownloadReport({ result, promptText }) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Styling constants
    const margin = 20;
    let y = 20;

    // Header
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("AI ETHICS OFFICIAL VERDICT", 105, y, { align: "center" });
    
    y += 15;
    doc.setFontSize(12);
    doc.setFont("times", "italic");
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, y, { align: "center" });

    y += 20;
    doc.setDrawColor(22, 67, 89);
    doc.line(margin, y, 190, y);
    
    // Prompt Section
    y += 15;
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("SUBMITTED PROMPT:", margin, y);
    
    y += 10;
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    const splitPrompt = doc.splitTextToSize(promptText || "N/A", 170);
    doc.text(splitPrompt, margin, y);
    y += (splitPrompt.length * 5) + 10;

    // Results Section
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("ETHICAL ASSESSMENT:", margin, y);
    
    y += 10;
    doc.setFontSize(30);
    doc.setTextColor(29, 78, 216); // Ethic Accent
    doc.text(`${result.ethical_score} / 100`, 105, y, { align: "center" });
    
    y += 15;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(result.ethical_percentage.toUpperCase(), 105, y, { align: "center" });

    y += 20;
    doc.setFontSize(12);
    doc.text("STATS BREAKDOWN:", margin, y);
    y += 10;
    
    const stats = [
      ["Internet Similarity", result.internet_similarity],
      ["Result Availability", result.result_availability],
      ["Bias Risk", result.bias_risk],
      ["Harmful Intent", result.harmful_intent],
      ["Originality Score", result.originality_score],
      ["Safety Score", result.safety_score]
    ];

    stats.forEach(([label, value]) => {
      doc.setFont("times", "bold");
      doc.text(`${label}:`, margin + 5, y);
      doc.setFont("times", "normal");
      doc.text(value, margin + 60, y);
      y += 8;
    });

    y += 10;
    doc.setFont("times", "bold");
    doc.text("VERDICT EXPLANATION:", margin, y);
    y += 8;
    doc.setFont("times", "normal");
    const splitExplanation = doc.splitTextToSize(result.explanation, 170);
    doc.text(splitExplanation, margin, y);
    y += (splitExplanation.length * 5) + 15;

    // Sarcastic Message
    doc.setFont("times", "italic");
    doc.setFontSize(13);
    doc.text(`"${result.judging_message}"`, 105, y, { align: "center" });

    // Footer
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text("This document is an AI-generated assessment. Integrity starts with you.", 105, 285, { align: "center" });

    doc.save("AI_Ethics_Report.pdf");
  };

  return (
    <button
      onClick={downloadPDF}
      className="flex items-center gap-2 bg-ethicLight hover:opacity-90 text-ethicDark px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-lg"
    >
      <FaDownload />
      Download PDF Report
    </button>
  );
}
