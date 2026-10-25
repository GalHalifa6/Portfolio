import { AlertTriangle, ArrowUpRight, Info, Wrench } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import Reveal from '@/components/Reveal';
import { GitHubIcon } from '@/components/BrandIcons';
import type { ProjectGuide as Guide } from '@/data/guides';

// Renders `backtick` segments as inline code.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code
            key={i}
            className={`font-mono text-[0.85em] px-1.5 py-0.5 rounded-md bg-fg/[0.06] border border-line text-fg ${
              part.length <= 26 ? 'whitespace-nowrap' : 'break-all'
            }`}
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function ProjectGuide({ guide }: { guide: Guide }) {
  return (
    <section id="guide" className="scroll-mt-24 mt-16">
      <p className="font-mono text-xs text-accent mb-3">{'// setup guide'}</p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">How to run it</h2>
      <p className="mt-4 text-muted leading-relaxed">
        <Rich text={guide.intro} />
      </p>

      {/* The three moving parts */}
      <div className="mt-8 grid sm:grid-cols-3 gap-3">
        {guide.components.map((c, i) => (
          <Reveal key={c.repo} delay={i * 0.05} className="h-full">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-interactive group h-full rounded-2xl p-4 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-subtle group-hover:text-accent transition-colors" />
              </div>
              <p className="mt-2 font-semibold text-fg">{c.name}</p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
                <GitHubIcon className="w-3 h-3" />
                {c.repo}
              </p>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{c.does}</p>
              <p className="mt-3 pt-3 border-t border-line font-mono text-[11px] text-subtle">runs on: {c.runsOn}</p>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Prerequisites */}
      <div className="mt-8 card rounded-2xl p-5">
        <p className="flex items-center gap-2 font-semibold text-fg">
          <Info className="w-4 h-4 text-accent" />
          Before you start
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
          {guide.prerequisites.map((p) => (
            <li key={p} className="flex gap-2.5">
              <span className="mt-2 w-1 h-1 rounded-full bg-accent/70 shrink-0" />
              <span>
                <Rich text={p} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <ol className="mt-10 relative">
        {guide.steps.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[32px_1fr] gap-x-4 pb-8 last:pb-0">
            <div className="relative flex justify-center">
              {i < guide.steps.length - 1 && (
                <span className="absolute top-8 bottom-[-8px] w-px bg-gradient-to-b from-accent/40 to-line" />
              )}
              <span className="relative w-8 h-8 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <Reveal className="min-w-0 pt-1">
              <h3 className="font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                <Rich text={s.body} />
              </p>
              {s.code && <CodeBlock lang={s.code.lang} content={s.code.content} />}
              {s.note &&
                (s.noteKind === 'tip' ? (
                  <p className="mt-3 flex gap-2 rounded-xl border border-accent/25 bg-accent/[0.07] px-3.5 py-2.5 text-sm text-fg/85">
                    <Info className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                    <span>
                      <Rich text={s.note} />
                    </span>
                  </p>
                ) : (
                  <p className="mt-3 flex gap-2 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] px-3.5 py-2.5 text-sm text-amber-200/90">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
                    <span>
                      <Rich text={s.note} />
                    </span>
                  </p>
                ))}
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Troubleshooting */}
      <div className="mt-12">
        <p className="flex items-center gap-2 font-semibold text-fg">
          <Wrench className="w-4 h-4 text-accent" />
          Troubleshooting
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {guide.troubleshooting.map((t) => (
            <div key={t.problem} className="card rounded-2xl p-4">
              <p className="text-sm font-medium text-fg">{t.problem}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {t.fixes.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-subtle">→</span>
                    <span>
                      <Rich text={f} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
