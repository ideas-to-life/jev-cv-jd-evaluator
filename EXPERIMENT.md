---
title: "Structured Edge AI Evaluator"
summary: "Ultra-fast, deterministic rubric scoring and alignment analysis at the edge using lightweight specialized LLMs."
description: "Exploring whether specialized micro-evaluation models at the edge can deliver deterministic alignment scoring and conversion bottleneck diagnosis without the latency and cost of frontier LLMs."
status: "shipping" # exploring | validating | shipping | archived
domain: ["Career Development", "Productivity", "Generative AI"]
date: 2026-09-21
tags: ["cloudflare-workers", "edge-ai", "jev", "evaluation", "career-alignment"]
draft: false
---

> This experiment follows the Ideas to Life **Experiments Charter**.
> Experiments are learning artefacts, not products.
> They test reusable patterns, not one-off implementations.

# Structured Edge AI Evaluator

## Why This Exists
Evaluating textual fit—such as candidate CVs against enterprise job specifications or freelance proposals against client briefs—is broken. Heuristic ATS tools miss semantic nuance, while heavy frontier LLMs introduce multi-second latency, variable JSON outputs, and high token costs. Reviewers and applicants need instant, structured, deterministic feedback to identify critical gaps before submission.

## What This Experiment Explores
What question(s) are you trying to answer?
- Can dedicated, lightweight evaluation models (`typesafe/jev`) on edge runtimes deliver sub-second, reliable rubric scores?
- Does zero-shot structured JSON evaluation eliminate the parsing drift and prompt instability common in general-purpose conversational models?
- Can discrete multi-axis scoring and bottleneck isolation improve user iteration velocity across career and proposal workflows?

## What Was Built
- Describe the *shape* of the artefact or system, not implementation details.
Focus on the reusable pattern being tested, not the specific instance.
- **Edge Evaluation Engine**: A lightweight Cloudflare Worker service dispatching structured scoring schemas directly to specialized edge models with IP rate-limiting and tier controls.
- **Multi-Axis Alignment Evaluator (CV-to-JD)**: An interactive tool assessing candidates across 4 core fit dimensions with discrete gap isolation and interview recommendations.
- **Proposal Conversion Diagnostician (Upwork)**: A structured rubric evaluator analyzing freelance proposals across 6 conversion drivers (hook, comprehension, authority, tone, CTA, budget fit).

## Key Trade-offs
What you deliberately chose *not* to do — and why.
- **Structured Scoring over Long-Form Generative Rewrites**: Deliberately avoided generating rewritten CVs or proposals to focus strictly on objective evaluation clarity and avoid hallucinated claims.
- **Specialized Edge Micro-Models over Frontier Reasoning Models**: Traded open-ended conversational capabilities for sub-500ms edge execution speed, zero JSON parsing failures, and minimal token overhead.

## Current Status
This experiment is currently in the **Shipping** phase.

Interactive web artifacts and public API endpoints are live with rate limiting and VIP tiers, validating real-world feedback loops across CV fit and proposal scoring.
Ensure alignment with the Definition of Done described in the Experiments Charter (pattern validated, documented, and linked to evidence where applicable).

## Links
Only include links that exist and matter.
- [GitHub Repository](https://github.com/alexandrefranco/jev-cv-jd-evaluator)
- [Cloudflare Workers AI Jev Model Documentation](https://developers.cloudflare.com/ai/models/typesafe/jev/)
- [Support on Buy Me a Coffee](https://buymeacoffee.com/alexandrefranco)
