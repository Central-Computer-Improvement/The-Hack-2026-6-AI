# DeepTutor - Full-Stack Educational Platform & AI Microservice

A monorepo combining a Main Application Backend with the DeepTutor AI Microservice for personalized STEM learning, course tracking, 3-layer inspectable memory, and adaptive roadmaps.

## Key Features

- Course Telemetry & Misconception Evaluation: REST endpoints for logging video watch events, diagnostic MCQ misconception grading, rubric-based essay scoring, and module completion milestones.
- Three-Layer Memory System:
  - L1: Raw append-only trace log (trace/surface/date.jsonl).
  - L2: Per-surface summary documents (L2/chat.md, L2/quiz.md, L2/kb.md).
  - L3: Cross-surface user profile slots (L3/profile, L3/recent, L3/scope, L3/preferences).
- Adaptive STEM Roadmap Generator: Generates personalized learning timelines (6 to 10 steps) routed into Socratic Chat.
- Real-Time Socratic Chat: Low-latency streaming WebSocket endpoint (ws://127.0.0.1:8001/api/v1/ws) with agentic tool calling.


## Quick Start Guide

Launching DeepTutor AI Microservice

pip install -e .
deeptutor init
deeptutor start


## Documentation References

DeepTutor-main/AGENTS.md: Complete AI agent architecture and REST/WebSocket API specifications.


## License

Distributed under the Apache 2.0 License.
