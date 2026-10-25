import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

export default function Hero() {
  const stats = [
    { value: `${projects.length}`, label: 'Projects built' },
    { value: '150', label: 'Bubble.up beta users' },
    { value: `${new Date().getFullYear() - profile.codingSince}+`, label: 'Years coding' },
    { value: 'B.Sc.', label: 'Software Engineering' },
  ];

  return (
    <section className="relative px-4 sm:px-6 pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-fg/5 px-3.5 py-1.5 font-mono text-[11px] sm:text-xs text-muted">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-success" />
          </span>
          {profile.role} @ <span className="text-fg">{profile.company}</span>
        </div>

        <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1.05] text-fg">
          Hi, I&apos;m {profile.name}.
        </h1>

        <p className="mt-5 text-lg md:text-xl text-muted">
          Backend <span className="text-subtle">·</span> Full-Stack{' '}
          <span className="text-subtle">·</span> AI &amp; RAG Systems
        </p>

        <p className="mt-6 text-base md:text-lg text-muted/90 max-w-2xl mx-auto leading-relaxed">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link href="/#projects" className="btn btn-ghost">
            Explore Projects
          </Link>
          <a href={profile.resumePdf} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FileText className="w-4 h-4" />
            View Resume
          </a>
          <a href={profile.resumePdf} download className="btn btn-primary">
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <dt className="order-2 mt-1 text-[11px] uppercase tracking-[0.14em] text-subtle">{s.label}</dt>
              <dd className="order-1 text-2xl md:text-3xl font-semibold text-accent">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
