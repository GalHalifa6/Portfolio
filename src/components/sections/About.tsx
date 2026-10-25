'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Server,
  Brain,
  Workflow,
  Cloud,
  Handshake,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  ChevronRight,
} from 'lucide-react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { profile } from '@/data/profile';

const strengths = [
  {
    Icon: Server,
    title: 'Production Backend',
    text: 'Develop and deploy production backend services powering AI-driven WhatsApp and voice agents.',
  },
  {
    Icon: Brain,
    title: 'AI & RAG Systems',
    text: 'Design RAG pipelines with LangChain and Qdrant, using metadata-based filtering for context-aware retrieval.',
  },
  {
    Icon: Workflow,
    title: 'End-to-End Ownership',
    text: 'Own features from requirements gathering and system architecture through implementation, testing, and production deployment.',
  },
  {
    Icon: Cloud,
    title: 'Cloud & CI/CD',
    text: 'Ship to AWS (EC2, S3, SQS) with Docker and GitHub Actions pipelines — from distributed workers to full-stack apps.',
  },
  {
    Icon: Handshake,
    title: 'Client-Facing Engineer',
    text: 'Work directly with enterprise clients to understand business needs, define technical requirements, and deliver tailored solutions.',
  },
];

const facts = [
  { Icon: MapPin, label: 'Based in', value: profile.location },
  { Icon: Briefcase, label: 'Currently', value: `${profile.role} @ ${profile.company}` },
  { Icon: GraduationCap, label: 'Education', value: 'Ben-Gurion University' },
  { Icon: Languages, label: 'Languages', value: `${profile.spokenLanguages} (fluent)` },
];

function Terminal() {
  const lines: [string, string][] = [
    ['whoami', profile.name],
    ['cat role.txt', `${profile.role} @ ${profile.company}`],
    ['ls stack/', 'python  java  spring-boot  langchain  qdrant  aws'],
    ['cat focus.txt', 'backend services · RAG pipelines · cloud deployment'],
    ['echo $STATUS', 'shipping AI agents to production ✓'],
  ];

  return (
    <div className="card overflow-hidden shadow-[0_30px_80px_-40px_var(--accent-strong)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-subtle">gal@portfolio: ~</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed space-y-3">
        {lines.map(([cmd, out]) => (
          <div key={cmd}>
            <p>
              <span className="text-success">➜</span> <span className="text-accent">~</span>{' '}
              <span className="text-fg">{cmd}</span>
            </p>
            <p className="text-muted break-words">{out}</p>
          </div>
        ))}
        <p>
          <span className="text-success">➜</span> <span className="text-accent">~</span>{' '}
          <span className="inline-block w-2 h-4 align-middle bg-fg/80 animate-blink" />
        </p>
      </div>
    </div>
  );
}

export default function About({ as }: { as?: 'h1' | 'h2' }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <Section id="about" eyebrow="about" title="About Me" as={as}>
      <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <Terminal />
        </Reveal>

        <div>
          <Reveal>
            <h3 className="text-2xl md:text-[28px] leading-snug font-semibold tracking-tight text-fg">
              Hi, I&apos;m Gal — a software engineer building production backends and AI-powered systems.
            </h3>
          </Reveal>

          <div className="mt-6 space-y-3">
            {strengths.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="card card-interactive rounded-2xl p-4 flex gap-4">
                  <span className="icon-tile w-9 h-9">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-medium text-fg">{title}</p>
                    <p className="mt-1 text-sm text-muted leading-relaxed">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-5">
            <button
              onClick={() => setShowMore((v) => !v)}
              aria-expanded={showMore}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${showMore ? 'rotate-90' : ''}`} />
              {showMore ? 'Show less' : 'Read more about my background'}
            </button>
            <AnimatePresence initial={false}>
              {showMore && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pl-4 border-l-2 border-accent/30 space-y-3 text-muted leading-relaxed">
                    <p>
                      Today I&apos;m a Software Engineer at {profile.company}, where I build production backend services and RAG pipelines (LangChain, Qdrant) that power AI-driven WhatsApp and voice agents, integrate CRM platforms and third-party APIs, and work directly with enterprise clients to turn business needs into shipped features.
                    </p>
                    <p>
                      I hold a B.Sc. in Software Engineering from Ben-Gurion University (GPA: 84). Along the way I built Bubble.up — a collaborative student platform launched to 150 beta users — a distributed text-processing system on AWS (EC2, SQS, S3), an Amazon-like e-commerce marketplace with Vaadin, Hibernate, and AWS deployment, a multi-threaded Set card game, a Python client-server trivia game over TCP/UDP, and a C# Kanban board with WPF and SQLite.
                    </p>
                    <p>
                      My background also includes experience as a scheduling and operations supervisor leading automation initiatives, teaching and mentoring roles in programming and computer science, and volunteer military service as a fitness instructor. These experiences strengthened my ability to break down complex concepts, collaborate effectively, and deliver in dynamic environments.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-16 pt-10 border-t border-dashed border-line-strong">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {facts.map(({ Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <Icon className="w-4 h-4 text-accent" />
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">{label}</dt>
              <dd className="mt-1 text-sm font-medium text-fg">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
