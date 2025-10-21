'use client';

import type { Project } from '@/data/projects';
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function ProjectCard({ project }: { project: Project }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (project.video && videoRef.current && isVideoLoaded) {
      setIsVideoPlaying(true);
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (project.video && videoRef.current) {
      setIsVideoPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoad = () => setIsVideoLoaded(true);

  const openVideoModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.repo, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <article
        className="
          relative overflow-hidden rounded-2xl 
          bg-[#0b0c10]/80 backdrop-blur-xl 
          border border-white/10 
          transition-all duration-500 group
          hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,255,200,0.25)] 
          hover:border-cyan-400/30 cursor-pointer
        "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic neon border flow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-400 blur-lg animate-gradientFlow"></div>
        </div>

        {/* Media Section */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
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
              onLoadedData={handleVideoLoad}
              preload="metadata"
            />
          )}

          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                isVideoPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Play Icon Overlay */}
          {project.video && !isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-cyan-400/30 group-hover:bg-black/70 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-cyan-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Badges */}
          {project.featured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
                Featured
              </span>
            </div>
          )}
          {project.year && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-black/60 backdrop-blur-sm text-cyan-300 text-xs font-medium px-2 py-1 rounded-full border border-cyan-400/30">
                {project.year}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 relative z-10">
          <h3 className="text-lg font-semibold leading-tight text-white group-hover:text-cyan-300 transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 4).map((tech, i) => (
              <span
                key={tech}
                className="text-xs rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 text-cyan-200 shadow-sm hover:border-cyan-400/40 transition-all"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs rounded-full border border-gray-600 bg-gray-800/40 px-2 py-1 text-gray-400 opacity-60">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {project.video && (
              <button
                onClick={openVideoModal}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,255,200,0.3)] hover:shadow-[0_0_25px_rgba(0,255,200,0.5)] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </button>
            )}
            <button
              onClick={handleGitHubClick}
              className={`${project.video ? 'flex-1' : 'w-full'} bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-400/20 hover:border-cyan-400/50`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.09-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 7.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z" />
              </svg>
              {project.video ? 'Code' : 'View Code'}
            </button>
          </div>
        </div>
      </article>

      {/* Modal */}
      {showVideoModal && project.video && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeVideoModal}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0d0d10] border border-cyan-400/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,255,200,0.3)] scale-100 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-800/30 to-purple-800/30 border-b border-cyan-400/20">
              <h3 className="text-lg font-semibold text-cyan-200">
                {project.title} — Demo
              </h3>
              <button
                onClick={closeVideoModal}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-cyan-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative bg-black">
              <video
                ref={modalVideoRef}
                src={project.video}
                className="w-full h-auto max-h-[70vh] object-contain"
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="p-4 bg-[#0d0d10] border-t border-cyan-400/20 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs rounded-full bg-cyan-400/10 px-2 py-1 text-cyan-200 border border-cyan-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,200,0.4)]"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483..." />
                </svg>
                View Code
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
