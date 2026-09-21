# Jev Evaluator Worker

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

Open **`http://localhost:8787/`** in your browser to use the interactive **CV & JD Evaluator Web Dashboard**:
- 📂 Drag-and-drop or select **`.md`**, **`.txt`**, or **`.docx`** files for both Job Description and CV.
- ⚡ 1-Click "Load Sample Cloud Role & CV" preset for instant testing.
## Automated Deployment (CI/CD)

The repository includes GitHub Actions workflows for continuous integration and automated deployment to **Cloudflare Workers**:

- **PR Quality Gate ([`.github/workflows/ci.yml`](file:///.github/workflows/ci.yml))**: Automatically type-checks TypeScript and verifies builds on every Pull Request and commit.
- **Production Deployment ([`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml))**: Automatically deploys the Worker to Cloudflare on push to `main` (or via manual trigger).

### Setting up GitHub Secrets

To enable automated deployment in your GitHub repository, navigate to **Settings > Secrets and variables > Actions** and add:

1. `CLOUDFLARE_API_TOKEN`: Create an API token in the [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) with the **Edit Cloudflare Workers** template (permissions: `Workers Scripts: Edit`, `Account Settings: Read`, `Workers AI: Read/Run`).
2. `CLOUDFLARE_ACCOUNT_ID`: Found in your Cloudflare dashboard sidebar under **Workers & Pages > Overview** (right side panel) or via `npx wrangler whoami`.

---

## Manual Deployment

```bash
npm run deploy
```

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
