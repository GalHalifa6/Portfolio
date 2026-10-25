import Reveal from '@/components/Reveal';

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  as: Heading = 'h2',
  className = '',
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  as?: 'h1' | 'h2';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-16 px-4 sm:px-6 py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="font-mono text-xs text-accent tracking-wider mb-3">{`// ${eyebrow}`}</p>
          <Heading className="text-3xl md:text-[40px] md:leading-[1.15] font-semibold tracking-tight text-fg">
            {title}
          </Heading>
          {subtitle && (
            <p className="mt-4 text-muted max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
