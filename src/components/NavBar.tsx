'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // מאזין לגלילה כדי לשנות את השקיפות והצל
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 border-cyan-400/20 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]'
          : 'bg-transparent border-transparent backdrop-blur-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-white text-lg hover:text-cyan-300 transition-all"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Gal Halifa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {['Projects', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-gray-300 hover:text-cyan-300 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {/* Resume Dropdown */}
          <div className="relative group">
            <button className="text-gray-300 hover:text-cyan-300 transition-colors focus:outline-none">
              Resume ▾
            </button>
            <div className="absolute left-0 mt-2 w-44 bg-black/80 border border-cyan-400/20 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md">
              <a
                href="/resume.pdf"
                download
                className="block px-4 py-2 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
              >
                Download PDF
              </a>
              <a
                href="/resume.docx"
                download
                className="block px-4 py-2 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
              >
                Download DOCX
              </a>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black/80 border-t border-white/10 backdrop-blur-lg p-6 space-y-4">
          {['Projects', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-cyan-300 transition-colors text-lg"
            >
              {item}
            </Link>
          ))}
          <div>
            <button
              className="text-gray-300 hover:text-cyan-300 transition-colors text-lg flex items-center justify-between w-full"
              onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
            >
              Resume ▾
            </button>
            {isResumeDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <a
                  href="/resume.pdf"
                  download
                  className="block px-4 py-2 rounded-lg bg-cyan-500/10 text-gray-300 hover:text-cyan-300"
                >
                  Download PDF
                </a>
                <a
                  href="/resume.docx"
                  download
                  className="block px-4 py-2 rounded-lg bg-cyan-500/10 text-gray-300 hover:text-cyan-300"
                >
                  Download DOCX
                </a>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
