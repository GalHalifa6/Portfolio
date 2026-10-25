import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import type { TimelineEntry } from '@/data/timeline';

export default function Timeline({
  id,
  eyebrow,
  title,
  entries,
  kind,
}: {
  id: string;
  eyebrow: string;
  title: string;
  entries: TimelineEntry[];
  kind: 'work' | 'education';
}) {
  const Icon = kind === 'work' ? Briefcase : GraduationCap;

  return (
    <Section id={id} eyebrow={eyebrow} title={title}>
      <ol className="relative max-w-4xl mx-auto">
        {entries.map((e, i) => (
          <li key={`${e.org}-${e.role}`} className="relative grid grid-cols-[20px_1fr] md:grid-cols-[120px_20px_1fr] gap-x-4 md:gap-x-5">
            {/* Dates (desktop) */}
            <div className="hidden md:block pt-5 text-right font-mono text-xs">
              <p className="text-accent font-medium">{e.start}</p>
              <p className="text-subtle mt-1">{e.end}</p>
              {e.location && (
                <p className="text-subtle mt-3 inline-flex items-center gap-1 justify-end">
                  <MapPin className="w-3 h-3" />
                  {e.location}
                </p>
              )}
            </div>

            {/* Rail */}
            <div className="relative flex justify-center">
              <span className="absolute inset-y-0 w-px bg-gradient-to-b from-accent/60 to-line" />
              <span className="relative mt-6 w-3 h-3 rounded-full border-2 border-accent bg-bg ring-4 ring-accent/10" />
            </div>

            {/* Card */}
            <Reveal className="pb-6" delay={i * 0.05}>
              <article className="card card-interactive p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <span className="icon-tile w-8 h-8 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-fg">{e.org}</h3>
                      {e.badge && <span className="tag">{e.badge}</span>}
                    </div>
                    <p className="mt-0.5 font-medium text-accent">{e.role}</p>
                    <p className="md:hidden mt-1 font-mono text-xs text-subtle">
                      {e.start} — {e.end}
                      {e.location && ` · ${e.location}`}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-muted leading-relaxed">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent/70 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
