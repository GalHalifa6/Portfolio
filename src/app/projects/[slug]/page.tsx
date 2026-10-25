import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { guides } from '@/data/guides';
import { GitHubIcon } from '@/components/BrandIcons';
import ProjectGuide from '@/components/ProjectGuide';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(x => x.id === slug);
  return p ? { title: `${p.title} — Gal Halifa`, description: p.description } : {};
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find(x => x.id === slug);
  if (!p) return notFound();
  const guide = guides[p.id];
  const repos = p.repos ?? [{ label: 'GitHub', url: p.repo }];

  return (
    <section className="px-4 sm:px-6 pt-28 md:pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All projects
        </Link>

        <p className="mt-8 font-mono text-xs text-accent mb-3">{`// project${p.year ? ` · ${p.year}` : ''}`}</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg">{p.title}</h1>
        <p className="mt-4 text-muted leading-relaxed">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tech.map(t => <li key={t} className="chip">{t}</li>)}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {repos.map(r => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost py-2">
              <GitHubIcon className="w-4 h-4" />
              {r.label}
            </a>
          ))}
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary py-2">
              Live site
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost py-2">
              Try demo
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {p.image && (
          <div className="mt-8 overflow-hidden card">
            <Image src={p.image} alt={`${p.title} preview`} width={1200} height={750} className="w-full h-auto" priority />
          </div>
        )}

        {guide && <ProjectGuide guide={guide} />}
      </div>
    </section>
  );
}
