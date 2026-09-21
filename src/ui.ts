export function getHtmlDashboard(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jev AI Evaluator Suite - CV & Upwork Proposals</title>
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
          }
        }
      }
    }
  </script>
  <style>
    .dropzone-active {
      border-color: #3b82f6 !important;
      background-color: rgba(59, 130, 246, 0.1) !important;
    }
    .tab-active {
      background-color: #1e293b;
      color: #38bdf8;
      border-bottom: 2px solid #38bdf8;
    }
    .tab-inactive {
      color: #94a3b8;
    }
    .tab-inactive:hover {
      color: #f1f5f9;
      background-color: rgba(30, 41, 59, 0.5);
    }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-500 selection:text-white flex flex-col justify-between">

  <!-- Background glow decorations -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
    <div class="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
  </div>

  <div>
    <!-- Header -->
    <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <!-- Brand / Model info -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 font-bold text-white text-lg">
            Jev
          </div>
          <div>
            <h1 class="text-base font-bold tracking-tight text-white flex items-center gap-2">
              Jev AI Evaluator Suite
              <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700 font-mono">typesafe/jev</span>
            </h1>
            <p class="text-xs text-slate-400">Structured AI Evaluation for Career Projections & Proposals</p>
          </div>
        </div>

        <!-- Controls: Tabs + Credits & Passcode -->
        <div class="flex flex-wrap items-center gap-3">
          
          <!-- Navigation Tabs -->
          <div class="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button id="tab-btn-cv" type="button" class="tab-active px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV & Job Fit
            </button>
            <button id="tab-btn-upwork" type="button" class="tab-inactive px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Upwork Proposals
            </button>
          </div>

          <!-- Credit Badge -->
          <div id="credit-badge" class="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono flex items-center gap-1.5 text-slate-300">
            <span class="text-amber-400">🪙</span>
            <span id="credit-text">Loading credits...</span>
          </div>

          <!-- Passcode Action -->
          <button id="passcode-btn" type="button" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium transition text-slate-300 flex items-center gap-1.5 shadow-sm">
            <span>🔑</span>
            <span id="passcode-label">VIP Passcode</span>
          </button>

        </div>
      </div>
    </header>

    <!-- Passcode Modal -->
    <div id="passcode-modal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">🔑</span>
            <h3 class="text-sm font-bold text-white">Enter VIP / Course Passcode</h3>
          </div>
          <button id="close-modal-btn" class="text-slate-400 hover:text-white text-lg">&times;</button>
        </div>
        <p class="text-xs text-slate-400 leading-relaxed">
          Course members and VIPs can enter their access code to unlock <strong class="text-emerald-400">15 daily evaluations</strong>. Public users receive 3 free evaluations per day.
        </p>
        <div>
          <label for="passcode-input" class="block text-xs font-medium text-slate-300 mb-1.5">Passcode</label>
          <input type="text" id="passcode-input" placeholder="e.g. COURSE-VIP" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase tracking-wider font-mono focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="flex items-center justify-between pt-2">
          <button id="clear-passcode-btn" class="text-xs text-rose-400 hover:underline">Clear Passcode</button>
          <div class="flex items-center gap-2">
            <button id="cancel-modal-btn" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition">Cancel</button>
            <button id="save-passcode-btn" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition shadow-lg shadow-blue-500/25">Save & Unlock</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Workspace -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- ========================================== -->
      <!-- TAB 1: CV-TO-JD EVALUATOR -->
      <!-- ========================================== -->
      <section id="tab-content-cv" class="space-y-8">
        
        <!-- Top Action / Presets Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
          <div>
            <h2 class="text-sm font-bold text-white">CV & Job Description Alignment</h2>
            <p class="text-xs text-slate-400">Score overall fit, skills, experience, credentials, and pinpoint career gaps.</p>
          </div>
          <button id="load-sample-cv-btn" type="button" class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Load Sample Cloud Role & CV
          </button>
        </div>

        <!-- Inputs Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <!-- Job Description Input -->
          <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                <h3 class="text-sm font-semibold text-white tracking-wide uppercase">Target Job Description</h3>
              </div>
              <span id="jd-stats" class="text-xs text-slate-400 font-mono">0 words</span>
            </div>

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

            <textarea id="jd-text" rows="10" placeholder="Paste the target job description requirements, responsibilities, and qualifications..." class="w-full flex-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans leading-relaxed resize-none"></textarea>
          </div>

          <!-- Candidate CV Input -->
          <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                <h3 class="text-sm font-semibold text-white tracking-wide uppercase">Candidate CV / Resume</h3>
              </div>
              <span id="cv-stats" class="text-xs text-slate-400 font-mono">0 words</span>
            </div>

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

            <textarea id="cv-text" rows="10" placeholder="Paste your candidate CV, resume achievements, technical capabilities, and experience..." class="w-full flex-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-sans leading-relaxed resize-none"></textarea>
          </div>

        </div>

        <!-- Action Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
          <button id="evaluate-cv-btn" type="button" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none">
            <svg id="evaluate-cv-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span id="evaluate-cv-btn-text">⚡ Evaluate Alignment with Jev</span>
          </button>

          <button id="clear-cv-btn" type="button" class="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition">
            Clear Inputs
          </button>
        </div>

        <!-- Error Banner -->
        <div id="cv-error-banner" class="hidden p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-3">
          <svg class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div id="cv-error-message"></div>
        </div>

        <!-- Results Section -->
        <div id="cv-results-section" class="hidden space-y-6">
          
          <!-- Verdict Summary -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div class="space-y-1">
                <span class="text-xs uppercase font-bold tracking-wider text-slate-400">Interview Recommendation</span>
                <div class="flex items-center gap-3">
                  <span id="cv-verdict-badge" class="px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide"></span>
                  <span id="cv-verdict-confidence" class="text-xs font-mono text-slate-400"></span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-4 text-xs font-mono bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                <div>
                  <span class="text-slate-500">Latency:</span>
                  <span id="cv-metric-latency" class="text-slate-200 font-semibold ml-1">--</span>
                </div>
                <div class="border-l border-slate-700 pl-4">
                  <span class="text-slate-500">In Tokens:</span>
                  <span id="cv-metric-in-tokens" class="text-blue-400 font-semibold ml-1">--</span>
                </div>
                <div class="border-l border-slate-700 pl-4">
                  <span class="text-slate-500">Out Tokens:</span>
                  <span id="cv-metric-out-tokens" class="text-emerald-400 font-semibold ml-1">--</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Scorecards Grid (4 dimensions) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

          <!-- Biggest Gap Card -->
          <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚠️
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white tracking-wide uppercase">Identified Primary Gap Area</h4>
                  <p class="text-xs text-slate-400">Jev's classification of the most significant gap to bridge</p>
                </div>
              </div>
              <span id="cv-gap-pill" class="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-800 text-amber-300"></span>
            </div>
            <p id="cv-gap-description" class="text-xs text-slate-300 bg-slate-900/60 border border-slate-800 p-4 rounded-xl leading-relaxed"></p>
          </div>

          <!-- Raw JSON Accordion -->
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
              <pre id="cv-raw-json" class="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800"></pre>
            </div>
          </details>

        </div>

      </section>

      <!-- ========================================== -->
      <!-- TAB 2: UPWORK PROPOSAL EVALUATOR -->
      <!-- ========================================== -->
      <section id="tab-content-upwork" class="hidden space-y-8">
        
        <!-- Top Action / Presets Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
          <div>
            <h2 class="text-sm font-bold text-white">Upwork Job Post & Proposal Evaluator</h2>
            <p class="text-xs text-slate-400">Score hook impact, problem understanding, proof of work, tone, CTA, and budget alignment before bidding.</p>
          </div>
          <button id="load-sample-upwork-btn" type="button" class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
            <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Load Sample Upwork Job & Proposal
          </button>
        </div>

        <!-- Inputs Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <!-- Upwork Job Post Input -->
          <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                <h3 class="text-sm font-semibold text-white tracking-wide uppercase">Client Job Post</h3>
              </div>
              <span id="upwork-job-stats" class="text-xs text-slate-400 font-mono">0 words</span>
            </div>

            <div id="upwork-job-dropzone" class="border-2 border-dashed border-slate-700 hover:border-blue-500/60 rounded-xl p-4 text-center cursor-pointer transition bg-slate-900/50 mb-3 group">
              <input type="file" id="upwork-job-file-input" class="hidden" accept=".md,.markdown,.txt,.docx">
              <div class="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-xs text-slate-300 font-medium">Drop <span class="text-blue-400 font-semibold">.md, .txt, or .docx</span> job post here, or <span class="text-blue-400 underline">browse</span></p>
                <p id="upwork-job-file-name" class="text-xs text-emerald-400 font-mono hidden truncate max-w-full px-2 py-0.5 bg-emerald-950/50 border border-emerald-800 rounded"></p>
              </div>
            </div>

            <textarea id="upwork-job-text" rows="10" placeholder="Paste the Upwork client's job title, description, requirements, budget, and screening questions..." class="w-full flex-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans leading-relaxed resize-none"></textarea>
          </div>

          <!-- Proposal Draft Input -->
          <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                <h3 class="text-sm font-semibold text-white tracking-wide uppercase">Your Proposal Draft</h3>
              </div>
              <span id="upwork-prop-stats" class="text-xs text-slate-400 font-mono">0 words</span>
            </div>

            <div id="upwork-prop-dropzone" class="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl p-4 text-center cursor-pointer transition bg-slate-900/50 mb-3 group">
              <input type="file" id="upwork-prop-file-input" class="hidden" accept=".md,.markdown,.txt,.docx">
              <div class="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                <svg class="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-xs text-slate-300 font-medium">Drop <span class="text-emerald-400 font-semibold">.md, .txt, or .docx</span> proposal draft here, or <span class="text-emerald-400 underline">browse</span></p>
                <p id="upwork-prop-file-name" class="text-xs text-emerald-400 font-mono hidden truncate max-w-full px-2 py-0.5 bg-emerald-950/50 border border-emerald-800 rounded"></p>
              </div>
            </div>

            <textarea id="upwork-prop-text" rows="10" placeholder="Paste your proposal letter draft, opening hook, proof of work, answers, and call-to-action..." class="w-full flex-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-sans leading-relaxed resize-none"></textarea>
          </div>

        </div>

        <!-- Action Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
          <button id="evaluate-upwork-btn" type="button" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none">
            <svg id="evaluate-upwork-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span id="evaluate-upwork-btn-text">🚀 Evaluate Upwork Proposal with Jev</span>
          </button>

          <button id="clear-upwork-btn" type="button" class="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition">
            Clear Inputs
          </button>
        </div>

        <!-- Error Banner -->
        <div id="upwork-error-banner" class="hidden p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-3">
          <svg class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div id="upwork-error-message"></div>
        </div>

        <!-- Results Section -->
        <div id="upwork-results-section" class="hidden space-y-6">
          
          <!-- Verdict Summary -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div class="space-y-1">
                <span class="text-xs uppercase font-bold tracking-wider text-slate-400">Submission Readiness Verdict</span>
                <div class="flex items-center gap-3">
                  <span id="upwork-verdict-badge" class="px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide"></span>
                  <span id="upwork-verdict-confidence" class="text-xs font-mono text-slate-400"></span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-4 text-xs font-mono bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                <div>
                  <span class="text-slate-500">Latency:</span>
                  <span id="upwork-metric-latency" class="text-slate-200 font-semibold ml-1">--</span>
                </div>
                <div class="border-l border-slate-700 pl-4">
                  <span class="text-slate-500">In Tokens:</span>
                  <span id="upwork-metric-in-tokens" class="text-blue-400 font-semibold ml-1">--</span>
                </div>
                <div class="border-l border-slate-700 pl-4">
                  <span class="text-slate-500">Out Tokens:</span>
                  <span id="upwork-metric-out-tokens" class="text-emerald-400 font-semibold ml-1">--</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Scorecards Grid (6 dimensions) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <!-- 1. Hook Strength -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">🎣 Hook & First Impression</span>
                  <span id="score-hook-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-hook-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-hook" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-hook" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- 2. Problem Understanding -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">🧠 Problem Comprehension</span>
                  <span id="score-prob-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-prob-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-prob" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-prob" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- 3. Technical Credibility -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">🏆 Technical Proof & Authority</span>
                  <span id="score-cred-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-cred-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-cred" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-cred" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- 4. Brevity & Tone -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">✍️ Brevity, Structure & Tone</span>
                  <span id="score-tone-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-tone-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-tone" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-tone" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- 5. Call to Action -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">💬 Call to Action (CTA)</span>
                  <span id="score-cta-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-cta-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-cta" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-cta" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- 6. Scope & Budget Fit -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">💰 Scope & Budget Calibration</span>
                  <span id="score-bud-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-bud-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-bud" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-bud" class="text-xs text-slate-400 leading-normal"></p>
            </div>

          </div>

          <!-- Primary Weakness Card -->
          <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚠️
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white tracking-wide uppercase">Primary Proposal Bottleneck</h4>
                  <p class="text-xs text-slate-400">Jev's identification of the single biggest conversion blocker</p>
                </div>
              </div>
              <span id="upwork-weak-pill" class="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-800 text-amber-300"></span>
            </div>
            <p id="upwork-weak-description" class="text-xs text-slate-300 bg-slate-900/60 border border-slate-800 p-4 rounded-xl leading-relaxed"></p>
          </div>

          <!-- Raw JSON Accordion -->
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
              <pre id="upwork-raw-json" class="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800"></pre>
            </div>
          </details>

        </div>

      </section>

    </main>
  </div>

  <footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-500 border-t border-slate-800/60 w-full">
    Cloudflare Workers AI &bull; Model: <span class="font-mono text-slate-400">typesafe/jev</span> &bull; 10k Free Neurons/day
  </footer>

  <!-- Client-Side App Logic -->
  <script>
    // Sample Data
    const sampleCV_JD = {
      jd: \`Role: Principal Cloud Solutions Architect
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
- Bachelor's or Master's degree in Computer Science or equivalent practical experience.\`,
      cv: \`Alexandre Franco
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
- Google Cloud Certified Professional Cloud Architect\`
    };

    const sampleUpwork = {
      job: \`Job Title: Senior Cloudflare Workers & AI Agent Architect Needed for Edge App
Client Budget: $4,500 Fixed Price (or $95/hr)
Project Duration: 2-3 weeks

Job Description:
We are looking for a senior cloud architect with deep experience in Cloudflare Workers and Workers AI to build an autonomous edge evaluation service. 
The system needs to process incoming requests at sub-50ms latency, bind to Workers AI (LLM / scoring models), and provide a lightweight, responsive dashboard for client analytics.

Required Skills:
- Cloudflare Workers, Wrangler, TypeScript
- Workers AI bindings & prompt evaluation architecture
- Clean, responsive embedded UI development
- Ability to start immediately and deliver a working prototype in 5 days.

Question for Applicants:
1. What was the most complex Cloudflare Worker system you designed and what was the p99 latency?\`,
      proposal: \`Hi there,

I can architect and deliver your Cloudflare Workers AI evaluation service with sub-50ms edge latency within your 5-day prototype target.

Quick answer to your question:
Recently, I architected a multi-region Cloudflare Worker system integrated with Workers AI (TypeSafe Jev model) and KV storage that handled structured evaluation pipelines with a p99 edge execution latency of under 42ms.

How I will deliver this for you:
1. Edge Architecture: Build the core TypeScript Worker using latest Wrangler bindings and optimized Workers AI inference streams.
2. Lightweight Dashboard: Embed a responsive, zero-overhead Tailwind UI served directly from the Worker (zero external hosting needed).
3. Production Hardening: Include automated CI/CD GitHub Actions workflows and comprehensive type safety.

Deliverables & Timeline:
- Milestone 1 (Day 3): Working edge API with AI evaluation binding and automated tests.
- Milestone 2 (Day 5): Full interactive dashboard and deployment documentation.

Are you available for a brief 10-minute sync today to confirm your target AI model and request schemas?

Best regards,
Alexandre Franco
Enterprise Cloud & AI Solutions Architect\`
    };

    // Dictionary mappings
    const criteriaExplanationsCV = {
      overall: ["Missing most requirements", "Meets some requirements with gaps", "Meets many requirements", "Meets most requirements", "Meets or exceeds all requirements"],
      skills: ["Major technical gaps", "Some missing skills", "Partial skills match", "Good skills match", "Complete skills match"],
      exp: ["Insufficient experience", "Marginal experience", "Adequate experience", "Strong experience", "Exceptional experience"],
      edu: ["Does not meet education", "Partially meets education", "Meets required education", "Exceeds with certifications", "Far exceeds requirements"]
    };

    const cvGapLabels = {
      none: "No Significant Gaps",
      technical_skills: "Technical Skills Gap",
      experience: "Experience Duration / Depth Gap",
      education: "Education & Credentials Gap",
      domain_knowledge: "Industry / Domain Knowledge Gap",
      soft_skills: "Leadership & Communication Gap",
      seniority: "Seniority Level Mismatch"
    };

    const cvGapContext = {
      none: "The candidate's profile demonstrates comprehensive alignment with all core requirements and criteria.",
      technical_skills: "The job description emphasizes specific tools, languages, or frameworks that are missing or insufficiently highlighted in the candidate's CV.",
      experience: "The candidate shows relevant background but may be slightly below the required years of direct experience or specific scale required in the job description.",
      education: "The role requires specific degree levels or certifications that were not explicitly found on the resume.",
      domain_knowledge: "The role demands specialized vertical knowledge that may need to be bridged during the interview.",
      soft_skills: "The job description places strong emphasis on leadership, executive presence, or stakeholder management.",
      seniority: "The role requires a different level of organizational seniority."
    };

    const upworkWeaknessLabels = {
      none: "Optimized & Highly Competitive",
      generic_hook: "Generic / Boilerplate Opening Hook",
      lack_of_proof: "Insufficient Tangible Proof / Case Studies",
      weak_cta: "Weak or Passive Call to Action",
      too_lengthy_unstructured: "Overly Verbose / Hard to Scan",
      missed_key_requirement: "Missed Explicit Question / Requirement",
      passive_tone: "Subordinate or Passive Consulting Tone"
    };

    const upworkWeaknessContext = {
      none: "The proposal is punchy, credible, directly addresses client pain points, and presents a compelling low-friction next step.",
      generic_hook: "The first 2 lines waste the client's inbox preview on generic pleasantries. Start immediately with the client's problem, solution angle, or relevant credential.",
      lack_of_proof: "The proposal makes claims without backing them up with quantifiable metrics, specific tech stack experience, or concrete portfolio references.",
      weak_cta: "The closing is passive (e.g. 'Looking forward to hearing from you'). End with an insightful question about their architecture, timeline, or a specific next step.",
      too_lengthy_unstructured: "Clients scan proposals on mobile in under 15 seconds. Use shorter paragraphs, bullet points, and eliminate non-essential background details.",
      missed_key_requirement: "The client asked specific screening questions or mentioned key constraints that were not answered directly in the proposal body.",
      passive_tone: "The tone reads like a job seeker asking for employment rather than an authoritative peer consultant proposing a high-ROI business solution."
    };

    // Passcode & Credit Logic
    function getStoredPasscode() {
      return localStorage.getItem('jev_passcode') || '';
    }

    function setStoredPasscode(code) {
      if (code) {
        localStorage.setItem('jev_passcode', code);
      } else {
        localStorage.removeItem('jev_passcode');
      }
    }

    function getApiHeaders() {
      const headers = { 'Content-Type': 'application/json' };
      const code = getStoredPasscode();
      if (code) {
        headers['X-Passcode'] = code;
      }
      return headers;
    }

    const creditText = document.getElementById('credit-text');
    const passcodeLabel = document.getElementById('passcode-label');
    const passcodeModal = document.getElementById('passcode-modal');
    const passcodeBtn = document.getElementById('passcode-btn');
    const passcodeInput = document.getElementById('passcode-input');
    const savePasscodeBtn = document.getElementById('save-passcode-btn');
    const clearPasscodeBtn = document.getElementById('clear-passcode-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');

    async function updateCreditBadge() {
      try {
        const res = await fetch('/api/credits', { headers: getApiHeaders() });
        if (res.ok) {
          const data = await res.json();
          if (data.tier === 'admin') {
            creditText.textContent = 'Admin (Unlimited)';
            passcodeLabel.textContent = '👑 Admin Active';
          } else if (data.tier === 'vip') {
            creditText.textContent = \`\${data.remaining} / \${data.limit} daily\`;
            passcodeLabel.textContent = '⭐ VIP Member';
          } else {
            creditText.textContent = \`\${data.remaining} / \${data.limit} daily\`;
            passcodeLabel.textContent = '🔑 VIP Passcode';
          }
        }
      } catch (e) {
        creditText.textContent = '3 daily';
      }
    }

    passcodeBtn.addEventListener('click', () => {
      passcodeInput.value = getStoredPasscode();
      passcodeModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => passcodeModal.classList.add('hidden'));
    cancelModalBtn.addEventListener('click', () => passcodeModal.classList.add('hidden'));

    savePasscodeBtn.addEventListener('click', async () => {
      const code = passcodeInput.value.trim();
      setStoredPasscode(code);
      passcodeModal.classList.add('hidden');
      await updateCreditBadge();
    });

    clearPasscodeBtn.addEventListener('click', async () => {
      setStoredPasscode('');
      passcodeInput.value = '';
      passcodeModal.classList.add('hidden');
      await updateCreditBadge();
    });

    // On Load: fetch credits
    updateCreditBadge();

    // Tab Switching Logic
    const tabBtnCv = document.getElementById('tab-btn-cv');
    const tabBtnUpwork = document.getElementById('tab-btn-upwork');
    const tabContentCv = document.getElementById('tab-content-cv');
    const tabContentUpwork = document.getElementById('tab-content-upwork');

    tabBtnCv.addEventListener('click', () => {
      tabBtnCv.className = 'tab-active px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5';
      tabBtnUpwork.className = 'tab-inactive px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5';
      tabContentCv.classList.remove('hidden');
      tabContentUpwork.classList.add('hidden');
    });

    tabBtnUpwork.addEventListener('click', () => {
      tabBtnUpwork.className = 'tab-active px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5';
      tabBtnCv.className = 'tab-inactive px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5';
      tabContentUpwork.classList.remove('hidden');
      tabContentCv.classList.add('hidden');
    });

    // Helper: Setup file dropzones
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

    function updateWordStats(textarea, statsEl) {
      const text = textarea.value.trim();
      const words = text.length > 0 ? text.split(/\\s+/).length : 0;
      statsEl.textContent = \`\${words} words (\${text.length} chars)\`;
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
          updateWordStats(textarea, statsEl);
        } catch (err) {
          alert('Could not parse file: ' + err.message);
        }
      }
    }

    function getScoreColor(normalizedScore5) {
      if (normalizedScore5 >= 3.8) return { bar: 'bg-emerald-500', text: 'text-emerald-400' };
      if (normalizedScore5 >= 2.6) return { bar: 'bg-amber-500', text: 'text-amber-400' };
      return { bar: 'bg-rose-500', text: 'text-rose-400' };
    }

    // ==========================================
    // TAB 1: CV-JD Handlers
    // ==========================================
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
    const loadSampleCvBtn = document.getElementById('load-sample-cv-btn');
    const evaluateCvBtn = document.getElementById('evaluate-cv-btn');
    const evaluateCvBtnText = document.getElementById('evaluate-cv-btn-text');
    const evaluateCvSpinner = document.getElementById('evaluate-cv-spinner');
    const clearCvBtn = document.getElementById('clear-cv-btn');
    const cvErrorBanner = document.getElementById('cv-error-banner');
    const cvErrorMessage = document.getElementById('cv-error-message');
    const cvResultsSection = document.getElementById('cv-results-section');

    jdText.addEventListener('input', () => updateWordStats(jdText, jdStats));
    cvText.addEventListener('input', () => updateWordStats(cvText, cvStats));

    setupDropzone(jdDropzone, jdFileInput, jdText, jdStats, jdFileName);
    setupDropzone(cvDropzone, cvFileInput, cvText, cvStats, cvFileName);

    loadSampleCvBtn.addEventListener('click', () => {
      jdText.value = sampleCV_JD.jd;
      cvText.value = sampleCV_JD.cv;
      jdFileName.classList.add('hidden');
      cvFileName.classList.add('hidden');
      updateWordStats(jdText, jdStats);
      updateWordStats(cvText, cvStats);
      cvErrorBanner.classList.add('hidden');
    });

    clearCvBtn.addEventListener('click', () => {
      jdText.value = '';
      cvText.value = '';
      jdFileName.classList.add('hidden');
      cvFileName.classList.add('hidden');
      updateWordStats(jdText, jdStats);
      updateWordStats(cvText, cvStats);
      cvResultsSection.classList.add('hidden');
      cvErrorBanner.classList.add('hidden');
    });

    evaluateCvBtn.addEventListener('click', async () => {
      const jd = jdText.value.trim();
      const cv = cvText.value.trim();

      if (!jd || !cv) {
        cvErrorBanner.classList.remove('hidden');
        cvErrorMessage.textContent = 'Please provide both the Job Description and Candidate CV before evaluating.';
        return;
      }

      cvErrorBanner.classList.add('hidden');
      evaluateCvBtn.disabled = true;
      evaluateCvSpinner.classList.remove('hidden');
      evaluateCvBtnText.textContent = 'Evaluating with Jev...';

      const startTime = performance.now();

      try {
        const res = await fetch('/cv-jd', {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({ jd, cv })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          const errText = errData?.error || \`HTTP \${res.status}\`;
          throw new Error(errText);
        }

        const data = await res.json();
        const latencyMs = Math.round(performance.now() - startTime);

        renderCvResults(data, latencyMs);
        await updateCreditBadge();
      } catch (err) {
        cvErrorBanner.classList.remove('hidden');
        cvErrorMessage.textContent = err.message;
      } finally {
        evaluateCvBtn.disabled = false;
        evaluateCvSpinner.classList.add('hidden');
        evaluateCvBtnText.textContent = '⚡ Evaluate Alignment with Jev';
      }
    });

    function renderCvResults(data, latencyMs) {
      const payload = (data && data.result) ? data.result : data;
      const answers = payload.answers || {};
      const usage = payload.usage || data.usage || {};

      // 1. Verdict
      const verdict = answers.recommend_interview;
      const verdictBadge = document.getElementById('cv-verdict-badge');
      const verdictConf = document.getElementById('cv-verdict-confidence');
      
      let isRecommended = false;
      let confPercent = null;

      if (verdict) {
        if (typeof verdict.noul === 'number') {
          isRecommended = verdict.noul >= 0.5;
          confPercent = Math.round((isRecommended ? verdict.noul : (1 - verdict.noul)) * 100);
        } else if (typeof verdict.answer === 'boolean') {
          isRecommended = verdict.answer;
          if (typeof verdict.confidence === 'number') confPercent = Math.round(verdict.confidence * 100);
        }
      }

      if (isRecommended) {
        verdictBadge.textContent = '✅ RECOMMENDED FOR INTERVIEW';
        verdictBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-emerald-950/80 border border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/30';
      } else {
        verdictBadge.textContent = '⚠️ NOT RECOMMENDED / SIGNIFICANT GAPS';
        verdictBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-amber-950/80 border border-amber-500 text-amber-300 shadow-lg shadow-amber-900/30';
      }

      verdictConf.textContent = confPercent !== null ? \`\${confPercent}% model confidence\` : '';

      document.getElementById('cv-metric-latency').textContent = \`\${latencyMs}ms\`;
      document.getElementById('cv-metric-in-tokens').textContent = usage.input_tokens ?? '--';
      document.getElementById('cv-metric-out-tokens').textContent = usage.output_tokens ?? '--';

      function setScoreCard(key, scoreValId, scoreConfId, barId, descId, defaultCriteriaArray) {
        const item = answers[key];
        const rawScore = typeof item?.score === 'number' ? item.score : 0;
        const hasZeroIndex = item?.legend && item.legend["0"] !== undefined;
        const score5 = (hasZeroIndex || rawScore <= 4) ? (rawScore + 1) : rawScore;
        const displayScore = score5 > 0 ? score5.toFixed(1) : '--';
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

        let desc = 'Assessment completed.';
        const roundedIdx = Math.round(rawScore);
        if (item?.legend && item.legend[String(roundedIdx)]) {
          desc = item.legend[String(roundedIdx)];
        } else if (defaultCriteriaArray[roundedIdx]) {
          desc = defaultCriteriaArray[roundedIdx];
        }
        document.getElementById(descId).textContent = desc;
      }

      setScoreCard('overall_alignment', 'score-overall-val', 'score-overall-conf', 'bar-overall', 'desc-overall', criteriaExplanationsCV.overall);
      setScoreCard('skills_match', 'score-skills-val', 'score-skills-conf', 'bar-skills', 'desc-skills', criteriaExplanationsCV.skills);
      setScoreCard('experience_match', 'score-exp-val', 'score-exp-conf', 'bar-exp', 'desc-exp', criteriaExplanationsCV.exp);
      setScoreCard('education_match', 'score-edu-val', 'score-edu-conf', 'bar-edu', 'desc-edu', criteriaExplanationsCV.edu);

      const gapChoice = answers.biggest_gap?.choice || 'none';
      document.getElementById('cv-gap-pill').textContent = cvGapLabels[gapChoice] || gapChoice;
      document.getElementById('cv-gap-description').textContent = cvGapContext[gapChoice] || 'No specific gap detected.';

      document.getElementById('cv-raw-json').textContent = JSON.stringify(data, null, 2);
      cvResultsSection.classList.remove('hidden');
      cvResultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // ==========================================
    // TAB 2: Upwork Evaluator Handlers
    // ==========================================
    const upworkJobText = document.getElementById('upwork-job-text');
    const upworkPropText = document.getElementById('upwork-prop-text');
    const upworkJobStats = document.getElementById('upwork-job-stats');
    const upworkPropStats = document.getElementById('upwork-prop-stats');
    const upworkJobDropzone = document.getElementById('upwork-job-dropzone');
    const upworkPropDropzone = document.getElementById('upwork-prop-dropzone');
    const upworkJobFileInput = document.getElementById('upwork-job-file-input');
    const upworkPropFileInput = document.getElementById('upwork-prop-file-input');
    const upworkJobFileName = document.getElementById('upwork-job-file-name');
    const upworkPropFileName = document.getElementById('upwork-prop-file-name');
    const loadSampleUpworkBtn = document.getElementById('load-sample-upwork-btn');
    const evaluateUpworkBtn = document.getElementById('evaluate-upwork-btn');
    const evaluateUpworkBtnText = document.getElementById('evaluate-upwork-btn-text');
    const evaluateUpworkSpinner = document.getElementById('evaluate-upwork-spinner');
    const clearUpworkBtn = document.getElementById('clear-upwork-btn');
    const upworkErrorBanner = document.getElementById('upwork-error-banner');
    const upworkErrorMessage = document.getElementById('upwork-error-message');
    const upworkResultsSection = document.getElementById('upwork-results-section');

    upworkJobText.addEventListener('input', () => updateWordStats(upworkJobText, upworkJobStats));
    upworkPropText.addEventListener('input', () => updateWordStats(upworkPropText, upworkPropStats));

    setupDropzone(upworkJobDropzone, upworkJobFileInput, upworkJobText, upworkJobStats, upworkJobFileName);
    setupDropzone(upworkPropDropzone, upworkPropFileInput, upworkPropText, upworkPropStats, upworkPropFileName);

    loadSampleUpworkBtn.addEventListener('click', () => {
      upworkJobText.value = sampleUpwork.job;
      upworkPropText.value = sampleUpwork.proposal;
      upworkJobFileName.classList.add('hidden');
      upworkPropFileName.classList.add('hidden');
      updateWordStats(upworkJobText, upworkJobStats);
      updateWordStats(upworkPropText, upworkPropStats);
      upworkErrorBanner.classList.add('hidden');
    });

    clearUpworkBtn.addEventListener('click', () => {
      upworkJobText.value = '';
      upworkPropText.value = '';
      upworkJobFileName.classList.add('hidden');
      upworkPropFileName.classList.add('hidden');
      updateWordStats(upworkJobText, upworkJobStats);
      updateWordStats(upworkPropText, upworkPropStats);
      upworkResultsSection.classList.add('hidden');
      upworkErrorBanner.classList.add('hidden');
    });

    evaluateUpworkBtn.addEventListener('click', async () => {
      const job_post = upworkJobText.value.trim();
      const proposal = upworkPropText.value.trim();

      if (!job_post || !proposal) {
        upworkErrorBanner.classList.remove('hidden');
        upworkErrorMessage.textContent = 'Please provide both the Upwork Job Post and your Proposal Draft before evaluating.';
        return;
      }

      upworkErrorBanner.classList.add('hidden');
      evaluateUpworkBtn.disabled = true;
      evaluateUpworkSpinner.classList.remove('hidden');
      evaluateUpworkBtnText.textContent = 'Evaluating Proposal with Jev...';

      const startTime = performance.now();

      try {
        const res = await fetch('/upwork-proposal', {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({ job_post, proposal })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          const errText = errData?.error || \`HTTP \${res.status}\`;
          throw new Error(errText);
        }

        const data = await res.json();
        const latencyMs = Math.round(performance.now() - startTime);

        renderUpworkResults(data, latencyMs);
        await updateCreditBadge();
      } catch (err) {
        upworkErrorBanner.classList.remove('hidden');
        upworkErrorMessage.textContent = err.message;
      } finally {
        evaluateUpworkBtn.disabled = false;
        evaluateUpworkSpinner.classList.add('hidden');
        evaluateUpworkBtnText.textContent = '🚀 Evaluate Upwork Proposal with Jev';
      }
    });

    function renderUpworkResults(data, latencyMs) {
      const payload = (data && data.result) ? data.result : data;
      const answers = payload.answers || {};
      const usage = payload.usage || data.usage || {};

      // 1. Verdict (recommend_submission)
      const verdict = answers.recommend_submission;
      const verdictBadge = document.getElementById('upwork-verdict-badge');
      const verdictConf = document.getElementById('upwork-verdict-confidence');
      
      let isRecommended = false;
      let confPercent = null;

      if (verdict) {
        if (typeof verdict.noul === 'number') {
          isRecommended = verdict.noul >= 0.5;
          confPercent = Math.round((isRecommended ? verdict.noul : (1 - verdict.noul)) * 100);
        } else if (typeof verdict.answer === 'boolean') {
          isRecommended = verdict.answer;
          if (typeof verdict.confidence === 'number') confPercent = Math.round(verdict.confidence * 100);
        }
      }

      if (isRecommended) {
        verdictBadge.textContent = '🚀 READY TO SUBMIT';
        verdictBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-emerald-950/80 border border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/30';
      } else {
        verdictBadge.textContent = '⚠️ REVISE BEFORE SUBMITTING';
        verdictBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-amber-950/80 border border-amber-500 text-amber-300 shadow-lg shadow-amber-900/30';
      }

      verdictConf.textContent = confPercent !== null ? \`\${confPercent}% model confidence\` : '';

      document.getElementById('upwork-metric-latency').textContent = \`\${latencyMs}ms\`;
      document.getElementById('upwork-metric-in-tokens').textContent = usage.input_tokens ?? '--';
      document.getElementById('upwork-metric-out-tokens').textContent = usage.output_tokens ?? '--';

      function setUpworkCard(key, scoreValId, scoreConfId, barId, descId) {
        const item = answers[key];
        const rawScore = typeof item?.score === 'number' ? item.score : 0;
        const hasZeroIndex = item?.legend && item.legend["0"] !== undefined;
        const score5 = (hasZeroIndex || rawScore <= 4) ? (rawScore + 1) : rawScore;
        const displayScore = score5 > 0 ? score5.toFixed(1) : '--';
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

        let desc = 'Assessment completed.';
        const roundedIdx = Math.round(rawScore);
        if (item?.legend && item.legend[String(roundedIdx)]) {
          desc = item.legend[String(roundedIdx)];
        }
        document.getElementById(descId).textContent = desc;
      }

      setUpworkCard('hook_strength', 'score-hook-val', 'score-hook-conf', 'bar-hook', 'desc-hook');
      setUpworkCard('problem_understanding', 'score-prob-val', 'score-prob-conf', 'bar-prob', 'desc-prob');
      setUpworkCard('technical_credibility', 'score-cred-val', 'score-cred-conf', 'bar-cred', 'desc-cred');
      setUpworkCard('brevity_and_tone', 'score-tone-val', 'score-tone-conf', 'bar-tone', 'desc-tone');
      setUpworkCard('call_to_action', 'score-cta-val', 'score-cta-conf', 'bar-cta', 'desc-cta');
      setUpworkCard('scope_budget_fit', 'score-bud-val', 'score-bud-conf', 'bar-bud', 'desc-bud');

      const weakChoice = answers.primary_weakness?.choice || 'none';
      document.getElementById('upwork-weak-pill').textContent = upworkWeaknessLabels[weakChoice] || weakChoice;
      document.getElementById('upwork-weak-description').textContent = upworkWeaknessContext[weakChoice] || 'No specific bottleneck detected.';

      document.getElementById('upwork-raw-json').textContent = JSON.stringify(data, null, 2);
      upworkResultsSection.classList.remove('hidden');
      upworkResultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  </script>
</body>
</html>`;
}
