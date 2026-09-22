export function getHtmlDashboard(): string {
  const coffeeUrl = "https://buymeacoffee.com/alexandrefranco";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jev AI Evaluator Suite - CV & Upwork Proposals</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
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

        <!-- Controls: Tabs + Credits + Buy Me a Coffee + Passcode -->
        <div class="flex flex-wrap items-center gap-2.5">
          
          <!-- Navigation Tabs -->
          <div class="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button id="tab-btn-cv" type="button" class="tab-active px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV & Job Fit
            </button>
            <button id="tab-btn-upwork" type="button" class="tab-inactive px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Upwork Proposals
            </button>
            <button id="tab-btn-attack" type="button" class="tab-inactive px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              30-Day Attack
            </button>
          </div>

          <!-- Credit Badge -->
          <div id="credit-badge" class="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono flex items-center gap-1.5 text-slate-300">
            <span class="text-amber-400">🪙</span>
            <span id="credit-text">Loading...</span>
          </div>

          <!-- Passcode Action -->
          <button id="passcode-btn" type="button" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium transition text-slate-300 flex items-center gap-1.5 shadow-sm">
            <span>🔑</span>
            <span id="passcode-label">VIP Code</span>
          </button>

          <!-- Buy Me a Coffee Action Button -->
          <a href="${coffeeUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold text-xs transition flex items-center gap-1.5 shadow-sm hover:scale-105 transform">
            <span>☕</span>
            <span>Buy Me a Coffee</span>
          </a>

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
          <input type="text" id="passcode-input" placeholder="Enter VIP passcode..." class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase tracking-wider font-mono focus:outline-none focus:ring-2 focus:ring-blue-500">
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

    <!-- Datalumina Attribution & IP Policy Modal -->
    <div id="datalumina-disclaimer-modal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-base">ℹ️</span>
            <h3 class="text-sm font-bold text-white">About & Policy Acknowledgement</h3>
          </div>
          <button id="close-disclaimer-btn" class="text-slate-400 hover:text-white text-lg">&times;</button>
        </div>

        <div class="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-1">
          <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <h4 class="font-bold text-white mb-1">🎯 Product Purpose</h4>
            <p class="text-slate-400">
              This evaluation dashboard is an independently developed utility built to help tech freelancers track their outbound sales metrics, conversion rates, and daily consistency across their attack sprints.
            </p>
          </div>

          <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <h4 class="font-bold text-white mb-1">💡 Framework Credit & Intellectual Property</h4>
            <p class="text-slate-400">
              The concept of the "30-Day Attack" and the 5-step conversion algorithm were created by <strong>Dave Ebbelaar</strong> as part of the <strong>Datalumina Data Freelancer program</strong>. All underlying course materials, training videos, and proprietary frameworks remain the exclusive intellectual property of <strong>Datalumina B.V.</strong>.
            </p>
          </div>

          <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <h4 class="font-bold text-white mb-1">🛡️ Legal & Non-Affiliation Notice</h4>
            <p class="text-slate-400">
              This application is not affiliated with, endorsed by, or sponsored by Datalumina B.V. No paid course content, proprietary worksheets, or curriculum video files are hosted or redistributed within this software.
            </p>
          </div>

          <div class="p-3 bg-blue-950/40 rounded-xl border border-blue-800/40 text-blue-300 flex items-center justify-between gap-3">
            <span>To access official coaching, curriculum, and community:</span>
            <a href="https://www.datalumina.com/" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex-shrink-0">
              Visit Datalumina ↗
            </a>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button id="close-disclaimer-modal-btn" type="button" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition">
            Close
          </button>
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
        <div id="cv-error-banner" class="hidden p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div id="cv-error-message"></div>
          </div>
          <a href="${coffeeUrl}" target="_blank" rel="noopener noreferrer" class="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-medium text-xs flex items-center gap-1.5 transition">
            <span>☕</span> Support Hosting
          </a>
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

          <!-- Value-Moment Support Card -->
          <div class="bg-gradient-to-r from-amber-950/40 via-slate-850 to-amber-950/40 border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3.5 text-left">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl flex-shrink-0">
                ☕
              </div>
              <div>
                <h4 class="text-xs font-bold text-amber-200 uppercase tracking-wider">Found this alignment assessment valuable?</h4>
                <p class="text-xs text-slate-400 mt-0.5">If Jev helped you evaluate your CV or identify blind spots, consider buying Alexandre a coffee to support hosting & AI Neurons.</p>
              </div>
            </div>
            <a href="${coffeeUrl}" target="_blank" rel="noopener noreferrer" class="flex-shrink-0 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition transform hover:-translate-y-0.5">
              💛 Buy Alexandre a Coffee
            </a>
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
        <div id="upwork-error-banner" class="hidden p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div id="upwork-error-message"></div>
          </div>
          <a href="${coffeeUrl}" target="_blank" rel="noopener noreferrer" class="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-medium text-xs flex items-center gap-1.5 transition">
            <span>☕</span> Support Hosting
          </a>
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

          <!-- Value-Moment Support Card -->
          <div class="bg-gradient-to-r from-amber-950/40 via-slate-850 to-amber-950/40 border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3.5 text-left">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl flex-shrink-0">
                ☕
              </div>
              <div>
                <h4 class="text-xs font-bold text-amber-200 uppercase tracking-wider">Found this proposal feedback valuable?</h4>
                <p class="text-xs text-slate-400 mt-0.5">If Jev helped you sharpen your hook, credibility, or CTA, consider buying Alexandre a coffee to support hosting & AI Neurons.</p>
              </div>
            </div>
            <a href="${coffeeUrl}" target="_blank" rel="noopener noreferrer" class="flex-shrink-0 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition transform hover:-translate-y-0.5">
              💛 Buy Alexandre a Coffee
            </a>
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

      <!-- ========================================== -->
      <!-- TAB 3: 30-DAY ATTACK EVALUATOR -->
      <!-- ========================================== -->
      <section id="tab-content-attack" class="hidden space-y-8">
        
        <!-- VIP Locked Banner (Visible when locked / Public tier) -->
        <div id="attack-locked-banner" class="bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-slate-900 border border-blue-500/40 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div class="flex items-start sm:items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl flex-shrink-0">
              🔒
            </div>
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                Datalumina Student Access
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 font-mono">VIP Passcode Required</span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5">
                The 30-Day Freelancer Attack Evaluator is reserved for course students. Enter your VIP passcode to unlock tracking file uploads and full AI evaluation.
              </p>
            </div>
          </div>
          <button id="attack-banner-unlock-btn" type="button" class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-500/25 flex items-center gap-2 flex-shrink-0">
            <span>🔑</span> Unlock with Passcode
          </button>
        </div>

        <!-- Interactive Container (Disabled until VIP passcode is provided) -->
        <div id="attack-interactive-container" class="space-y-8 opacity-40 pointer-events-none select-none transition-all duration-300">

        <!-- Top Action / Presets Bar -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-sm font-bold text-white flex items-center gap-2">
                <span>🚀</span> 30-Day Attack Performance Companion
              </h2>
              <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-mono">Independent Utility</span>
              <button id="open-disclaimer-btn" type="button" class="text-[11px] text-blue-400 hover:text-blue-300 underline font-medium flex items-center gap-1">
                <span>ℹ️</span> IP & Policy Notice
              </button>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed max-w-3xl">
              An independent performance tracker designed to evaluate your daily outbound execution, conversion ratios, and weekly pipeline progression across your 30-day sprint. Inspired by the 30-Day Attack methodology by Dave Ebbelaar & Datalumina.
            </p>
          </div>
          <div class="flex items-center gap-2 flex-wrap flex-shrink-0">
            <button id="load-sample-attack-btn" type="button" class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition shadow-sm">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              ⚡ Load Sample Data
            </button>
            <button id="clear-attack-btn" type="button" class="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">
              Reset
            </button>
            <button id="attack-vip-indicator" type="button" class="px-3 py-2 rounded-lg border border-amber-500/50 bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer">
              <span>🔒</span>
              <span id="attack-vip-text">VIP Passcode Required</span>
            </button>
            <a href="https://www.datalumina.com/" target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1">
              <span>🌐</span> Official Program ↗
            </a>
          </div>
        </div>

        <!-- 30-Day Window & Status Banner -->
        <div class="bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-800/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-base flex-shrink-0">
              🗓️
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs uppercase font-bold tracking-wider text-slate-400">Active 30-Day Attack Window</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 font-mono">Trailing 30-Days to Current Week</span>
              </div>
              <p id="attack-window-display" class="text-sm font-semibold text-white font-mono mt-0.5">
                Calculated dynamically from logs (e.g. End of Current Week - 30 days)
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-start md:self-auto">
            <button id="toggle-window-override-btn" type="button" class="text-xs text-blue-400 hover:text-blue-300 underline font-medium">
              Adjust Window Dates
            </button>
          </div>
        </div>

        <!-- Optional Window Override Drawer -->
        <div id="window-override-drawer" class="hidden bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 text-xs space-y-3">
          <div class="font-semibold text-slate-200">Custom Evaluation Window (Optional Override)</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-slate-400 mb-1">Start Date (YYYY-MM-DD)</label>
              <input type="date" id="custom-start-date" class="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-full">
            </div>
            <div>
              <label class="block text-slate-400 mb-1">End Date (YYYY-MM-DD)</label>
              <input type="date" id="custom-end-date" class="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-full">
            </div>
          </div>
        </div>

        <!-- Dropzone & Activity Summary Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Drag & Drop Uploader (2 cols) -->
          <div class="lg:col-span-2 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                  <h3 class="text-sm font-semibold text-white tracking-wide uppercase">Upload Student Tracking Files</h3>
                </div>
                <span class="text-xs text-slate-400 font-mono">12-Month .xlsx or .csv</span>
              </div>

              <div id="attack-dropzone" class="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl p-6 text-center cursor-pointer transition bg-slate-900/50 mb-3 group">
                <input type="file" id="attack-file-input" class="hidden" accept=".xlsx,.xls,.csv" multiple>
                <div class="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <svg class="w-8 h-8 text-slate-400 group-hover:text-emerald-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="text-xs text-slate-300 font-medium">
                    Drop your <span class="text-emerald-400 font-semibold">12-Month Workbook (.xlsx)</span> or <span class="text-emerald-400 font-semibold">Activity CSVs</span> here, or <span class="text-emerald-400 underline">browse</span>
                  </p>
                  <p class="text-[11px] text-slate-500">Supports multi-tab workbooks (Proposals, Calls, Monthly tabs) and standalone CSV exports.</p>
                </div>
              </div>
            </div>

            <!-- Upload Status Badges -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <div id="proposals-loaded-badge" class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span>📋</span> Proposals Log: <span id="proposals-count-text" class="text-white font-semibold">0 loaded</span>
              </div>
              <div id="calls-loaded-badge" class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span>📞</span> CRM Calls Log: <span id="calls-count-text" class="text-white font-semibold">0 loaded</span>
              </div>
              <div id="attack-file-pill" class="hidden px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[11px] font-mono text-emerald-300 truncate max-w-full"></div>
            </div>
          </div>

          <!-- Benchmark Targets Preview (1 col) -->
          <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
                  <h3 class="text-sm font-semibold text-white tracking-wide uppercase">Datalumina Benchmarks</h3>
                </div>
                <span class="text-[10px] text-emerald-400 font-mono">Official Baseline</span>
              </div>
              <ul class="space-y-2 text-xs">
                <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Total Outreach:</span>
                  <span class="font-mono text-slate-200 font-semibold">50 – 150</span>
                </li>
                <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Proposal Reply Rate:</span>
                  <span class="font-mono text-emerald-400 font-semibold">10% – 30%</span>
                </li>
                <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Interview Rate:</span>
                  <span class="font-mono text-emerald-400 font-semibold">10% – 30%</span>
                </li>
                <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Interview & Win Rate:</span>
                  <span class="font-mono text-emerald-400 font-semibold">20% – 40%</span>
                </li>
                <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Discovery Booking:</span>
                  <span class="font-mono text-slate-200 font-semibold">100% qual</span>
                </li>
              </ul>
            </div>

            <div class="pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
              Targets reflect the Datalumina 30-Day Attack performance guarantee criteria.
            </div>
          </div>

        </div>

        <!-- Action Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
          <button id="evaluate-attack-btn" type="button" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none">
            <svg id="evaluate-attack-spinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span id="evaluate-attack-btn-text">🚀 Evaluate 30-Day Attack Performance</span>
          </button>
        </div>

        <!-- Error Banner -->
        <div id="attack-error-banner" class="hidden p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div id="attack-error-message"></div>
          </div>
          <button id="attack-error-unlock-btn" type="button" class="hidden self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm flex-shrink-0">
            <span>🔑</span> Enter VIP Passcode
          </button>
        </div>

        <!-- Results Section -->
        <div id="attack-results-section" class="hidden space-y-8">
          
          <!-- Verdict & Guarantee Status Card -->
          <div class="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div class="space-y-1">
                <span class="text-xs uppercase font-bold tracking-wider text-slate-400">30-Day Attack Guarantee Trajectory</span>
                <div class="flex items-center gap-3">
                  <span id="attack-guarantee-badge" class="px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide"></span>
                  <span id="attack-guarantee-confidence" class="text-xs font-mono text-slate-400"></span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-4 text-xs font-mono bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                <div>
                  <span class="text-slate-500">Evaluated Window:</span>
                  <span id="attack-res-window" class="text-slate-200 font-semibold ml-1">--</span>
                </div>
                <div class="border-l border-slate-700 pl-4">
                  <span class="text-slate-500">Active Days:</span>
                  <span id="attack-res-activedays" class="text-blue-400 font-semibold ml-1">--</span>
                </div>
                <div class="border-l border-slate-700 pl-4">
                  <span class="text-slate-500">Daily Pace:</span>
                  <span id="attack-res-pace" class="text-emerald-400 font-semibold ml-1">--</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Primary Bottleneck Banner -->
          <div id="attack-bottleneck-card" class="bg-gradient-to-r from-amber-950/50 via-slate-850 to-slate-900 border border-amber-600/50 rounded-2xl p-6 shadow-xl space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                  ⚠️
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white tracking-wide uppercase">Primary 30-Day Attack Bottleneck</h4>
                  <p class="text-xs text-slate-400">Critical conversion constraint diagnosed by Jev AI</p>
                </div>
              </div>
              <span id="attack-bottleneck-pill" class="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-900/80 border border-amber-700 text-amber-200"></span>
            </div>
            <p id="attack-bottleneck-desc" class="text-xs text-slate-300 bg-slate-900/60 border border-slate-800 p-4 rounded-xl leading-relaxed"></p>
          </div>

          <!-- Scorecards Grid (4 Qualitative Dimensions) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <!-- Pipeline Health -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">🌊 Pipeline Health</span>
                  <span id="score-pipe-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-pipe-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-pipe" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-pipe" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- Funnel Efficiency -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">🎯 Funnel Efficiency</span>
                  <span id="score-funnel-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-funnel-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-funnel" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-funnel" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- Attack Discipline -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">⚡ Attack Discipline</span>
                  <span id="score-disc-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-disc-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-disc" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-disc" class="text-xs text-slate-400 leading-normal"></p>
            </div>

            <!-- Positioning & Targeting -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">🧭 Positioning & Fit</span>
                  <span id="score-pos-conf" class="text-[10px] font-mono text-slate-500"></span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                  <span id="score-pos-val" class="text-3xl font-extrabold text-white">--</span>
                  <span class="text-slate-500 text-xs font-semibold">/ 5</span>
                </div>
                <div class="w-full bg-slate-700/60 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div id="bar-pos" class="h-2.5 rounded-full transition-all duration-700" style="width: 0%"></div>
                </div>
              </div>
              <p id="desc-pos" class="text-xs text-slate-400 leading-normal"></p>
            </div>

          </div>

          <!-- Deterministic Funnel Waterfall & Metrics Grid -->
          <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>📊</span> 30-Day Conversion Funnel Waterfall
                </h3>
                <p class="text-xs text-slate-400">Proposals sent &rarr; Replies &rarr; Interviews / Calls &rarr; Closed Won</p>
              </div>
              <span class="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">Actual vs Benchmark</span>
            </div>

            <!-- 4 Waterfall Steps -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <!-- 1. Proposals -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <span class="text-xs text-slate-400 font-medium">1. Proposals Sent</span>
                <div class="flex items-baseline justify-between">
                  <span id="fn-proposals-sent" class="text-2xl font-black text-white">0</span>
                  <span class="text-xs font-mono text-slate-400">Target: 50-150</span>
                </div>
                <div id="fn-proposals-badge" class="text-[11px] font-mono font-semibold"></div>
              </div>

              <!-- 2. Replies -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <span class="text-xs text-slate-400 font-medium">2. Replies (Reply Rate)</span>
                <div class="flex items-baseline justify-between">
                  <span id="fn-replies" class="text-2xl font-black text-white">0</span>
                  <span id="fn-reply-rate" class="text-sm font-bold font-mono text-blue-400">0%</span>
                </div>
                <div id="fn-reply-badge" class="text-[11px] font-mono font-semibold"></div>
              </div>

              <!-- 3. Interviews -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <span class="text-xs text-slate-400 font-medium">3. Interviews (Interview Rate)</span>
                <div class="flex items-baseline justify-between">
                  <span id="fn-interviews" class="text-2xl font-black text-white">0</span>
                  <span id="fn-interview-rate" class="text-sm font-bold font-mono text-indigo-400">0%</span>
                </div>
                <div id="fn-interview-badge" class="text-[11px] font-mono font-semibold"></div>
              </div>

              <!-- 4. Won -->
              <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <span class="text-xs text-slate-400 font-medium">4. Closed Won Projects</span>
                <div class="flex items-baseline justify-between">
                  <span id="fn-won" class="text-2xl font-black text-white">0</span>
                  <span id="fn-win-rate" class="text-sm font-bold font-mono text-emerald-400">0%</span>
                </div>
                <div id="fn-won-badge" class="text-[11px] font-mono font-semibold"></div>
              </div>

            </div>

            <!-- CRM Call Sub-Metrics -->
            <div class="border-t border-slate-700/60 pt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              <div class="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div class="text-slate-500 text-[11px]">Total Calls</div>
                <div id="crm-total-calls" class="text-base font-bold text-white mt-1">0</div>
              </div>
              <div class="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div class="text-slate-500 text-[11px]">Intro Calls</div>
                <div id="crm-intro-calls" class="text-base font-bold text-blue-400 mt-1">0</div>
              </div>
              <div class="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div class="text-slate-500 text-[11px]">Discovery Calls</div>
                <div id="crm-discovery-calls" class="text-base font-bold text-indigo-400 mt-1">0</div>
              </div>
              <div class="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div class="text-slate-500 text-[11px]">Proposal Calls</div>
                <div id="crm-proposal-calls" class="text-base font-bold text-amber-400 mt-1">0</div>
              </div>
              <div class="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div class="text-slate-500 text-[11px]">Inbound Leads</div>
                <div id="crm-inbound-leads" class="text-base font-bold text-emerald-400 mt-1">0</div>
              </div>
            </div>
          </div>

          <!-- Weekly Cohort Progression & Velocity -->
          <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>📅</span> Week-by-Week Cohort Progression
                </h3>
                <p class="text-xs text-slate-400">Traces volume, replies, and momentum across the 4 weekly intervals of the 30-day attack</p>
              </div>
            </div>

            <div id="weekly-cohorts-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Dynamically rendered weekly cards -->
            </div>
          </div>

          <!-- Daily Momentum & Cadence + CRM Objections Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- Daily Cadence & Streaks -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>⚡</span> Daily Cadence & Momentum
              </h3>
              <div class="space-y-3 text-xs">
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Active Action Days:</span>
                  <span id="cadence-active-days" class="font-bold text-emerald-400 font-mono">0 / 30</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Dormant (Zero Activity) Days:</span>
                  <span id="cadence-dormant-days" class="font-bold text-rose-400 font-mono">0</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Density per Active Day:</span>
                  <span id="cadence-density" class="font-bold text-white font-mono">0 proposals/day</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span class="text-slate-400">Projected 30-Day Total at Current Pace:</span>
                  <span id="cadence-projected" class="font-bold text-blue-400 font-mono">0 proposals</span>
                </div>
              </div>
            </div>

            <!-- Recorded Objections & Targeted Roles -->
            <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>🛡️</span> CRM Objections & Targeted Roles
              </h3>
              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-[11px] text-slate-400 uppercase font-semibold">Identified Objections & Pushback:</span>
                  <div id="objections-list" class="mt-1.5 space-y-1">
                    <!-- Populated dynamically -->
                  </div>
                </div>
                <div class="pt-2 border-t border-slate-700/60">
                  <span class="text-[11px] text-slate-400 uppercase font-semibold">Sample Roles Targeted:</span>
                  <div id="sample-roles-list" class="mt-1.5 flex flex-wrap gap-1.5">
                    <!-- Populated dynamically -->
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Strategic Coaching Action Plan -->
          <div class="bg-gradient-to-br from-indigo-950/40 via-slate-850 to-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
                💡
              </div>
              <div>
                <h4 class="text-sm font-bold text-white tracking-wide uppercase">Datalumina Strategic Coaching Action Plan</h4>
                <p class="text-xs text-slate-400">Immediate next best actions to unblock your pipeline and land deals</p>
              </div>
            </div>
            <div id="coaching-plan-container" class="space-y-3 text-xs leading-relaxed text-slate-200">
              <!-- Dynamically generated action steps -->
            </div>
          </div>

          <!-- Export & Action Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <div class="text-xs text-slate-400">
              Ready to share progress or paste into course check-in:
            </div>
            <div class="flex items-center gap-2.5">
              <button id="copy-attack-report-btn" type="button" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center gap-2">
                <span>📋</span> Copy Markdown Report
              </button>
              <button id="download-attack-json-btn" type="button" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center gap-2">
                <span>⬇</span> Download JSON
              </button>
            </div>
          </div>

          <!-- Raw JSON Accordion -->
          <details class="group bg-slate-800/40 border border-slate-800 rounded-2xl p-4 text-xs">
            <summary class="font-medium text-slate-400 cursor-pointer hover:text-slate-200 flex items-center justify-between">
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                Inspect Raw 30-Day Attack JSON
              </span>
              <span class="text-[10px] font-mono text-slate-500">Full Output</span>
            </summary>
            <div class="mt-4 relative">
              <pre id="attack-raw-json" class="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800"></pre>
            </div>
          </details>

        </div>
        </div> <!-- End attack-interactive-container -->

      </section>

    </main>
  </div>

  <footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-500 border-t border-slate-800/60 w-full flex flex-col sm:flex-row items-center justify-between gap-3">
    <div>Cloudflare Workers AI &bull; Model: <span class="font-mono text-slate-400">typesafe/jev</span> &bull; 10k Free Neurons/day</div>
    <div class="flex items-center gap-4">
      <button id="footer-disclaimer-link" type="button" class="text-slate-400 hover:text-slate-200 hover:underline transition">
        ℹ️ Datalumina Attribution & Disclaimer
      </button>
      <a href="${coffeeUrl}" target="_blank" rel="noopener noreferrer" class="text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 font-medium">
        <span>☕</span> Support on Buy Me a Coffee
      </a>
    </div>
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

    const attackVipIndicator = document.getElementById('attack-vip-indicator');
    const attackVipText = document.getElementById('attack-vip-text');
    const attackErrorUnlockBtn = document.getElementById('attack-error-unlock-btn');
    const attackBannerUnlockBtn = document.getElementById('attack-banner-unlock-btn');

    function setAttackVipState(isVip) {
      const lockedBanner = document.getElementById('attack-locked-banner');
      const interactiveContainer = document.getElementById('attack-interactive-container');
      if (lockedBanner) {
        lockedBanner.classList.toggle('hidden', isVip);
      }
      if (interactiveContainer) {
        if (isVip) {
          interactiveContainer.classList.remove('opacity-40', 'pointer-events-none', 'select-none');
        } else {
          interactiveContainer.classList.add('opacity-40', 'pointer-events-none', 'select-none');
        }
      }
      if (attackVipIndicator && attackVipText) {
        if (isVip) {
          attackVipIndicator.className = 'px-3.5 py-2 rounded-lg border border-emerald-500/50 bg-emerald-950/60 text-emerald-300 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm';
          attackVipText.textContent = '⭐ VIP Access Active';
        } else {
          attackVipIndicator.className = 'px-3.5 py-2 rounded-lg border border-amber-500/50 bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer';
          attackVipText.textContent = '🔒 VIP Passcode Required';
        }
      }
    }

    async function updateCreditBadge() {
      try {
        const res = await fetch('/api/credits', { headers: getApiHeaders() });
        if (res.ok) {
          const data = await res.json();
          const isVipUser = data.tier === 'vip' || data.tier === 'admin';
          setAttackVipState(isVipUser);

          if (data.tier === 'admin') {
            creditText.textContent = 'Admin (Unlimited)';
            passcodeLabel.textContent = '👑 Admin Active';
          } else if (data.tier === 'vip') {
            creditText.textContent = \`\${data.remaining} / \${data.limit} daily\`;
            passcodeLabel.textContent = '⭐ VIP Member';
          } else {
            creditText.textContent = \`\${data.remaining} / \${data.limit} daily\`;
            passcodeLabel.textContent = '🔑 VIP Code';
          }
        }
      } catch (e) {
        creditText.textContent = '3 daily';
        setAttackVipState(false);
      }
    }

    if (attackBannerUnlockBtn) {
      attackBannerUnlockBtn.addEventListener('click', () => {
        passcodeInput.value = getStoredPasscode();
        passcodeModal.classList.remove('hidden');
      });
    }

    if (attackVipIndicator) {
      attackVipIndicator.addEventListener('click', () => {
        passcodeInput.value = getStoredPasscode();
        passcodeModal.classList.remove('hidden');
      });
    }

    if (attackErrorUnlockBtn) {
      attackErrorUnlockBtn.addEventListener('click', () => {
        passcodeInput.value = getStoredPasscode();
        passcodeModal.classList.remove('hidden');
      });
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

    // Datalumina Disclaimer Modal Listeners
    const disclaimerModal = document.getElementById('datalumina-disclaimer-modal');
    const openDisclaimerBtn = document.getElementById('open-disclaimer-btn');
    const footerDisclaimerLink = document.getElementById('footer-disclaimer-link');
    const closeDisclaimerBtn = document.getElementById('close-disclaimer-btn');
    const closeDisclaimerModalBtn = document.getElementById('close-disclaimer-modal-btn');

    if (openDisclaimerBtn && disclaimerModal) {
      openDisclaimerBtn.addEventListener('click', () => disclaimerModal.classList.remove('hidden'));
    }
    if (footerDisclaimerLink && disclaimerModal) {
      footerDisclaimerLink.addEventListener('click', () => disclaimerModal.classList.remove('hidden'));
    }
    if (closeDisclaimerBtn && disclaimerModal) {
      closeDisclaimerBtn.addEventListener('click', () => disclaimerModal.classList.add('hidden'));
    }
    if (closeDisclaimerModalBtn && disclaimerModal) {
      closeDisclaimerModalBtn.addEventListener('click', () => disclaimerModal.classList.add('hidden'));
    }
    if (disclaimerModal) {
      disclaimerModal.addEventListener('click', (e) => {
        if (e.target === disclaimerModal) disclaimerModal.classList.add('hidden');
      });
    }

    // On Load: fetch credits
    updateCreditBadge();

    // Tab Switching Logic
    const tabBtnCv = document.getElementById('tab-btn-cv');
    const tabBtnUpwork = document.getElementById('tab-btn-upwork');
    const tabBtnAttack = document.getElementById('tab-btn-attack');
    const tabContentCv = document.getElementById('tab-content-cv');
    const tabContentUpwork = document.getElementById('tab-content-upwork');
    const tabContentAttack = document.getElementById('tab-content-attack');

    function setActiveTab(tab) {
      tabBtnCv.className = (tab === 'cv' ? 'tab-active' : 'tab-inactive') + ' px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5';
      tabBtnUpwork.className = (tab === 'upwork' ? 'tab-active' : 'tab-inactive') + ' px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5';
      tabBtnAttack.className = (tab === 'attack' ? 'tab-active' : 'tab-inactive') + ' px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5';

      tabContentCv.classList.toggle('hidden', tab !== 'cv');
      tabContentUpwork.classList.toggle('hidden', tab !== 'upwork');
      tabContentAttack.classList.toggle('hidden', tab !== 'attack');
    }

    tabBtnCv.addEventListener('click', () => setActiveTab('cv'));
    tabBtnUpwork.addEventListener('click', () => setActiveTab('upwork'));
    tabBtnAttack.addEventListener('click', () => setActiveTab('attack'));

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

    // ==========================================
    // TAB 3: 30-DAY ATTACK CLIENT LOGIC
    // ==========================================

    const sampleAttackProposals = [
      { date: "9/9/2026", job: "AI Automation Expert Needed for Business Process Automation and AI Integration / AI Sales & Marketing Growth Lead | Shopify, Salesforce & E-commerce", url: "https://www.upwork.com/nx/proposals/2097711449320103937", proposal: true, reply: true, interview: true, won: false },
      { date: "10/9/2026", job: "AI Sales & Marketing Growth Lead | Shopify, Salesforce & E-commerce", url: "https://www.upwork.com/nx/proposals/2098129383084445697", proposal: true, reply: false, interview: false, won: false },
      { date: "15/9/2026", job: "Fractional AI Systems Advisor / Agentic AI Architect", url: "https://www.upwork.com/nx/proposals/2099804968871989249", proposal: true, reply: false, interview: false, won: false },
      { date: "15/9/2026", job: "Business Systems & Technology Architecture Consultant", url: "https://www.upwork.com/nx/proposals/2099860447236730881", proposal: true, reply: false, interview: false, won: false },
      { date: "15/9/2026", job: "Looking for Enterprise Architects, AI Architects, Solution Consultants", url: "https://www.upwork.com/nx/proposals/2099970780949880833", proposal: true, reply: false, interview: false, won: false },
      { date: "16/9/2026", job: "AI Agent & RAG Architecture Review Expert Needed", url: "https://www.upwork.com/nx/proposals/2100158980986572801", proposal: true, reply: false, interview: false, won: false }
    ];

    const sampleAttackCalls = [
      { date: "01/09/2026", name: "Morgyn Cowan - Lead EA", callType: "", outcome: "", whatWentWell: "Applied. DMed", objections: "" },
      { date: "04/09/2026", name: "Jeroen (CSO BizzDesign)", callType: "", outcome: "", whatWentWell: "Opinion on their new product", objections: "" },
      { date: "01/09/2026", name: "Venu (EA / LeanIX Contract)", callType: "Introduction", outcome: "Interview", whatWentWell: "120K / IT & Consultancy client", objections: "" },
      { date: "04/09/2026", name: "Nadir CTO - C.I.KNOW", callType: "Discovery", outcome: "", whatWentWell: "CTO | EA Practice Lead", objections: "" },
      { date: "08/07/2026", name: "Eskenazi", callType: "Discovery", outcome: "", whatWentWell: "Opportunity of partnership", objections: "" },
      { date: "09/09/2026", name: "Church of England - Head of Innovation and Architecture", callType: "", outcome: "", whatWentWell: "Applied.", objections: "" },
      { date: "09/09/2026", name: "Workiva - Principal Solutions Consultant AI", callType: "", outcome: "", whatWentWell: "Applied.", objections: "" },
      { date: "09/09/2026", name: "AVP - Head of EA", callType: "", outcome: "", whatWentWell: "Applied.", objections: "" },
      { date: "09/09/2026", name: "DataCareers - EA", callType: "", outcome: "", whatWentWell: "Applied.", objections: "" },
      { date: "09/09/2026", name: "Sanderson - EA", callType: "", outcome: "", whatWentWell: "Applied.", objections: "" },
      { date: "09/09/2026", name: "Stott and May - AI Architecture Lead", callType: "", outcome: "Lost", whatWentWell: "Applied.", objections: "" },
      { date: "07/09/2026", name: "Fidelity - Lead EA AI", callType: "", outcome: "Lost", whatWentWell: "Applied.", objections: "" },
      { date: "10/09/2026", name: "Ben - Enterprise Governance Architect", callType: "Inbound", outcome: "", whatWentWell: "Wait for booking a call", objections: "" },
      { date: "15/09/2026", name: "PWC - Enterprise AI Architect | Agentic AI & AI Platform Architecture", callType: "Inbound", outcome: "Discovery Call", whatWentWell: "CV shared. Wait for next steps", objections: "" },
      { date: "16/09/2026", name: "Ben - Enterprise Architect | Asset Management", callType: "", outcome: "", whatWentWell: "DMed Ben", objections: "" },
      { date: "17/09/2026", name: "Pradeep - EA Lloyds", callType: "Inbound", outcome: "", whatWentWell: "£600 inside IR35 - share CV", objections: "IR35 compliance constraints" }
    ];

    const attackBottleneckLabels = {
      outreach_volume_deficit: "Pipeline Outreach Volume Deficit",
      proposal_hook_copy: "Proposal Hook & Copy Weakness",
      discovery_qualification: "Discovery Call Booking Gap",
      objection_handling_closing: "Objection Handling & Closing Bottleneck",
      erratic_cadence: "Erratic Cadence & Dormant Gaps",
      lack_of_niche_focus: "Scattered Positioning & Lack of Niche Focus"
    };

    const attackBottleneckContext = {
      outreach_volume_deficit: "Your proposal volume is below the statistical threshold needed to secure client contracts. In the 30-day attack phase, prioritize raising your outreach to 2-3 proposals/day across Upwork, LinkedIn, and warm outreach.",
      proposal_hook_copy: "Your reply rate is lagging below the 10-30% benchmark. Your opening 2 lines and proof assets need sharpening to stop clients from skipping your proposals in their crowded inbox.",
      discovery_qualification: "You are generating initial replies or clicks, but failing to bridge them into booked strategy/discovery calls. Implement lower-friction conversation starters and direct scheduling links.",
      objection_handling_closing: "You are successfully booking conversations, but prospects stall on price, scope, or next steps. Standardize your productized scoping and upfront deposit terms (40-50%).",
      erratic_cadence: "Your activity occurs in sporadic bursts separated by dormant days. The Datalumina 30-day attack requires sustained daily action momentum.",
      lack_of_niche_focus: "You are submitting proposals for divergent roles. Narrow your positioning to one core specialized technical offer to project undisputed authority."
    };

    let attackDataState = {
      proposals: [],
      calls: [],
      window: null,
      lastResult: null
    };

    const loadSampleAttackBtn = document.getElementById('load-sample-attack-btn');
    const clearAttackBtn = document.getElementById('clear-attack-btn');
    const attackDropzone = document.getElementById('attack-dropzone');
    const attackFileInput = document.getElementById('attack-file-input');
    const attackFilePill = document.getElementById('attack-file-pill');
    const proposalsCountText = document.getElementById('proposals-count-text');
    const callsCountText = document.getElementById('calls-count-text');
    const attackWindowDisplay = document.getElementById('attack-window-display');
    const toggleWindowOverrideBtn = document.getElementById('toggle-window-override-btn');
    const windowOverrideDrawer = document.getElementById('window-override-drawer');
    const customStartDateInput = document.getElementById('custom-start-date');
    const customEndDateInput = document.getElementById('custom-end-date');
    const evaluateAttackBtn = document.getElementById('evaluate-attack-btn');
    const evaluateAttackSpinner = document.getElementById('evaluate-attack-spinner');
    const evaluateAttackBtnText = document.getElementById('evaluate-attack-btn-text');
    const attackErrorBanner = document.getElementById('attack-error-banner');
    const attackErrorMessage = document.getElementById('attack-error-message');
    const attackResultsSection = document.getElementById('attack-results-section');
    const copyAttackReportBtn = document.getElementById('copy-attack-report-btn');
    const downloadAttackJsonBtn = document.getElementById('download-attack-json-btn');

    // Helper: Normalize date in browser
    function clientNormalizeDate(dateVal) {
      if (!dateVal) return null;
      if (typeof dateVal === 'number' && !isNaN(dateVal)) {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const jsDate = new Date(excelEpoch.getTime() + dateVal * 86400000);
        if (!isNaN(jsDate.getTime())) return jsDate.toISOString().split('T')[0];
      }
      const str = String(dateVal).trim();
      if (!str) return null;
      if (/^\\d{4}-\\d{2}-\\d{2}$/.test(str)) return str;
      const slashMatch = str.match(/^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$/);
      if (slashMatch) {
        const p1 = parseInt(slashMatch[1], 10);
        const p2 = parseInt(slashMatch[2], 10);
        const y = parseInt(slashMatch[3], 10);
        let day = p1;
        let month = p2;
        if (p2 > 12 && p1 <= 12) { month = p1; day = p2; }
        return \`\${y}-\${String(month).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`;
      }
      const parsed = new Date(str);
      if (!isNaN(parsed.getTime())) return parsed.toISOString().split('T')[0];
      return null;
    }

    // Helper: Compute client attack window (trailing 30 days to end of current week)
    function computeClientAttackWindow() {
      const customStart = customStartDateInput.value.trim();
      const customEnd = customEndDateInput.value.trim();
      if (customStart && customEnd) {
        return { startDate: customStart, endDate: customEnd, daysCovered: 30, referenceDate: customEnd };
      }

      const allDates = [];
      attackDataState.proposals.forEach(p => { const d = clientNormalizeDate(p.date); if (d) allDates.push(d); });
      attackDataState.calls.forEach(c => { const d = clientNormalizeDate(c.date); if (d) allDates.push(d); });

      let refDateStr = new Date().toISOString().split('T')[0];
      if (allDates.length > 0) {
        allDates.sort();
        refDateStr = allDates[allDates.length - 1];
      }

      const [ry, rm, rd] = refDateStr.split('-').map(Number);
      const refDate = new Date(Date.UTC(ry, rm - 1, rd));
      const dayOfWeek = refDate.getUTCDay();
      const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
      const endOfWeek = new Date(refDate.getTime() + daysUntilSunday * 86400000);
      const startOfWindow = new Date(endOfWeek.getTime() - 29 * 86400000);

      const startDate = startOfWindow.toISOString().split('T')[0];
      const endDate = endOfWeek.toISOString().split('T')[0];

      return { startDate, endDate, daysCovered: 30, referenceDate: refDateStr };
    }

    function refreshAttackStateUI() {
      proposalsCountText.textContent = \`\${attackDataState.proposals.length} loaded\`;
      callsCountText.textContent = \`\${attackDataState.calls.length} loaded\`;

      const win = computeClientAttackWindow();
      attackDataState.window = win;
      attackWindowDisplay.textContent = \`\${win.startDate}  \u2192  \${win.endDate}  (Trailing 30-day window ending at Current Week)\`;

      if (!customStartDateInput.value) customStartDateInput.value = win.startDate;
      if (!customEndDateInput.value) customEndDateInput.value = win.endDate;
    }

    toggleWindowOverrideBtn.addEventListener('click', () => {
      windowOverrideDrawer.classList.toggle('hidden');
    });

    customStartDateInput.addEventListener('change', refreshAttackStateUI);
    customEndDateInput.addEventListener('change', refreshAttackStateUI);

    // Preset: Load Sample
    loadSampleAttackBtn.addEventListener('click', () => {
      attackDataState.proposals = JSON.parse(JSON.stringify(sampleAttackProposals));
      attackDataState.calls = JSON.parse(JSON.stringify(sampleAttackCalls));
      customStartDateInput.value = '';
      customEndDateInput.value = '';
      attackFilePill.classList.remove('hidden');
      attackFilePill.textContent = '⚡ Datalumina 30-Day Attack Sample Dataset Active';
      refreshAttackStateUI();
      attackResultsSection.classList.add('hidden');
      attackErrorBanner.classList.add('hidden');
    });

    // Preset: Clear
    clearAttackBtn.addEventListener('click', () => {
      attackDataState.proposals = [];
      attackDataState.calls = [];
      attackDataState.lastResult = null;
      customStartDateInput.value = '';
      customEndDateInput.value = '';
      attackFilePill.classList.add('hidden');
      attackFilePill.textContent = '';
      refreshAttackStateUI();
      attackResultsSection.classList.add('hidden');
      attackErrorBanner.classList.add('hidden');
    });

    // SheetJS Workbook and CSV Parser
    async function processAttackFiles(fileList) {
      if (!fileList || fileList.length === 0) return;
      if (typeof window.XLSX === 'undefined') {
        alert('SheetJS library is still loading. Please try again in 2 seconds.');
        return;
      }

      let newProposals = [];
      let newCalls = [];
      const fileNames = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        fileNames.push(file.name);
        const ext = file.name.split('.').pop().toLowerCase();
        const arrayBuf = await file.arrayBuffer();

        let wb;
        if (ext === 'csv') {
          const text = new TextDecoder().decode(arrayBuf);
          wb = window.XLSX.read(text, { type: 'string' });
        } else {
          wb = window.XLSX.read(new Uint8Array(arrayBuf), { type: 'array' });
        }

        wb.SheetNames.forEach(sheetName => {
          const sheet = wb.Sheets[sheetName];
          if (!sheet) return;
          const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
          if (!rows || rows.length < 2) return;

          // Find header row (usually row 0 or row with Date)
          let headerIdx = 0;
          for (let r = 0; r < Math.min(5, rows.length); r++) {
            const rowStr = rows[r].map(c => String(c).toLowerCase()).join(' ');
            if (rowStr.includes('date') || rowStr.includes('job') || rowStr.includes('call')) {
              headerIdx = r;
              break;
            }
          }

          const headers = rows[headerIdx].map(c => String(c).trim().toLowerCase());
          
          // Check if this sheet is Proposals, Calls, or Monthly Tracker
          const hasJob = headers.some(h => h.includes('job'));
          const hasCallType = headers.some(h => h.includes('call') || h.includes('outcome') || h.includes('improvement'));

          for (let r = headerIdx + 1; r < rows.length; r++) {
            const row = rows[r];
            if (!row || row.every(c => c === '')) continue;

            const rowObj = {};
            headers.forEach((h, idx) => {
              if (h) rowObj[h] = row[idx] ?? '';
            });

            const dateVal = rowObj['date'] || row[0];
            if (!dateVal || String(dateVal).toLowerCase().includes('total') || String(dateVal).toLowerCase().includes('rate')) {
              continue;
            }

            if (hasJob || headers.some(h => h.includes('proposal'))) {
              const replyVal = String(rowObj['reply'] || '').toLowerCase();
              const interviewVal = String(rowObj['interview'] || '').toLowerCase();
              const wonVal = String(rowObj['won'] || '').toLowerCase();

              newProposals.push({
                date: String(dateVal).trim(),
                job: String(rowObj['job'] || row[1] || 'Freelance Opportunity').trim(),
                url: String(rowObj['url'] || row[2] || '').trim(),
                proposal: true,
                reply: replyVal === 'true' || replyVal === '1' || replyVal === 'yes',
                interview: interviewVal === 'true' || interviewVal === '1' || interviewVal === 'yes',
                won: wonVal === 'true' || wonVal === '1' || wonVal === 'yes',
              });
            } else if (hasCallType || headers.some(h => h.includes('name'))) {
              newCalls.push({
                date: String(dateVal).trim(),
                name: String(rowObj['name'] || row[1] || 'Lead').trim(),
                callType: String(rowObj['call type'] || rowObj['call'] || row[2] || '').trim(),
                outcome: String(rowObj['outcome'] || row[3] || '').trim(),
                whatWentWell: String(rowObj['what went well | comment'] || rowObj['what went well'] || row[4] || '').trim(),
                areasForImprovement: String(rowObj['areas for improvement'] || row[5] || '').trim(),
                objections: String(rowObj['objections'] || row[6] || '').trim(),
              });
            }
          }
        });
      }

      if (newProposals.length > 0) attackDataState.proposals = newProposals;
      if (newCalls.length > 0) attackDataState.calls = newCalls;

      attackFilePill.classList.remove('hidden');
      attackFilePill.textContent = \`Loaded: \${fileNames.join(', ')}\`;
      refreshAttackStateUI();
    }

    attackDropzone.addEventListener('click', () => attackFileInput.click());
    attackDropzone.addEventListener('dragover', (e) => { e.preventDefault(); attackDropzone.classList.add('dropzone-active'); });
    attackDropzone.addEventListener('dragleave', () => attackDropzone.classList.remove('dropzone-active'));
    attackDropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      attackDropzone.classList.remove('dropzone-active');
      if (e.dataTransfer?.files?.length) {
        await processAttackFiles(e.dataTransfer.files);
      }
    });

    attackFileInput.addEventListener('change', async () => {
      if (attackFileInput.files?.length) {
        await processAttackFiles(attackFileInput.files);
      }
    });

    // Run 30-Day Attack Evaluation
    evaluateAttackBtn.addEventListener('click', async () => {
      if (attackDataState.proposals.length === 0 && attackDataState.calls.length === 0) {
        alert('Please drop your tracking files or click "⚡ Load Datalumina Attack Sample" first.');
        return;
      }

      attackErrorBanner.classList.add('hidden');
      if (attackErrorUnlockBtn) attackErrorUnlockBtn.classList.add('hidden');
      attackResultsSection.classList.add('hidden');

      const storedPass = getStoredPasscode().trim();
      if (!storedPass) {
        passcodeInput.value = '';
        passcodeModal.classList.remove('hidden');
        attackErrorBanner.classList.remove('hidden');
        attackErrorMessage.textContent = 'The 30-Day Attack Evaluator is reserved for Datalumina course students. Please enter your VIP passcode to unlock.';
        if (attackErrorUnlockBtn) attackErrorUnlockBtn.classList.remove('hidden');
        return;
      }

      evaluateAttackBtn.disabled = true;
      evaluateAttackSpinner.classList.remove('hidden');
      evaluateAttackBtnText.textContent = 'Analyzing 30-Day Attack with Jev AI...';

      const startTime = performance.now();

      try {
        const payload = {
          proposals: attackDataState.proposals,
          calls: attackDataState.calls,
          windowOverride: (customStartDateInput.value && customEndDateInput.value) ? {
            startDate: customStartDateInput.value,
            endDate: customEndDateInput.value
          } : undefined
        };

        const res = await fetch('/30-day-attack', {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          const errText = errData?.error || \`HTTP \${res.status}\`;
          if (res.status === 403 || errData?.vipRequired) {
            if (attackErrorUnlockBtn) attackErrorUnlockBtn.classList.remove('hidden');
          }
          throw new Error(errText);
        }

        const data = await res.json();
        const latencyMs = Math.round(performance.now() - startTime);

        attackDataState.lastResult = data;
        renderAttackResults(data, latencyMs);
        await updateCreditBadge();
      } catch (err) {
        attackErrorBanner.classList.remove('hidden');
        attackErrorMessage.textContent = err.message;
      } finally {
        evaluateAttackBtn.disabled = false;
        evaluateAttackSpinner.classList.add('hidden');
        evaluateAttackBtnText.textContent = '🚀 Evaluate 30-Day Attack Performance';
      }
    });

    // Render 30-Day Attack Results
    function renderAttackResults(data, latencyMs) {
      const windowInfo = data.window || {};
      const m = data.deterministicMetrics || {};
      const jev = data.jevEvaluation || {};
      const payload = (jev && jev.result) ? jev.result : jev;
      const answers = payload.answers || {};

      // 1. Guarantee Verdict
      const verdict = answers.on_track_for_guarantee;
      const guaranteeBadge = document.getElementById('attack-guarantee-badge');
      const guaranteeConf = document.getElementById('attack-guarantee-confidence');
      
      let isOnTrack = false;
      let confPercent = null;

      if (verdict) {
        if (typeof verdict.noul === 'number') {
          isOnTrack = verdict.noul >= 0.5;
          confPercent = Math.round((isOnTrack ? verdict.noul : (1 - verdict.noul)) * 100);
        } else if (typeof verdict.answer === 'boolean') {
          isOnTrack = verdict.answer;
          if (typeof verdict.confidence === 'number') confPercent = Math.round(verdict.confidence * 100);
        }
      }

      if (isOnTrack) {
        guaranteeBadge.textContent = '🚀 ON TRACK FOR 30-DAY GUARANTEE';
        guaranteeBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-emerald-950/80 border border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/30';
      } else {
        guaranteeBadge.textContent = '⚠️ AT RISK — INTERVENTION REQUIRED';
        guaranteeBadge.className = 'px-4 py-1.5 rounded-xl font-bold text-sm tracking-wide bg-amber-950/80 border border-amber-500 text-amber-300 shadow-lg shadow-amber-900/30';
      }

      guaranteeConf.textContent = confPercent !== null ? \`\${confPercent}% model confidence\` : '';
      document.getElementById('attack-res-window').textContent = \`\${windowInfo.startDate || '--'} to \${windowInfo.endDate || '--'}\`;
      document.getElementById('attack-res-activedays').textContent = \`\${m.activeDaysCount || 0} / \${m.totalDaysInWindow || 30} days\`;
      document.getElementById('attack-res-pace').textContent = \`\${m.currentPaceProposalsPerDay || 0} /day\`;

      // 2. Primary Bottleneck
      const bottleneckChoice = answers.primary_bottleneck?.choice || 'outreach_volume_deficit';
      document.getElementById('attack-bottleneck-pill').textContent = attackBottleneckLabels[bottleneckChoice] || bottleneckChoice;
      document.getElementById('attack-bottleneck-desc').textContent = attackBottleneckContext[bottleneckChoice] || 'Sustain daily action density.';

      // 3. Jev Scorecards Helper
      function setScoreCard(key, valId, confId, barId, descId) {
        const item = answers[key];
        const rawScore = typeof item?.score === 'number' ? item.score : 0;
        const hasZeroIndex = item?.legend && item.legend["0"] !== undefined;
        const score5 = (hasZeroIndex || rawScore <= 4) ? (rawScore + 1) : rawScore;
        const displayScore = score5 > 0 ? score5.toFixed(1) : '--';
        const percent = Math.min(100, Math.max(0, (hasZeroIndex || rawScore <= 4 ? (rawScore / 4) : (rawScore / 5)) * 100));

        const conf = item?.confidence ? \`\${Math.round(item.confidence * 100)}% conf\` : '';
        const colors = getScoreColor(score5);

        const valEl = document.getElementById(valId);
        valEl.textContent = displayScore;
        valEl.className = \`text-3xl font-extrabold \${colors.text}\`;

        document.getElementById(confId).textContent = conf;

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

      setScoreCard('pipeline_health', 'score-pipe-val', 'score-pipe-conf', 'bar-pipe', 'desc-pipe');
      setScoreCard('funnel_efficiency', 'score-funnel-val', 'score-funnel-conf', 'bar-funnel', 'desc-funnel');
      setScoreCard('attack_discipline', 'score-disc-val', 'score-disc-conf', 'bar-disc', 'desc-disc');
      setScoreCard('positioning_and_targeting', 'score-pos-val', 'score-pos-conf', 'bar-pos', 'desc-pos');

      // 4. Deterministic Funnel
      document.getElementById('fn-proposals-sent').textContent = m.totalProposalsSent ?? 0;
      const propBadge = document.getElementById('fn-proposals-badge');
      if (m.totalProposalsSent >= 50) {
        propBadge.textContent = '✓ Target met (50-150)';
        propBadge.className = 'text-[11px] font-mono text-emerald-400';
      } else {
        propBadge.textContent = \`⚠ Deficit (- \${50 - (m.totalProposalsSent || 0)} to min target)\`;
        propBadge.className = 'text-[11px] font-mono text-amber-400';
      }

      document.getElementById('fn-replies').textContent = m.totalReplies ?? 0;
      document.getElementById('fn-reply-rate').textContent = \`\${m.replyRate ?? 0}%\`;
      const replyBadge = document.getElementById('fn-reply-badge');
      if (m.replyRate >= 10) {
        replyBadge.textContent = '✓ Within 10-30% Benchmark';
        replyBadge.className = 'text-[11px] font-mono text-emerald-400';
      } else {
        replyBadge.textContent = '⚠ Below 10% Benchmark';
        replyBadge.className = 'text-[11px] font-mono text-amber-400';
      }

      document.getElementById('fn-interviews').textContent = m.totalInterviews ?? 0;
      document.getElementById('fn-interview-rate').textContent = \`\${m.interviewRate ?? 0}%\`;
      const intBadge = document.getElementById('fn-interview-badge');
      if (m.interviewRate >= 10) {
        intBadge.textContent = '✓ Within 10-30% Benchmark';
        intBadge.className = 'text-[11px] font-mono text-emerald-400';
      } else {
        intBadge.textContent = '⚠ Below 10% Benchmark';
        intBadge.className = 'text-[11px] font-mono text-amber-400';
      }

      document.getElementById('fn-won').textContent = m.totalWon ?? 0;
      document.getElementById('fn-win-rate').textContent = \`\${m.overallWinRate ?? 0}%\`;
      const wonBadge = document.getElementById('fn-won-badge');
      if (m.totalWon >= 1) {
        wonBadge.textContent = '✓ Deal Closed';
        wonBadge.className = 'text-[11px] font-mono text-emerald-400';
      } else {
        wonBadge.textContent = 'Target: 20-40% Win Rate';
        wonBadge.className = 'text-[11px] font-mono text-slate-400';
      }

      // CRM Sub-Metrics
      document.getElementById('crm-total-calls').textContent = m.totalCalls ?? 0;
      document.getElementById('crm-intro-calls').textContent = m.introCalls ?? 0;
      document.getElementById('crm-discovery-calls').textContent = m.discoveryCalls ?? 0;
      document.getElementById('crm-proposal-calls').textContent = m.proposalCalls ?? 0;
      document.getElementById('crm-inbound-leads').textContent = m.inboundLeads ?? 0;

      // 5. Weekly Cohort Cards
      const cohortsContainer = document.getElementById('weekly-cohorts-container');
      cohortsContainer.innerHTML = '';
      (m.weeklyCohorts || []).forEach((w, idx) => {
        const card = document.createElement('div');
        card.className = 'bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2';
        card.innerHTML = \`
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-white">\${w.weekLabel}</span>
            <span class="text-[10px] font-mono text-slate-400">\${w.startDate.slice(5)} to \${w.endDate.slice(5)}</span>
          </div>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between"><span class="text-slate-400">Proposals:</span><span class="font-mono text-white font-semibold">\${w.proposalsSent}</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Replies:</span><span class="font-mono text-blue-400 font-semibold">\${w.replies} (\${w.replyRate}%)</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Interviews:</span><span class="font-mono text-indigo-400 font-semibold">\${w.interviews}</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Calls / CRM:</span><span class="font-mono text-amber-400 font-semibold">\${w.callsScheduled}</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Won:</span><span class="font-mono text-emerald-400 font-semibold">\${w.dealsWon}</span></div>
          </div>
        \`;
        cohortsContainer.appendChild(card);
      });

      // 6. Cadence Metrics
      document.getElementById('cadence-active-days').textContent = \`\${m.activeDaysCount || 0} / \${m.totalDaysInWindow || 30} days\`;
      document.getElementById('cadence-dormant-days').textContent = \`\${m.zeroActivityDaysCount || 0} dormant days\`;
      document.getElementById('cadence-density').textContent = \`\${m.averageProposalsPerActiveDay || 0} proposals / active day\`;
      document.getElementById('cadence-projected').textContent = \`\${m.projected30DayProposals || 0} total proposals projected\`;

      // 7. Objections & Sample Roles
      const objectionsList = document.getElementById('objections-list');
      objectionsList.innerHTML = '';
      if (m.topObjections && m.topObjections.length > 0) {
        m.topObjections.forEach(obj => {
          const el = document.createElement('div');
          el.className = 'p-2 rounded-lg bg-slate-950 border border-slate-800 text-rose-300 text-xs font-mono';
          el.textContent = \`\u2022 "\${obj}"\`;
          objectionsList.appendChild(el);
        });
      } else {
        objectionsList.innerHTML = '<div class="text-xs text-slate-500 italic">No pushback or objections recorded in CRM calls.</div>';
      }

      const sampleRolesList = document.getElementById('sample-roles-list');
      sampleRolesList.innerHTML = '';
      if (m.sampleRoles && m.sampleRoles.length > 0) {
        m.sampleRoles.forEach(role => {
          const el = document.createElement('span');
          el.className = 'px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 truncate max-w-xs';
          el.textContent = role;
          sampleRolesList.appendChild(el);
        });
      } else {
        sampleRolesList.innerHTML = '<span class="text-xs text-slate-500 italic">No roles recorded yet.</span>';
      }

      // 8. Coaching Plan
      const coachingContainer = document.getElementById('coaching-plan-container');
      coachingContainer.innerHTML = '';

      const coachingSteps = [
        {
          num: 1,
          title: "Scale Daily Proposal Density to 3-5 Submissions / Day",
          desc: \`Your current velocity is \${m.currentPaceProposalsPerDay} proposals/day, which projects to \${m.projected30DayProposals} across 30 days (target: 50-150). Dedicate a 90-minute daily morning block to submit 3 tailored proposals before checking email.\`
        },
        {
          num: 2,
          title: "Protect Conversion from Reply to Discovery Call",
          desc: \`Your reply rate is \${m.replyRate}% (Datalumina benchmark: 10-30%). When a client replies, respond within 15 minutes with a frictionless 2-option booking link and a specific technical hypothesis about their project.\`
        },
        {
          num: 3,
          title: "Structure Discovery Calls into 40-50% Upfront Paid Pilots",
          desc: \`During discovery calls, avoid general open-ended consulting. Guide them through your productized assessment framework, and require a 40-50% upfront deposit to initiate milestone delivery.\`
        }
      ];

      coachingSteps.forEach(step => {
        const item = document.createElement('div');
        item.className = 'p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3';
        item.innerHTML = \`
          <span class="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">\${step.num}</span>
          <div>
            <h5 class="text-xs font-bold text-white">\${step.title}</h5>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">\${step.desc}</p>
          </div>
        \`;
        coachingContainer.appendChild(item);
      });

      // Raw JSON
      document.getElementById('attack-raw-json').textContent = JSON.stringify(data, null, 2);

      attackResultsSection.classList.remove('hidden');
      attackResultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Export: Copy Markdown Report
    copyAttackReportBtn.addEventListener('click', () => {
      if (!attackDataState.lastResult) return;
      const res = attackDataState.lastResult;
      const win = res.window || {};
      const m = res.deterministicMetrics || {};
      const jev = res.jevEvaluation?.result?.answers || res.jevEvaluation?.answers || {};

      const md = \`# Datalumina 30-Day Freelancer Attack Evaluation Report
**Evaluated Window:** \${win.startDate} to \${win.endDate} (Trailing 30 days to Current Week)
**Active Days:** \${m.activeDaysCount} / \${m.totalDaysInWindow} days | **Dormant Days:** \${m.zeroActivityDaysCount} days
**Guarantee Status:** \${jev.on_track_for_guarantee?.noul >= 0.5 || jev.on_track_for_guarantee?.answer ? "ON TRACK" : "AT RISK / INTERVENTION REQUIRED"}
**Primary Bottleneck:** \${attackBottleneckLabels[jev.primary_bottleneck?.choice] || jev.primary_bottleneck?.choice}

## Funnel Waterfall vs Datalumina Benchmarks
- **Proposals Sent:** \${m.totalProposalsSent} (Target: 50-150 across 30 days)
- **Replies:** \${m.totalReplies} (\${m.replyRate}% | Benchmark: 10% - 30%)
- **Interviews:** \${m.totalInterviews} (\${m.interviewRate}% | Benchmark: 10% - 30%)
- **Closed Deals Won:** \${m.totalWon} (\${m.overallWinRate}% | Benchmark: 20% - 40%)

## CRM & Call Pipeline
- Total Calls: \${m.totalCalls} | Intro: \${m.introCalls} | Discovery: \${m.discoveryCalls} | Proposal: \${m.proposalCalls}
- Inbound Leads: \${m.inboundLeads}

## Qualitative Dimension Scores (Jev AI)
- Pipeline Health: \${jev.pipeline_health?.score !== undefined ? (jev.pipeline_health.score + 1) : "--"}/5
- Funnel Conversion Efficiency: \${jev.funnel_efficiency?.score !== undefined ? (jev.funnel_efficiency.score + 1) : "--"}/5
- Attack Discipline & Cadence: \${jev.attack_discipline?.score !== undefined ? (jev.attack_discipline.score + 1) : "--"}/5
- Positioning & Role Fit: \${jev.positioning_and_targeting?.score !== undefined ? (jev.positioning_and_targeting.score + 1) : "--"}/5

## Weekly Cohort Progression
\${(m.weeklyCohorts || []).map(w => \`- \${w.weekLabel} (\${w.startDate} - \${w.endDate}): \${w.proposalsSent} sent, \${w.replies} replies (\${w.replyRate}%), \${w.interviews} interviews, \${w.callsScheduled} calls, \${w.dealsWon} won\`).join('\\n')}

## Next Best Actions
1. Target 3-5 daily proposal submissions during the active morning sprint.
2. Respond to client replies within 15 minutes with direct scheduling links.
3. Structure discovery calls around productized scoping and a 40-50% upfront deposit.
\`;

      navigator.clipboard.writeText(md).then(() => {
        copyAttackReportBtn.textContent = '✓ Copied Markdown Report!';
        setTimeout(() => {
          copyAttackReportBtn.textContent = '📋 Copy Markdown Report';
        }, 2500);
      });
    });

    // Export: Download JSON
    downloadAttackJsonBtn.addEventListener('click', () => {
      if (!attackDataState.lastResult) return;
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(attackDataState.lastResult, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'datalumina-30day-attack-evaluation.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  </script>
</body>
</html>`;
}
