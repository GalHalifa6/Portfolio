import NavBar from '@/components/NavBar';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />

      <div className="relative flex-grow">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-[length:60px_60px] bg-[position:0_0,30px_30px] bg-repeat"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 2px, transparent 2px)
              `,
            }}
          ></div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 lg:px-16 py-24 md:py-28 relative">
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-sm uppercase tracking-widest text-[var(--text-muted)]">
              Hello, I&apos;m
            </p>
            <h1 className="mt-2 text-4xl md:text-6xl font-bold gradient-text">
              Gal Halifa
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl">
              Software Engineering student at Ben-Gurion University, experienced in Java, Python, C++, C, C#
              and SQL. Skilled in object-oriented programming, data management, and full-stack
              development. Passionate about building scalable systems and writing clean, efficient
              code.
            </p>
          </div>
        </section>

        {/* Open to Opportunities */}
        <section className="px-6 md:px-10 lg:px-16 pb-24 relative">
          <div className="max-w-6xl mx-auto">
            <div className="glass-card p-8 md:p-12 relative overflow-hidden">
              {/* Background animation */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent"></div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-purple-400 bg-clip-text text-transparent">
                    Open to Opportunities
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent"></div>
                </div>

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

                {/* Skills grid */}
                <div className="grid md:grid-cols-4 gap-6 mt-10">
                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Backend Development</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Building structured and scalable backend systems using Java, Python, and SQL.
                    </p>
                  </div>

                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-green-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Software Design</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Applying OOP principles and design patterns to create maintainable, high-quality solutions.
                    </p>
                  </div>

                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Project Development</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Experience in developing full projects — from design and databases to implementation and testing.
                    </p>
                  </div>

                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Problem Solving</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Strong analytical thinking and algorithmic problem-solving skills, focused on performance and clarity.
                    </p>
                  </div>
                </div>

                <div className="mt-10">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="px-6 md:px-10 lg:px-16 pb-24 relative">
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
              {projects
                .filter((p) => p.featured)
                .slice(0, 2)
                .map((p) => (
                  <ProjectCard key={p.title} project={p} />
                ))}
            </div>
          </div>
        </section>

        <footer className="px-6 md:px-10 lg:px-16 pb-12 text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} Gal Halifa
        </footer>
      </div>
    </main>
  );
}
