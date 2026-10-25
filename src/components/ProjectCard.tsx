'use client';

import type { Project } from '@/data/projects';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Play, X, Code2, ArrowUpRight, BookOpen } from 'lucide-react';
import { GitHubIcon } from '@/components/BrandIcons';
import { guides } from '@/data/guides';

export default function ProjectCard({ project }: { project: Project }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasGuide = project.id in guides;

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (project.video && video) {
      void video.play().then(() => {
        if (!video.paused) setIsVideoPlaying(true);
      }).catch(() => setIsVideoPlaying(false));
    }
  };

  const handleMouseLeave = () => {
    if (project.video && videoRef.current) {
      setIsVideoPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Close the demo modal with Escape
  useEffect(() => {
    if (!showVideoModal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowVideoModal(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showVideoModal]);

  return (
    <>
      <article
        className="card card-interactive group h-full flex flex-col overflow-hidden hover:-translate-y-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Media Section */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-fg/[0.03]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                isVideoPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="icon-tile w-14 h-14 rounded-2xl">
                <Code2 className="w-6 h-6" />
              </span>
            </div>
          )}

          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}

          {project.year && (
            <span className="absolute top-3 right-3 font-mono text-[11px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-white/80 border border-white/10">
              {project.year}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold leading-snug text-fg">{project.title}</h3>
            {project.featured && <span className="tag shrink-0">Featured</span>}
          </div>
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{project.description}</p>

          {/* Tech Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="font-mono text-[11px] px-2 py-0.5 rounded-md border border-line bg-fg/[0.04] text-muted">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-md text-subtle">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Live links */}
          {(project.live || project.demo || hasGuide) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {hasGuide && (
                <Link
                  href={`/projects/${project.id}#guide`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent hover:bg-accent/20 transition-colors"
                >
                  <BookOpen className="w-3 h-3" />
                  Setup guide
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-2.5 py-1 font-mono text-[11px] text-success hover:bg-success/20 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  Live site
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Explore a fully populated demo — no university email needed"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent hover:bg-accent/20 transition-colors"
                >
                  Try demo
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {project.demo && (
                <span className="text-[11px] text-subtle">no university email needed</span>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-auto pt-5 flex gap-2">
            {project.video && (
              <button onClick={() => setShowVideoModal(true)} className="btn btn-primary flex-1 py-2">
                <Play className="w-3.5 h-3.5 fill-current" />
                Watch Demo
              </button>
            )}
            {project.repos ? (
              project.repos.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} — ${r.label} repository on GitHub`}
                  className="btn btn-ghost flex-1 px-2 py-2"
                >
                  <GitHubIcon className="w-4 h-4" />
                  {r.label}
                </a>
              ))
            ) : (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-ghost py-2 ${project.video ? 'flex-1' : 'w-full'}`}
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </article>

      {/* Modal — portaled so card/section transforms can't trap the fixed overlay */}
      {showVideoModal && project.video && createPortal(
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowVideoModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} demo`}
        >
          <div
            className="card relative max-w-4xl w-full overflow-hidden animate-scaleIn bg-bg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
              <h3 className="font-semibold text-fg">
                {project.title} <span className="text-muted font-normal">— Demo</span>
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                aria-label="Close demo"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-fg hover:bg-fg/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-black">
              <video
                src={project.video}
                className="w-full h-auto max-h-[70vh] object-contain"
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="px-5 py-4 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 6).map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary py-2 shrink-0"
              >
                <GitHubIcon className="w-4 h-4" />
                View Code
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
