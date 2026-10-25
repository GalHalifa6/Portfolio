import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { profile } from '@/data/profile';

const socials = [
  { label: 'GitHub', href: profile.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-accent-strong/[0.07] to-transparent"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[10px] bg-accent-strong text-on-accent flex items-center justify-center font-mono text-sm font-bold">
                {profile.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">{profile.name}</p>
                <p className="text-xs text-muted">{profile.role}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-line bg-fg/5 text-muted hover:text-fg hover:border-line-strong flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent mb-4">Site</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  ['Home', '/'],
                  ['Projects', '/#projects'],
                  ['Skills', '/#skills'],
                  ['Contact', '/#contact'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-muted hover:text-fg transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent mb-4">Resume</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href={profile.resumePdf} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">
                    View PDF
                  </a>
                </li>
                <li>
                  <a href={profile.resumePdf} download className="text-muted hover:text-fg transition-colors">
                    Download PDF
                  </a>
                </li>
                <li>
                  <a href={profile.resumeDocx} download className="text-muted hover:text-fg transition-colors">
                    Download DOCX
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-2 text-xs text-subtle">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono">
            Psst — try the <span className="text-[#00ff9f]">matrix</span> button.
          </p>
        </div>
      </div>
    </footer>
  );
}
