'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

type Filter = 'featured' | 'all';

export default function Projects({
  defaultFilter = 'featured',
  as,
}: {
  defaultFilter?: Filter;
  as?: 'h1' | 'h2';
}) {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const visible = filter === 'featured' ? projects.filter((p) => p.featured) : projects;

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'featured', label: 'Featured', count: projects.filter((p) => p.featured).length },
    { id: 'all', label: 'All', count: projects.length },
  ];

  return (
    <Section
      id="projects"
      eyebrow="projects"
      title="Projects"
      subtitle="A collection of projects showcasing my journey in software development — from full-stack platforms and distributed cloud systems to games and algorithms."
      as={as}
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-muted">
          {visible.length} project{visible.length === 1 ? '' : 's'}
        </p>
        <div role="tablist" className="inline-flex p-1 rounded-xl border border-line bg-fg/[0.03]">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={filter === t.id}
              onClick={() => setFilter(t.id)}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                filter === t.id ? 'bg-fg/10 text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {t.label}
              <span className="ml-1.5 text-subtle">{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
