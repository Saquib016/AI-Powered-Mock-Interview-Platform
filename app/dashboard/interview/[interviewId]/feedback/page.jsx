"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`/api/interviews/${params.interviewId}/feedback`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const total = feedbackList.reduce((sum, item) => sum + Number(item.rating), 0);
      return (total / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  const downloadReport = async () => {
    setDownloading(true);
    try {
      // Loaded dynamically so it never ships in the server bundle.
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const marginX = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxWidth = pageWidth - marginX * 2;
      let y = 50;

      const addWrapped = (text, fontSize = 11, gap = 16, bold = false) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(String(text ?? ""), maxWidth);
        lines.forEach((line) => {
          if (y > 780) {
            doc.addPage();
            y = 50;
          }
          doc.text(line, marginX, y);
          y += gap;
        });
      };

      addWrapped("Rizq AI Interview — Feedback Report", 18, 24, true);
      addWrapped(`Generated: ${new Date().toLocaleString()}`, 10, 20);
      addWrapped(`Overall rating: ${overallRating} / 10`, 13, 22, true);
      y += 6;

      feedbackList.forEach((item, idx) => {
        addWrapped(`Q${idx + 1}. ${item.question}`, 12, 16, true);
        addWrapped(`Rating: ${item.rating}/10`, 10, 14);
        addWrapped(`Your answer: ${item.userAns || "-"}`, 10, 14);
        addWrapped(`Model answer: ${item.correctAns || "-"}`, 10, 14);
        addWrapped(`Feedback: ${item.feedback || "-"}`, 10, 14);
        y += 10;
      });

      doc.save(`rizq-ai-interview-feedback-${params.interviewId}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-gray-500">Loading your feedback...</div>
    );
  }

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500 my-5">
          No interview feedback record found.
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating{" "}
            <strong
              className={overallRating >= 5 ? "text-green-500" : "text-red-600"}
            >
              {overallRating}
              <span className="text-black">/10</span>
            </strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below each question with the correct answer, your answer, and
            feedback for improvement.
          </h2>
          <Button
            variant="outline"
            className="mt-4 flex items-center gap-2"
            onClick={downloadReport}
            disabled={downloading}
          >
            <Download className="h-4 w-4" />
            {downloading ? "Preparing PDF..." : "Download report (PDF)"}
          </Button>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                {item.question} <ChevronDown className="h-5 w-5 shrink-0" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating: </strong>{item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong>{item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer: </strong>{item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary-900">
                    <strong>Feedback: </strong>{item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button className="mt-6" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
