'use client';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      <NavBar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="px-6 md:px-10 lg:px-16 py-24 md:py-28 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <p className="text-sm uppercase tracking-widest text-[var(--text-muted)]">
            Hello, I&apos;m
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold gradient-text">
            Gal Halifa
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl">
            Software Engineering student at Ben-Gurion University, experienced in Java, Python,
            and SQL. Skilled in object-oriented programming, data management, and full-stack
            development. Passionate about building scalable systems and writing clean, efficient
            code.
          </p>
        </motion.div>
      </motion.section>

      {/* Open to Opportunities */}
      <motion.section
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        className="px-6 md:px-10 lg:px-16 pb-24 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="glass-card p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-purple-400 bg-clip-text text-transparent mb-6">
                Open to Opportunities
              </h2>
              <p className="text-[var(--text-secondary)] max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                I’m seeking <span className="text-[var(--accent-primary)] font-medium">
                  student or entry-level software engineering roles
                </span>{' '}
                where I can contribute to building reliable and efficient systems.
                Experienced in <span className="font-medium text-white">Java, Python, and SQL</span>,
                with a strong foundation in object-oriented design, database management, and backend development.
              </p>
              <p className="mt-3 text-sm text-[var(--text-muted)] italic">
                Focused on writing clean, maintainable code and learning advanced software architecture.
              </p>

              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid md:grid-cols-4 gap-6 mt-10"
              >
                {[
                  {
                    title: 'Backend Development',
                    desc: 'Building structured and scalable backend systems using Java, Python, and SQL.',
                  },
                  {
                    title: 'Software Design',
                    desc: 'Applying OOP principles and design patterns to create maintainable, high-quality solutions.',
                  },
                  {
                    title: 'Project Development',
                    desc: 'Experience in developing full projects — from design and databases to implementation and testing.',
                  },
                  {
                    title: 'Problem Solving',
                    desc: 'Strong analytical thinking and algorithmic problem-solving skills, focused on performance and clarity.',
                  },
                ].map((skill, i) => (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }}
                    className="group"
                  >
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">{skill.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{skill.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
                className="mt-10"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-primary)] to-blue-500 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-2xl hover:shadow-[var(--accent-primary)]/25 transition-all duration-300 group"
                >
                  <span>Let&apos;s Connect</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
        id="projects"
        className="px-6 md:px-10 lg:px-16 pb-24 relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] underline transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter((p) => p.featured).slice(0, 2).map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + i * 0.2 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <footer className="px-6 md:px-10 lg:px-16 pb-12 text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} Gal Halifa
      </footer>
    </main>
  );
}
