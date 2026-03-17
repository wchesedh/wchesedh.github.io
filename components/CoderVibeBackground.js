"use client"

import { useMemo } from 'react'

const CODE_COLUMNS = [
  [
    "shipIt('pls') // ✨",
    "git commit -m \"fix: the fix that fixed the fix\"",
    "console.log('works on my machine ✅')",
    "if (coffee === 0) throw new Error('compile requires caffeine')",
    "SELECT * FROM bugs WHERE status = 'its fine' ORDER BY panic DESC;",
    "const mood = Math.random() > 0.5 ? 'ship' : 'refactor' ",
    "docker compose up -d && echo \"summoning containers…\"",
    "TODO: remove TODOs (tomorrow)",
  ],
  [
    "npm run dev // turbo mode (maybe)",
    "pnpm i && pnpm build && pnpm pray",
    "try { deploy() } catch (e) { rollback(); blameCache() }",
    "const latency = p95(ms) // if you squint it's fast",
    "cache.set(key, value, { ttl: 60, vibes: 'immaculate' })",
    "assert(ux.isSmooth(), 'pls be smooth')",
    "FeatureFlag.enable('funnyEasterEgg')",
    "⚡ hot reload engaged",
  ],
  [
    "curl -X POST /api/login -H \"Authorization: Bearer <token>\"",
    "HTTP 200 OK (suspiciously fast)",
    "type Project = { name: string; url: string; shipped: true }",
    "router.get('/health', () => 'green')",
    "merge(main, featureBranch) // may the conflicts be gentle",
    "refactor(): rename thing -> betterThing (no regrets)",
    "ai.suggest('add tests') && dev.says('later')",
    "/* 🐛 */ // not a bug, a feature with confidence",
  ],
]

function pickPrefix(line, i) {
  const prefixes = ['$', '>', 'λ', '›', '']
  // deterministic-ish variety (no runtime randomness needed)
  return prefixes[(line.length + i) % prefixes.length]
}

export default function CoderVibeBackground() {
  const columns = useMemo(() => CODE_COLUMNS, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Base: soft grid + glow */}
      <div className="absolute inset-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.55),transparent_45%),radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.45),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.30),transparent_55%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(59,130,246,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.35)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* Terminal/code layer */}
      <div className="absolute inset-0 opacity-[0.20] mix-blend-multiply">
        <div className="absolute -inset-x-24 -inset-y-24 rotate-[-8deg] blur-[0.2px]">
          <div className="grid grid-cols-3 gap-10 px-24 py-24 font-mono text-[12px] leading-6 text-slate-900">
            {columns.map((col, colIndex) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={colIndex}
                className={`coderCol coderCol${colIndex % 3}`}
              >
                {Array.from({ length: 16 }).map((_, blockIdx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={blockIdx} className="mb-6">
                    {col.map((line) => (
                      <div key={`${blockIdx}-${line}`} className="whitespace-nowrap">
                        <span className="text-slate-500">{pickPrefix(line, blockIdx)}</span>{" "}
                        <span className="opacity-90">{line}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.25)_35%,rgba(255,255,255,0.75)_70%,rgba(255,255,255,0.92)_100%)]" />

      <style jsx>{`
        .coderCol {
          animation: coderScroll 32s linear infinite;
          will-change: transform;
        }
        .coderCol1 {
          animation-duration: 38s;
        }
        .coderCol2 {
          animation-duration: 44s;
        }
        @keyframes coderScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-45%);
          }
        }
      `}</style>
    </div>
  )
}

