'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Volume2, VolumeX, FileText } from 'lucide-react';
import { useMatrix } from '@/components/MatrixContext';
import { profile } from '@/data/profile';
import { showExperience } from '@/data/timeline';

const links = [
  { label: 'About', href: '/#about' },
  ...(showExperience ? [{ label: 'Experience', href: '/#experience' }] : []),
  { label: 'Education', href: '/#education' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

function MatrixControls() {
  const { matrixMode, isMuted, toggleMatrix, toggleMute } = useMatrix();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMatrix}
        aria-pressed={matrixMode}
        className={`group inline-flex items-center gap-2 h-8 px-3 rounded-lg border font-mono text-xs transition-colors ${
          matrixMode
            ? 'border-accent/50 bg-accent/10 text-accent hover:bg-accent/20'
            : 'border-line bg-fg/5 text-muted hover:text-[#00ff9f] hover:border-[#00ff9f]/40'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-[2px] ${matrixMode ? 'bg-accent' : 'bg-[#00ff9f] animate-pulse'}`}
        />
        {matrixMode ? 'exit' : 'matrix'}
      </button>
      {matrixMode && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}

export default function NavBar() {
  const { matrixMode } = useMatrix();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // מאזין לגלילה כדי לשנות את השקיפות והצל
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = scrolled || isMenuOpen || matrixMode;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${
        solid ? 'bg-[var(--header)] border-line backdrop-blur-xl' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="flex items-center gap-3 text-fg"
        >
          <span className="w-9 h-9 rounded-[10px] border border-line-strong bg-fg/5 flex items-center justify-center font-mono text-sm font-bold">
            {profile.initials}
          </span>
          <span className="hidden sm:inline text-sm font-semibold tracking-tight">{profile.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-muted hover:text-fg hover:bg-fg/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg text-muted hover:text-fg hover:bg-fg/5 transition-colors"
          >
            Resume
          </a>
          <div className="w-px h-5 bg-line mx-2" />
          <MatrixControls />
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <MatrixControls />
          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line bg-fg/5 text-fg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-line px-4 py-4 space-y-1 animate-fadeIn">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-muted hover:text-fg hover:bg-fg/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <a href={profile.resumePdf} download className="btn btn-ghost py-2.5">
              <FileText className="w-4 h-4" /> Resume PDF
            </a>
            <a href={profile.resumeDocx} download className="btn btn-ghost py-2.5">
              <FileText className="w-4 h-4" /> Resume DOCX
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
