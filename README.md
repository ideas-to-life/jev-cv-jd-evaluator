# Jev Evaluator Worker

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/alexandrefranco)

A Cloudflare Worker that calls the **typesafe/jev** model (TypeSafe.ai) via the Workers AI binding.


## Setup

```bash
npm install
npx wrangler types
```

## Run locally & Access the Web Dashboard

```bash
npm run dev
```

Open **`http://localhost:8787/`** in your browser to use the interactive **Jev AI Evaluator Suite Web Dashboard**:
- **Tab 1: CV & Job Fit**: Drag-and-drop or select **`.md`**, **`.txt`**, or **`.docx`** files for both Job Description and CV.
- **Tab 2: Upwork Proposals**: Evaluate job post alignment, hook strength, credibility, and submission readiness.
- **Tab 3: 30-Day Freelancer Attack**: Drag-and-drop **`.xlsx`** workbooks (12-month tabs) or **`.csv`** sheets. Computes the trailing 30-day window ending at the current week, evaluates funnel conversion waterfalls against Datalumina course benchmarks, identifies primary bottlenecks, and checks 30-day guarantee trajectory.
- ⚡ 1-Click sample presets across all 3 evaluators for instant testing.
## Automated Deployment (CI/CD)

The repository includes GitHub Actions workflows for continuous integration and automated deployment to **Cloudflare Workers**:

