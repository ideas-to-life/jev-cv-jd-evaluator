---
id: experiment.jev-cv-jd-evaluator.v1
title: "Structured Edge AI Evaluation for Career Alignment & Proposals"
experiment-name: "Structured Edge AI Evaluator"
status: Shipping
owner: ideas-to-life
author: Alexandre Franco
last-reviewed: 2026-09-21
scope: experiment
domain-tags:
  - Career Development
  - Generative AI
  - Evaluation
  - Edge AI
  - Productivity
applies-to:
  - ideas-to-life-web
  - jev-cv-jd-evaluator
---

# Experiment: Structured Edge AI Evaluator

> **Ideas to Life · Experiment**  
> Turning ideas into consumer experiences with Generative AI.

---

## 1. Experiment Card (Index Entry)

*Canonical card representation for the Ideas-to-Life Experiments index.*

| Field | Value |
|---|---|
| **Experiment Name** | Structured Edge AI Evaluator |
| **One-Line Description** | Exploring ultra-fast, deterministic rubric scoring and alignment analysis at the edge using lightweight specialized LLMs. |
| **Status Badge** | `Shipping` |
| **Domain Tags** | `Career Development`, `Generative AI`, `Evaluation`, `Edge AI` |

---

## 2. Experiment Detail Page

### Overview

#### What is being explored?
This experiment explores whether specialized, lightweight structured evaluation models (specifically `typesafe/jev` running on Cloudflare Workers AI) can deliver instant, deterministic multi-dimensional rubric scoring for high-stakes textual alignment—without the latency, non-deterministic drift, and cost overhead of general-purpose frontier LLMs.

#### Why it exists?
Evaluating textual fit (such as candidate CVs against enterprise Job Descriptions, or freelance Upwork proposals against client briefs) traditionally requires either:
1. **Heuristic/Keyword ATS matching**, which lacks semantic comprehension and contextual nuance.
2. **Heavy LLM prompts**, which suffer from high latency (3–8s+), variable output formats, token costs, and prompt-injection vulnerabilities.

By offloading discrete evaluation dimensions to dedicated micro-evaluation architectures deployed at the edge, this experiment tests whether candidates, freelancers, and reviewers can receive sub-second, structured feedback loops that pinpoint specific gaps and conversion bottlenecks.

---

### Core Principles Applied

1. **Utility over promotion**: Provides actionable numerical scores (1–5 scale), confidence ratings, and discrete bottleneck diagnoses rather than generic AI praise.
2. **Clarity over completeness**: Evaluates focused dimensions with deterministic scoring rubrics rather than generating lengthy narrative summaries.
3. **Patterns over instances**: Demonstrates a reusable Edge Micro-Evaluator pattern applicable to CV screening, proposal validation, code review gating, and support ticket triage.
4. **Ship to learn**: Deployed on Cloudflare Workers with real-time browser-based testing, daily quotas, and VIP tiers for live community feedback.
5. **Single source of truth**: Acts as the canonical definition for edge-based structured evaluation experiments within Ideas to Life.

---

### Current Status

- **Status**: `Shipping`
- **Current Findings**:
  - `typesafe/jev` executes within 300–600ms globally on Cloudflare Workers AI edge nodes.
  - Zero-shot JSON rubric scoring eliminates parsing errors and JSON truncation issues common in conversational models.
  - Token consumption is minimal (~200–400 tokens per full evaluation matrix), making it highly cost-effective under free and lightweight tiers.
  - Two working interactive artifacts have been produced, integrated into a unified single-page dashboard.

---

### Links & Artifacts

| Artifact | Type | Description | Link / Endpoint |
|---|---|---|---|
| **CV & Job Description Evaluator** | Interactive Tool / API | Evaluates candidate CVs against target JDs across 4 dimensions (Overall Fit, Skills Match, Experience Relevance, Education Fit), highlights the primary gap, and provides an interview recommendation. | `POST /cv-jd` & Web Dashboard Tab 1 |
| **Upwork Proposal Evaluator** | Interactive Tool / API | Analyzes proposal drafts against client job posts across 6 conversion dimensions (Hook, Problem Understanding, Technical Credibility, Brevity & Tone, CTA, Scope/Budget Fit) and identifies the primary conversion bottleneck. | `POST /upwork-proposal` & Web Dashboard Tab 2 |
| **Edge Evaluator API Engine** | Worker Backend | Low-latency Cloudflare Worker running `typesafe/jev` with built-in rate-limiting, IP-based daily quotas, and VIP passcode tiers. | `GET /` & `POST /evaluate` |

---

## 3. Provenance & Branding Compliance

### Header
- Text-only provenance: **`Ideas to Life · Experiment`**
- Hero Title: **`Jev AI Evaluator Suite`**

### Footer
```text
Ideas to Life
Published by Alexandre Franco · ideas-to-life.ai
Turning ideas into consumer experiences with Generative AI.
— Built with transparency. Shipped with intent.
```
