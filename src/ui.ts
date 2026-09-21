export function getHtmlDashboard(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jev CV & Job Description Alignment Evaluator</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            brand: {
              50: '#f0fdf4',
              100: '#dcfce7',
              500: '#22c55e',
              600: '#16a34a',
              700: '#15803d',
            }
          }
        }
      }
    }
  </script>
  <style>
    .glass-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(229, 231, 235, 0.8);
    }
    .dropzone-active {
      border-color: #3b82f6 !important;
      background-color: #eff6ff !important;
    }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-500 selection:text-white">

  <!-- Background glow decorations -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
    <div class="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
  </div>

  <!-- Header -->
  <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 font-bold text-white text-lg">
          Jev
        </div>
        <div>
          <h1 class="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            CV-to-JD Alignment Evaluator
            <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700">Workers AI</span>
          </h1>
          <p class="text-xs text-slate-400">Powered by TypeSafe.ai Jev & Cloudflare Workers</p>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <button id="load-sample-btn" type="button" class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Load Sample Cloud Role & CV
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

    <!-- Inputs Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Job Description Input -->
      <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
            <h2 class="text-sm font-semibold text-white tracking-wide uppercase">Target Job Description</h2>
          </div>
          <span id="jd-stats" class="text-xs text-slate-400 font-mono">0 words</span>
        </div>

        <!-- Dropzone -->
        <div id="jd-dropzone" class="border-2 border-dashed border-slate-700 hover:border-blue-500/60 rounded-xl p-4 text-center cursor-pointer transition bg-slate-900/50 mb-3 group">
          <input type="file" id="jd-file-input" class="hidden" accept=".md,.markdown,.txt,.docx">
          <div class="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
            <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-xs text-slate-300 font-medium">Drop <span class="text-blue-400 font-semibold">.md, .txt, or .docx</span> file here, or <span class="text-blue-400 underline">browse</span></p>
            <p id="jd-file-name" class="text-xs text-emerald-400 font-mono hidden truncate max-w-full px-2 py-0.5 bg-emerald-950/50 border border-emerald-800 rounded"></p>
          </div>
        </div>

        <!-- Textarea -->
        <textarea id="jd-text" rows="10" placeholder="Paste the target job description requirements, responsibilities, and qualifications..." class="w-full flex-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans leading-relaxed resize-none"></textarea>
      </div>

      <!-- Candidate CV Input -->
      <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
            <h2 class="text-sm font-semibold text-white tracking-wide uppercase">Candidate CV / Resume</h2>
          </div>
          <span id="cv-stats" class="text-xs text-slate-400 font-mono">0 words</span>
        </div>

        <!-- Dropzone -->
        <div id="cv-dropzone" class="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl p-4 text-center cursor-pointer transition bg-slate-900/50 mb-3 group">
          <input type="file" id="cv-file-input" class="hidden" accept=".md,.markdown,.txt,.docx">
          <div class="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
            <svg class="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-xs text-slate-300 font-medium">Drop <span class="text-emerald-400 font-semibold">.md, .txt, or .docx</span> file here, or <span class="text-emerald-400 underline">browse</span></p>
            <p id="cv-file-name" class="text-xs text-emerald-400 font-mono hidden truncate max-w-full px-2 py-0.5 bg-emerald-950/50 border border-emerald-800 rounded"></p>
          </div>
        </div>

        <!-- Textarea -->
        <textarea id="cv-text" rows="10" placeholder="Paste your candidate CV, resume achievements, technical capabilities, and experience..." class="w-full flex-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-sans leading-relaxed resize-none"></textarea>
      </div>

    </div>

    <!-- Action Bar -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
      <button id="evaluate-btn" type="button" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none">
        <svg id="evaluate-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span id="evaluate-btn-text">⚡ Evaluate Alignment with Jev</span>
      </button>

      <button id="clear-btn" type="button" class="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition">
        Clear Inputs
      </button>
    </div>

    <!-- Error Banner -->
    <div id="error-banner" class="hidden p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-3">
      <svg class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div id="error-message"></div>
    </div>

    <!-- Results Section -->
    <div id="results-section" class="hidden space-y-6 animate-fade-in">
      
      <!-- Verdict & Header Summary -->
      <div class="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-1">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-400">Interview Recommendation</span>
            <div class="flex items-center gap-3">
              <span id="verdict-badge" class="px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide"></span>
              <span id="verdict-confidence" class="text-xs font-mono text-slate-400"></span>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4 text-xs font-mono bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
            <div>
              <span class="text-slate-500">Latency:</span>
              <span id="metric-latency" class="text-slate-200 font-semibold ml-1">--</span>
            </div>
            <div class="border-l border-slate-700 pl-4">
              <span class="text-slate-500">Input Tokens:</span>
              <span id="metric-in-tokens" class="text-blue-400 font-semibold ml-1">--</span>
            </div>
            <div class="border-l border-slate-700 pl-4">
              <span class="text-slate-500">Output Tokens:</span>
              <span id="metric-out-tokens" class="text-emerald-400 font-semibold ml-1">--</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alignment Dimension Scorecards (Grid) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <!-- Card: Overall Alignment -->
        <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Alignment</span>
              <span id="score-overall-conf" class="text-[10px] font-mono text-slate-500"></span>
            </div>
            <div class="flex items-baseline gap-2 mb-3">
              <span id="score-overall-val" class="text-3xl font-extrabold text-white">--</span>
              <span class="text-slate-500 text-xs font-semibold">/ 5</span>
            </div>
            <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
              <div id="bar-overall" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
            </div>
          </div>
          <p id="desc-overall" class="text-xs text-slate-400 leading-normal"></p>
        </div>

        <!-- Card: Skills Match -->
        <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technical Skills</span>
              <span id="score-skills-conf" class="text-[10px] font-mono text-slate-500"></span>
            </div>
            <div class="flex items-baseline gap-2 mb-3">
              <span id="score-skills-val" class="text-3xl font-extrabold text-white">--</span>
              <span class="text-slate-500 text-xs font-semibold">/ 5</span>
            </div>
            <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
              <div id="bar-skills" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
            </div>
          </div>
          <p id="desc-skills" class="text-xs text-slate-400 leading-normal"></p>
        </div>

        <!-- Card: Experience Depth -->
        <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experience Depth</span>
              <span id="score-exp-conf" class="text-[10px] font-mono text-slate-500"></span>
            </div>
            <div class="flex items-baseline gap-2 mb-3">
              <span id="score-exp-val" class="text-3xl font-extrabold text-white">--</span>
              <span class="text-slate-500 text-xs font-semibold">/ 5</span>
            </div>
            <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
              <div id="bar-exp" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
            </div>
          </div>
          <p id="desc-exp" class="text-xs text-slate-400 leading-normal"></p>
        </div>

        <!-- Card: Education & Certs -->
        <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Education & Certs</span>
              <span id="score-edu-conf" class="text-[10px] font-mono text-slate-500"></span>
            </div>
            <div class="flex items-baseline gap-2 mb-3">
              <span id="score-edu-val" class="text-3xl font-extrabold text-white">--</span>
              <span class="text-slate-500 text-xs font-semibold">/ 5</span>
            </div>
            <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
              <div id="bar-edu" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
            </div>
          </div>
          <p id="desc-edu" class="text-xs text-slate-400 leading-normal"></p>
        </div>

      </div>

      <!-- Biggest Gap Spotlight Callout -->
      <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ⚠️
            </div>
            <div>
              <h3 class="text-sm font-bold text-white tracking-wide uppercase">Identified Primary Gap Area</h3>
              <p class="text-xs text-slate-400">Jev's classification of the most significant gap to bridge</p>
            </div>
          </div>
          <span id="gap-pill" class="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-800 text-amber-300"></span>
        </div>
        <p id="gap-description" class="text-xs text-slate-300 bg-slate-900/60 border border-slate-800 p-4 rounded-xl leading-relaxed"></p>
      </div>

      <!-- Raw JSON Response Details Accordion -->
      <details class="group bg-slate-800/40 border border-slate-800 rounded-2xl p-4 text-xs">
        <summary class="font-medium text-slate-400 cursor-pointer hover:text-slate-200 flex items-center justify-between">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Inspect Raw Workers AI Jev Response
          </span>
          <span class="text-[10px] font-mono text-slate-500">JSON Payload</span>
        </summary>
        <div class="mt-4 relative">
          <pre id="raw-json" class="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800"></pre>
        </div>
      </details>

    </div>

  </main>

  <footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-slate-500 border-t border-slate-800/60 mt-12">
    Cloudflare Workers AI &bull; Model: <span class="font-mono text-slate-400">typesafe/jev</span> &bull; 10k Free Neurons/day
  </footer>

  <!-- Client-Side App Logic -->
  <script>
    const sampleJD = \`Role: Principal Cloud Solutions Architect
Company: Nexus Global Cloud Solutions
Location: Remote / Hybrid

Key Responsibilities:
- Lead the architectural design and implementation of multi-cloud enterprise solutions (GCP, AWS, Cloudflare Workers).
- Architect event-driven distributed microservices using TypeScript, Node.js, and Kubernetes.
- Drive Generative AI & Agentic AI strategy across enterprise workflows.
- Mentor senior engineering teams and conduct architectural design reviews.

Qualifications & Requirements:
- 8+ years of experience in distributed systems architecture and cloud engineering.
- Deep expertise in TypeScript, Golang, and Cloudflare Workers / Edge computing.
- Proven experience with Agentic AI, LLM evaluation pipelines, and modern orchestration frameworks.
- Bachelor's or Master's degree in Computer Science or equivalent practical experience.\`;

    const sampleCV = \`Alexandre Franco
Senior Enterprise Cloud Architect & AI Systems Specialist

Professional Summary:
Enterprise Architect with 10+ years of proven expertise designing resilient distributed systems, enterprise cloud architectures (GCP, Cloudflare Workers, AWS), and production-grade Agentic AI pipelines. Spearheaded multi-region microservices serving millions of daily active users with sub-millisecond edge latency.

Technical Capabilities:
- Languages & Frameworks: TypeScript, Node.js, Go, Python, React, Tailwind CSS.
- Cloud & Infrastructure: Cloudflare Workers AI, Google Cloud Platform, Kubernetes, Docker, Terraform.
- AI & LLM Systems: Generative AI, Agentic Workflows, Evaluation Harnesses, Prompt Architecture.

Professional Experience:
Lead Enterprise Architect | Cloud & AI Innovation Lab (2021 - Present)
- Designed and delivered autonomous agentic architectures and edge-evaluator systems using Cloudflare Workers and Google Vertex AI.
- Standardized microservice design patterns across 12 distributed engineering teams.
- Optimized edge execution pipelines, slashing p99 latency by 42% and cloud egress costs by 35%.

Education & Certifications:
- B.S. in Computer Engineering
- Google Cloud Certified Professional Cloud Architect\`;

    const criteriaExplanations = {
      overall: [
        "Missing most key requirements",
        "Meets some requirements but has significant gaps",
        "Meets many requirements with some notable gaps",
        "Meets most requirements with minor gaps",
        "Meets or exceeds all key requirements"
      ],
      skills: [
        "Major gaps: missing key technical skills entirely",
        "Some gaps: few skills missing or partially demonstrated",
        "Partial match: has some required skills",
        "Good match: has most required skills",
        "Complete match: demonstrates all required skills"
      ],
      exp: [
        "Insufficient: significantly less experience or unrelated",
        "Marginal: slightly below required experience",
        "Adequate: meets minimum requirements with relevant background",
        "Strong: exceeds required experience with high relevance",
        "Exceptional: extensive experience and perfect match"
      ],
      edu: [
        "Does not meet required credentials",
        "Partially meets with relevant education",
        "Meets required education level",
        "Exceeds required education with certifications",
        "Far exceeds with advanced degrees & prestige credentials"
      ]
    };

    const gapLabels = {
      none: "No Significant Gaps",
      technical_skills: "Technical Skills Gap",
      experience: "Experience Duration / Depth Gap",
      education: "Education & Credentials Gap",
      domain_knowledge: "Industry / Domain Knowledge Gap",
      soft_skills: "Leadership & Communication Gap",
      seniority: "Seniority Level Mismatch"
    };

    const gapContext = {
      none: "The candidate's profile demonstrates comprehensive alignment with all core requirements and criteria.",
      technical_skills: "The job description emphasizes specific tools, languages, or frameworks that are missing or insufficiently highlighted in the candidate's CV. Consider explicitly calling out related project achievements or tooling competencies.",
      experience: "The candidate shows relevant background but may be slightly below the required years of direct experience or specific scale required in the job description.",
      education: "The role requires specific degree levels or certifications that were not explicitly found on the resume.",
      domain_knowledge: "The role demands specialized vertical knowledge (e.g. Fintech, Healthcare, Telecom) that may need to be bridged during the interview.",
      soft_skills: "The job description places strong emphasis on leadership, executive presence, or cross-functional stakeholder management.",
      seniority: "The role requires a different level of organizational seniority (e.g. Principal/Executive vs Senior)."
    };

    // DOM Elements
    const jdText = document.getElementById('jd-text');
    const cvText = document.getElementById('cv-text');
    const jdStats = document.getElementById('jd-stats');
    const cvStats = document.getElementById('cv-stats');
    const jdDropzone = document.getElementById('jd-dropzone');
    const cvDropzone = document.getElementById('cv-dropzone');
    const jdFileInput = document.getElementById('jd-file-input');
    const cvFileInput = document.getElementById('cv-file-input');
    const jdFileName = document.getElementById('jd-file-name');
    const cvFileName = document.getElementById('cv-file-name');
    const loadSampleBtn = document.getElementById('load-sample-btn');
    const evaluateBtn = document.getElementById('evaluate-btn');
    const evaluateBtnText = document.getElementById('evaluate-btn-text');
    const evaluateSpinner = document.getElementById('evaluate-spinner');
    const clearBtn = document.getElementById('clear-btn');
    const errorBanner = document.getElementById('error-banner');
    const errorMessage = document.getElementById('error-message');
    const resultsSection = document.getElementById('results-section');

    function updateStats(textarea, statsEl) {
      const text = textarea.value.trim();
      const words = text.length > 0 ? text.split(/\\s+/).length : 0;
      statsEl.textContent = \`\${words} words (\${text.length} chars)\`;
    }

    jdText.addEventListener('input', () => updateStats(jdText, jdStats));
    cvText.addEventListener('input', () => updateStats(cvText, cvStats));

    loadSampleBtn.addEventListener('click', () => {
      jdText.value = sampleJD;
      cvText.value = sampleCV;
      jdFileName.classList.add('hidden');
      cvFileName.classList.add('hidden');
      updateStats(jdText, jdStats);
      updateStats(cvText, cvStats);
      errorBanner.classList.add('hidden');
    });

    clearBtn.addEventListener('click', () => {
      jdText.value = '';
      cvText.value = '';
      jdFileName.classList.add('hidden');
      cvFileName.classList.add('hidden');
      updateStats(jdText, jdStats);
      updateStats(cvText, cvStats);
      resultsSection.classList.add('hidden');
      errorBanner.classList.add('hidden');
    });

    // File Handlers
    async function extractTextFromFile(file) {
      const name = file.name.toLowerCase();
      if (name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        return result.value;
      } else {
        return await file.text();
      }
    }

    function setupDropzone(dropzone, fileInput, textarea, statsEl, fileNameEl) {
      dropzone.addEventListener('click', () => fileInput.click());

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('dropzone-active');
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('dropzone-active');
        }, false);
      });

      dropzone.addEventListener('drop', async (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          await handleFile(files[0]);
        }
      });

      fileInput.addEventListener('change', async (e) => {
        if (fileInput.files.length > 0) {
          await handleFile(fileInput.files[0]);
        }
      });

      async function handleFile(file) {
        try {
          const text = await extractTextFromFile(file);
          textarea.value = text;
          fileNameEl.textContent = \`📄 \${file.name}\`;
          fileNameEl.classList.remove('hidden');
          updateStats(textarea, statsEl);
        } catch (err) {
          alert('Could not parse file: ' + err.message);
        }
      }
    }

    setupDropzone(jdDropzone, jdFileInput, jdText, jdStats, jdFileName);
    setupDropzone(cvDropzone, cvFileInput, cvText, cvStats, cvFileName);

    // Evaluation Trigger
    evaluateBtn.addEventListener('click', async () => {
      const jd = jdText.value.trim();
      const cv = cvText.value.trim();

      if (!jd || !cv) {
        errorBanner.classList.remove('hidden');
        errorMessage.textContent = 'Please provide both the Job Description and the Candidate CV text (or upload files) before evaluating.';
        return;
      }

      errorBanner.classList.add('hidden');
      evaluateBtn.disabled = true;
      evaluateSpinner.classList.remove('hidden');
      evaluateBtnText.textContent = 'Evaluating with Jev...';

      const startTime = performance.now();

      try {
        const res = await fetch('/cv-jd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jd, cv })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || \`Server responded with \${res.status}\`);
        }

        const data = await res.json();
        const latencyMs = Math.round(performance.now() - startTime);

        renderResults(data, latencyMs);
      } catch (err) {
        errorBanner.classList.remove('hidden');
        errorMessage.textContent = 'Evaluation Error: ' + err.message;
      } finally {
        evaluateBtn.disabled = false;
        evaluateSpinner.classList.add('hidden');
        evaluateBtnText.textContent = '⚡ Evaluate Alignment with Jev';
      }
    });

    function getScoreColor(normalizedScore5) {
      if (normalizedScore5 >= 3.8) return { bar: 'bg-emerald-500', text: 'text-emerald-400' };
      if (normalizedScore5 >= 2.6) return { bar: 'bg-amber-500', text: 'text-amber-400' };
      return { bar: 'bg-rose-500', text: 'text-rose-400' };
    }

    function renderResults(data, latencyMs) {
      // Handle both direct envelope and wrapped data.result from Cloudflare Workers AI
      const payload = (data && data.result) ? data.result : data;
      const answers = payload.answers || {};
      const usage = payload.usage || data.usage || {};

      // 1. Verdict (recommend_interview)
      const verdict = answers.recommend_interview;
      const verdictBadge = document.getElementById('verdict-badge');
      const verdictConf = document.getElementById('verdict-confidence');
      
      let isRecommended = false;
      let confPercent = null;

      if (verdict) {
        if (typeof verdict.noul === 'number') {
          isRecommended = verdict.noul >= 0.5;
          confPercent = Math.round((isRecommended ? verdict.noul : (1 - verdict.noul)) * 100);
        } else if (typeof verdict.answer === 'boolean') {
          isRecommended = verdict.answer;
          if (typeof verdict.confidence === 'number') {
            confPercent = Math.round(verdict.confidence * 100);
          }
        } else if (verdict.choice) {
          isRecommended = verdict.choice === 'true';
          if (typeof verdict.confidence === 'number') {
            confPercent = Math.round(verdict.confidence * 100);
          }
        }
      }

      if (isRecommended) {
        verdictBadge.textContent = '✅ RECOMMENDED FOR INTERVIEW';
        verdictBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-emerald-950/80 border border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/30';
      } else {
        verdictBadge.textContent = '⚠️ NOT RECOMMENDED / SIGNIFICANT GAPS';
        verdictBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-amber-950/80 border border-amber-500 text-amber-300 shadow-lg shadow-amber-900/30';
      }

      if (confPercent !== null) {
        verdictConf.textContent = \`\${confPercent}% model confidence\`;
      } else {
        verdictConf.textContent = '';
      }

      // Latency & Token metrics
      document.getElementById('metric-latency').textContent = \`\${latencyMs}ms\`;
      document.getElementById('metric-in-tokens').textContent = usage.input_tokens ?? '--';
      document.getElementById('metric-out-tokens').textContent = usage.output_tokens ?? '--';

      // 2. Scorecards Helper
      // Jev returns continuous float scores on a 0-4 index scale for 5 criteria options
      function setScoreCard(key, scoreValId, scoreConfId, barId, descId, defaultCriteriaArray) {
        const item = answers[key];
        const rawScore = typeof item?.score === 'number' ? item.score : 0;
        
        // Convert 0..4 scale to 1..5 scale if 0-indexed legend is present or max is <= 4
        const hasZeroIndex = item?.legend && item.legend["0"] !== undefined;
        const score5 = (hasZeroIndex || rawScore <= 4) ? (rawScore + 1) : rawScore;
        const displayScore = score5 > 0 ? score5.toFixed(1) : '--';
        
        // Calculate progress percentage (0..4 maps to 0..100%)
        const percent = Math.min(100, Math.max(0, (hasZeroIndex || rawScore <= 4 ? (rawScore / 4) : (rawScore / 5)) * 100));

        const conf = item?.confidence ? \`\${Math.round(item.confidence * 100)}% conf\` : '';
        const colors = getScoreColor(score5);

        const valEl = document.getElementById(scoreValId);
        valEl.textContent = displayScore;
        valEl.className = \`text-3xl font-extrabold \${colors.text}\`;

        document.getElementById(scoreConfId).textContent = conf;

        const bar = document.getElementById(barId);
        bar.style.width = \`\${percent}%\`;
        bar.className = \`h-2.5 rounded-full transition-all duration-700 \${colors.bar}\`;

        // Extract description from Jev legend or fallback array
        let desc = 'Assessment completed.';
        const roundedIdx = Math.round(rawScore);
        if (item?.legend && item.legend[String(roundedIdx)]) {
          desc = item.legend[String(roundedIdx)];
        } else if (defaultCriteriaArray[roundedIdx]) {
          desc = defaultCriteriaArray[roundedIdx];
        }
        document.getElementById(descId).textContent = desc;
      }

      setScoreCard('overall_alignment', 'score-overall-val', 'score-overall-conf', 'bar-overall', 'desc-overall', criteriaExplanations.overall);
      setScoreCard('skills_match', 'score-skills-val', 'score-skills-conf', 'bar-skills', 'desc-skills', criteriaExplanations.skills);
      setScoreCard('experience_match', 'score-exp-val', 'score-exp-conf', 'bar-exp', 'desc-exp', criteriaExplanations.exp);
      setScoreCard('education_match', 'score-edu-val', 'score-edu-conf', 'bar-edu', 'desc-edu', criteriaExplanations.edu);

      // 3. Biggest Gap
      const gapChoice = answers.biggest_gap?.choice || 'none';
      const gapTitle = gapLabels[gapChoice] || gapChoice;
      const gapText = gapContext[gapChoice] || 'No specific gap detected.';

      document.getElementById('gap-pill').textContent = gapTitle;
      document.getElementById('gap-description').textContent = gapText;

      // 4. Raw JSON
      document.getElementById('raw-json').textContent = JSON.stringify(data, null, 2);

      // Show results
      resultsSection.classList.remove('hidden');
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  </script>
</body>
</html>`;
}