- **PR Quality Gate ([`.github/workflows/ci.yml`](file:///.github/workflows/ci.yml))**: Automatically type-checks TypeScript and verifies builds on every Pull Request and commit.
- **Production Deployment ([`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml))**: Automatically deploys the Worker to Cloudflare on push to `main` (or via manual trigger).

### Setting up GitHub Secrets

To enable automated deployment in your GitHub repository, navigate to **Settings > Secrets and variables > Actions** and add:

1. `CLOUDFLARE_API_TOKEN`: Create an API token in the [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) with the **Edit Cloudflare Workers** template (permissions: `Workers Scripts: Edit`, `Account Settings: Read`, `Workers AI: Read/Run`).
2. `CLOUDFLARE_ACCOUNT_ID`: Found in your Cloudflare dashboard sidebar under **Workers & Pages > Overview** (right side panel) or via `npx wrangler whoami`.

---

## Credit Limits & Passcode Tiers

To protect your Workers AI daily Neurons budget from runaway usage when sharing on LinkedIn or course communities, the Worker enforces automatic credit tracking:

- **Public Tier (Default)**: 3 free evaluations per day per client IP (CV & Upwork Proposal evaluators).
- **VIP / Course Students (`COURSE-VIP`)**: 15 evaluations per day (unlocked via the in-app `🔑 VIP Passcode` modal). Unlocks full access to the **30-Day Freelancer Attack Evaluator**.
- **Admin Tier**: Unlimited evaluations with secret `ADMIN_KEY`.
- **Global Safety Cap**: Max 250 evaluations/day total across all users (resets at 00:00 UTC).

> [!NOTE]
> The **30-Day Freelancer Attack Evaluator** is reserved exclusively for Datalumina course members and requires the `COURSE-VIP` passcode (or `ADMIN_KEY`) to run evaluations, while remaining visible for all visitors to explore the layout, sample datasets, and benchmark targets.

### Configuring Limits in `wrangler.toml`

```toml
[vars]
PUBLIC_DAILY_LIMIT = "3"
VIP_DAILY_LIMIT = "15"
GLOBAL_DAILY_LIMIT = "250"
VIP_PASSCODE = "COURSE-VIP"
```

*(Optional: Bind a Cloudflare KV namespace `USAGE_KV` via `npx wrangler kv namespace create USAGE_KV` for distributed persistent tracking across global edge locations).*

---

## Endpoints

### GET / or /dashboard - Web UI Dashboard
Serves the embedded single-page application.

### POST /cv-jd - CV-to-Job-Description alignment evaluator

Send your CV and a job description. Jev scores alignment across 4 dimensions,
identifies the biggest gap, and recommends whether to interview.

```bash
curl http://localhost:8787/cv-jd \
  -H "Content-Type: application/json" \
  -d '{
    "cv": "Your CV text here...",
    "jd": "Job description text here..."
  }'
### POST /upwork-proposal - Upwork Job & Proposal Evaluator

Evaluate your Upwork proposal against a client job post. Jev scores your draft across 6 proposal conversion dimensions, identifies the single biggest proposal flaw, and determines if it is ready to submit:

```bash
curl http://localhost:8787/upwork-proposal \
  -H "Content-Type: application/json" \
  -d '{
    "job_post": "Looking for a Senior Cloudflare Workers architect...",
    "proposal": "Hi, I can architect and deliver your Cloudflare Workers AI service..."
  }'
```

### POST /30-day-attack - Datalumina 30-Day Freelancer Attack Evaluator

Evaluate a freelancer student's daily, weekly, and overall performance across their 30-day attack launch campaign against Datalumina benchmark KPIs (50-150 outreach, 10-30% reply rate, 10-30% interview rate, 20-40% win rate).

Supports 12-month workbooks (`.xlsx`) and `.csv` files. The 30-day attack period is dynamically calculated as the **trailing 30-day window up to the end of the current week** (`[End of Current Week - 30 days, End of Current Week]`):

```bash
curl http://localhost:8787/30-day-attack \
  -H "Content-Type: application/json" \
  -H "x-passcode: COURSE-VIP" \
  -d '{
    "proposals": [
      {
        "date": "2026-09-09",
        "job": "AI Automation Architect",
        "proposal": true,
        "reply": true,
        "interview": true,
        "won": false
      }
    ],
    "calls": [
      {
        "date": "2026-09-01",
        "name": "Enterprise Client",
        "callType": "Discovery",
        "outcome": "Interview",
        "whatWentWell": "Strong technical alignment"
      }
    ]
  }'
```

The response includes:
- `window`: Active 30-day attack dates (`startDate`, `endDate`, `referenceDate`).
- `deterministicMetrics`: Funnel conversions (proposals, replies, interviews, won, rates), CRM call breakdown, 4 weekly cohorts, and daily cadence/velocity.
- `jevEvaluation`: Qualitative Jev AI scoring (`pipeline_health`, `funnel_efficiency`, `attack_discipline`, `positioning_and_targeting`), `primary_bottleneck` classification, and `on_track_for_guarantee` binary decision.


### POST /classify - route a support request

curl http://localhost:8787/classify -H "Content-Type: application/json" -d '{"text": "I cannot log in after changing my password."}'

### POST /risk - score account risk

curl http://localhost:8787/risk -H "Content-Type: application/json" -d '{"account_age_days": 12, "recent_events": ["Five failed login attempts"], "account_verified": true}'

### POST /evaluate - pass through arbitrary state + questions

curl http://localhost:8787/evaluate -H "Content-Type: application/json" -d '{"state": "Some context", "questions": {}}'

## CV-JD Evaluation Questions

The /cv-jd endpoint asks Jev these questions in a single call:

| Question | Type | What it measures |
|---|---|---|
| overall_alignment | score (1-5) | Overall profile fit |
| skills_match | score (1-5) | Technical skills and tools |
| experience_match | score (1-5) | Years and relevance of experience |
| education_match | score (1-5) | Education and certifications |
| biggest_gap | choice | The most significant gap area |
| recommend_interview | noul | Should the candidate be interviewed? |

## Free plan limits

Workers AI on the Free plan includes 10,000 Neurons per day at no charge.

## Docs

- Jev model docs: https://developers.cloudflare.com/ai/models/typesafe/jev/
- Workers AI pricing: https://developers.cloudflare.com/workers-ai/platform/pricing/
