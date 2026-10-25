import { ArrowUpRight, Clock, Download, Mail, MapPin, Send } from 'lucide-react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { profile } from '@/data/profile';

const channels = [
  {
    label: 'Email Me',
    value: profile.email,
    href: `mailto:${profile.email}`,
    action: 'Send a mail',
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: profile.name,
    href: profile.linkedin,
    action: 'Connect',
    Icon: LinkedInIcon,
  },
  {
    label: 'GitHub',
    value: profile.githubHandle,
    href: profile.github,
    action: 'Follow',
    Icon: GitHubIcon,
  },
];

export default function Contact({ as }: { as?: 'h1' | 'h2' }) {
  return (
    <Section
      id="contact"
      eyebrow="contact"
      title="Let's Connect"
      subtitle="I'm always open to new opportunities, collaborations, and tech discussions. Reach out anytime!"
      as={as}
    >
      <div className="grid lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
        <div className="space-y-3">
          {channels.map(({ label, value, href, action, Icon }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card card-interactive rounded-2xl p-4 flex items-center gap-4 group"
              >
                <span className="icon-tile w-11 h-11 rounded-xl">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-fg">{label}</p>
                  <p className="text-sm text-muted truncate">{value}</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-accent">
                  {action}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="h-full">
          <div className="card h-full p-6 md:p-7 flex flex-col">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-[11px] text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Open to conversations
            </div>
            <h3 className="mt-4 text-xl font-semibold text-fg">Let&apos;s build something</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              I build <span className="text-fg font-medium">production backend services</span>,{' '}
              <span className="text-fg font-medium">RAG pipelines</span>, and full-stack applications with{' '}
              <span className="text-fg font-medium">Python, Java, and Spring Boot</span>, deployed to the cloud.
              Whether it&apos;s an opportunity, a collaboration, or a tech discussion — I&apos;d love to hear from you.
            </p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <dt className="sr-only">Location</dt>
                <dd className="text-fg">
                  {profile.location} <span className="text-muted">({profile.timezone})</span>
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <dt className="sr-only">Availability</dt>
                <dd className="text-fg">
                  {profile.availability} <span className="text-muted">(local time)</span>
                </dd>
              </div>
            </dl>

            <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary flex-1">
                <Send className="w-4 h-4" />
                Send a Message
              </a>
              <a href={profile.resumePdf} download className="btn btn-ghost flex-1">
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
