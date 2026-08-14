# DeepTutor - Full-Stack Educational Platform & AI Microservice

A monorepo combining a Main Application Backend with the DeepTutor AI Microservice for personalized STEM learning, course tracking, 3-layer inspectable memory, and adaptive roadmaps.

---

## Monorepo Structure

.
├── backend/            # Main Application Backend (User Auth, Course DB, Student Progress)
└── DeepTutor-main/     # AI Microservice (FastAPI + Socratic AI Tutor + Memory + Roadmaps)

---

## System Architecture

Main Application Backend <---> HTTP REST / WebSockets <---> DeepTutor Microservice

1. Main Application Backend (Port 3000 / 8000):
   - User authentication and access control.
   - Relational database management (Courses, Modules, Students).
   - Serves main student dashboard and video player UI.

2. DeepTutor AI Microservice (Port 8001 / 3782):
   - Real-time Socratic Chat streaming via WebSockets.
   - Diagnostic MCQ and short essay misconception evaluation.
   - 3-Layer inspectable memory system (L1 trace logs, L2 surface summaries, L3 profile synthesis).
   - Adaptive STEM learning roadmap generation.

---

## Key Features

- Course Telemetry & Misconception Evaluation: REST endpoints for logging video watch events, diagnostic MCQ misconception grading, rubric-based essay scoring, and module completion milestones.
- Three-Layer Memory System:
  - L1: Raw append-only trace log (trace/surface/date.jsonl).
  - L2: Per-surface summary documents (L2/chat.md, L2/quiz.md, L2/kb.md).
  - L3: Cross-surface user profile slots (L3/profile, L3/recent, L3/scope, L3/preferences).
- Adaptive STEM Roadmap Generator: Generates personalized learning timelines (6 to 10 steps) routed into Socratic Chat.
- Real-Time Socratic Chat: Low-latency streaming WebSocket endpoint (ws://127.0.0.1:8001/api/v1/ws) with agentic tool calling.

---

## Quick Start Guide

### 1. Launching DeepTutor AI Microservice

cd DeepTutor-main
pip install -e .
deeptutor init
deeptutor start

### 2. Launching Main Application Backend

cd backend
npm run dev

---

## Automated Test Verification

Run the verification test suite inside DeepTutor-main:

cd DeepTutor-main
python -m pytest tests/reproduce/

Result: 13 passed out of 13 tests.

---

## Documentation References

- DeepTutor-main/AGENTS.md: Complete AI agent architecture and REST/WebSocket API specifications.
- DeepTutor-main/course_tracking.md: Database schemas and course payload specifications.
- DeepTutor-main/l2_memory.md: Memory consolidation engine integration guide.

---

## License

Distributed under the Apache 2.0 License.
