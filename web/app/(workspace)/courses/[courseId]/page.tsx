"use client";

import React, { useState, use } from "react";
import { apiFetch, apiUrl } from "@/lib/api";
import {
  Award,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  HelpCircle,
  PlayCircle,
  RefreshCcw,
  Sparkles,
  Target,
  Video,
  XCircle,
  AlertTriangle,
  Send,
  Loader2,
} from "lucide-react";

interface CourseViewerProps {
  params: Promise<{ courseId: string }>;
}

export default function CourseViewerPage({ params }: CourseViewerProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId || "cs101";

  // State management
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  // MCQ state
  const [selectedMcq, setSelectedMcq] = useState<string | null>(null);
  const [mcqResult, setMcqResult] = useState<{
    correct: boolean;
    score: number;
    feedback: string;
    misconception: string | null;
  } | null>(null);
  const [mcqLoading, setMcqLoading] = useState(false);

  // Essay state
  const [essayText, setEssayText] = useState(
    "The cost function J(w,b) measures the mean squared error between our model's predictions and actual target values."
  );
  const [essayResult, setEssayResult] = useState<{
    correct: boolean;
    score: number;
    feedback: string;
  } | null>(null);
  const [essayLoading, setEssayLoading] = useState(false);

  // Module Completion state
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleReset = async () => {
    try {
      await apiFetch(apiUrl(`/api/v1/courses/${courseId}/reset`), { method: "POST" });
      setVideoWatched(false);
      setSelectedMcq(null);
      setMcqResult(null);
      setEssayResult(null);
      setModuleCompleted(false);
      showToast("Course progress and session history cleared.");
    } catch (e) {
      console.error(e);
    }
  };

  const handleTrackVideo = async () => {
    setVideoLoading(true);
    try {
      const res = await apiFetch(apiUrl(`/api/v1/courses/${courseId}/track_video`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_id: "v1_1",
          title: "1.1 Model Representation & Cost Function",
          kb_concepts: [
            { title: "Cost Function J(w,b)", description: "Measures mean squared error." },
            { title: "Linear Regression Model", description: "Hypothesis function f_wb(x)." },
          ],
        }),
      });
      const data = await res.json();
      setVideoWatched(true);
      showToast(data.message || "Video progress saved to L1 Trace!");
    } finally {
      setVideoLoading(false);
    }
  };

  const handleEvaluateMCQ = async () => {
    if (!selectedMcq) return;
    setMcqLoading(true);
    try {
      const res = await apiFetch(apiUrl(`/api/v1/courses/${courseId}/quiz/evaluate`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: "q1_1_1",
          question_type: "mcq",
          student_answer: selectedMcq,
          expected_answer: "A",
          misconceptions: { B: "Confuses dataset sizing with parameter optimization." },
        }),
      });
      const data = await res.json();
      setMcqResult(data);
      showToast(`MCQ Evaluated: ${data.correct ? "Correct ✓" : "Incorrect ✗"}`);
    } finally {
      setMcqLoading(false);
    }
  };

  const handleEvaluateEssay = async () => {
    if (!essayText.trim()) return;
    setEssayLoading(true);
    try {
      const res = await apiFetch(apiUrl(`/api/v1/courses/${courseId}/quiz/evaluate`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: "q1_1_2",
          question_type: "essay",
          student_answer: essayText,
          rubric: "Demonstrate understanding of measuring error.",
        }),
      });
      const data = await res.json();
      setEssayResult(data);
      showToast(`Essay Evaluated! Score: ${data.score}`);
    } finally {
      setEssayLoading(false);
    }
  };

  const handleCompleteModule = async () => {
    setModuleLoading(true);
    try {
      const res = await apiFetch(apiUrl(`/api/v1/courses/${courseId}/modules/m1/complete`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module_id: "m1",
          module_title: "Module 1: Linear Regression & Cost Functions",
          learned_concepts: [{ title: "Cost Function J(w,b)", description: "Mean squared error formulation" }],
          misconceptions: mcqResult?.misconception ? [mcqResult.misconception] : [],
          essay_feedback: essayResult?.feedback || "Demonstrated understanding.",
        }),
      });
      setModuleCompleted(true);
      showToast("🏆 Module Completed! Trophy logged to L1.");
    } finally {
      setModuleLoading(false);
    }
  };

  const completedCount = (videoWatched ? 1 : 0) + (mcqResult ? 1 : 0) + (essayResult ? 1 : 0) + (moduleCompleted ? 1 : 0);
  const progressPercent = Math.round((completedCount / 4) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-indigo-600/90 text-white px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border border-indigo-400/30">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-white">Introduction to Machine Learning ({courseId})</h1>
            <button onClick={handleReset} className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-lg border border-slate-700">
              <RefreshCcw className="w-3.5 h-3.5" /> Reset Session
            </button>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 mt-4">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-lg font-bold">1.1 Model Representation & Cost Function</h2>
              <video controls className="w-full aspect-video rounded-xl bg-black" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
              <button onClick={handleTrackVideo} disabled={videoLoading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-sm">
                {videoWatched ? "Video Watched (Re-emit L1 Telemetry)" : "Complete Video Lecture"}
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-lg font-bold">Diagnostic MCQ Check</h2>
              <p className="text-sm">Why do we square error terms in J(w,b)?</p>
              {[{ key: "A", text: "A: Prevents negative errors from canceling positive ones" }, { key: "B", text: "B: Dataset size parameter requirement" }].map(opt => (
                <button key={opt.key} onClick={() => setSelectedMcq(opt.key)} className={`w-full p-4 text-left rounded-xl border text-xs font-medium ${selectedMcq === opt.key ? "bg-indigo-900/40 border-indigo-500" : "bg-slate-950 border-slate-800"}`}>
                  {opt.text}
                </button>
              ))}
              <button onClick={handleEvaluateMCQ} disabled={!selectedMcq || mcqLoading} className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-semibold text-sm">
                Submit Diagnostic Choice
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-bold">Module 1 Completion</h3>
              <button onClick={handleCompleteModule} disabled={moduleLoading} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-sm">
                {moduleCompleted ? "Module Completed 🏆" : "Claim Module Milestone"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
