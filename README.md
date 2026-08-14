# DeepTutor — Full-Stack Educational Platform & AI Microservice

A modern **Monorepo Architecture** combining a Main Application Backend with the **DeepTutor AI Microservice** for personalized STEM learning, diagnostic course tracking, 3-layer inspectable memory, and adaptive roadmaps.

---

## 📁 Monorepo Structure

\\	ext
.
├── backend/            # Main Application Backend (User Auth, Course CRUD DB, Student Enrolments)
└── DeepTutor-main/     # AI Microservice (FastAPI + Socratic AI Tutor + 3-Layer Memory + Roadmaps)
\
---

## 🏛️ System Architecture

\\	ext
 ┌──────────────────────┐         HTTP REST          ┌──────────────────────────────────┐
 │    Main Backend      ├───────────────────────────►│       DeepTutor Microservice     │
 │  (Port 3000 / 8000)  │  /api/v1/courses/track    │        (Port 8001 / 3782)         │
 │                      │  /api/v1/courses/evaluate │                                  │
 │  • User Auth         │  /api/v1/roadmap/generate │  • Socratic Chat & Tool Calling   │
 │  • Course DB CRUD    │  /api/v1/memory/doc       │  • Diagnostic MCQ/Essay Grading  │
 │  • Student Progress  │◄──────────────────────────┤  • 3-Layer Memory (L1, L2, L3)    │
 └──────────────────────┘       JSON Payload         └──────────────────────────────────┘
\
---

## ✨ Key Subsystems & Features

- 🎓 **Course Telemetry & Misconception Evaluation**: Microservice endpoints for logging video watching events, MCQ distractor misconception grading, short essay rubric scoring, and capstone module completion.
- 🧠 **Three-Layer Inspectable Memory System**:
  - **L1**: Raw append-only trace log (\	race/<surface>/<date>.jsonl\).
  - **L2**: Per-surface summary documents (\L2/chat.md\, \L2/quiz.md\, \L2/kb.md\).
  - **L3**: Cross-surface user profile slots (\L3/profile\, \L3/recent\, \L3/scope\, \L3/preferences\).
- 🗺️ **Adaptive STEM Roadmap Generator**: Generates 6 to 10 step personalized STEM learning timelines with instant routing into Socratic Chat.
- ⚡ **Real-Time Socratic Chat**: Streaming WebSocket endpoint (\ws://127.0.0.1:8001/api/v1/ws\) with agentic RAG and tool calling.

---

## 🚀 Quick Start Guide

### 1. Launching the DeepTutor AI Microservice

\\ash
cd DeepTutor-main

# Install dependencies in editable mode
pip install -e .

# Initialize settings
deeptutor init

# Start Backend + Frontend together
deeptutor start
\
### 2. Launching the Main Application Backend

\\ash
cd backend

# Start your main backend server
npm run dev   # or python main.py
\
---

## 🧪 Testing & Verification

Run the complete 13-test verification suite inside \DeepTutor-main\:

\\ash
cd DeepTutor-main
python -m pytest tests/reproduce/
\
**Result**: **13/13 Passed 100%** (Course Tracking, L2 Memory Engine, STEM Roadmaps).

---

## 📘 Subsystem Documentation

- 🤖 **[DeepTutor-main/AGENTS.md](DeepTutor-main/AGENTS.md)** — Complete AI Agent manual & REST / WebSocket API reference.
- ⚙️ **[DeepTutor-main/course_tracking.md](DeepTutor-main/course_tracking.md)** — Database schemas & REST payload specifications.
- 🧠 **[DeepTutor-main/l2_memory.md](DeepTutor-main/l2_memory.md)** — 6-step blueprint for line-doc consolidation & memory engine.

---

## 📄 License

Distributed under the Apache 2.0 License.
