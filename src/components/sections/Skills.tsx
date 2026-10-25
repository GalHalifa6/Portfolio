import { Brain, Cloud, Code2, Layers, LayoutTemplate, Server } from 'lucide-react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { skillGroups, type SkillGroup } from '@/data/skills';

const icons: Record<SkillGroup['icon'], typeof Code2> = {
  code: Code2,
  server: Server,
  brain: Brain,
  layout: LayoutTemplate,
  cloud: Cloud,
  layers: Layers,
};

export default function Skills() {
  return (
    <Section id="skills" eyebrow="skills" title="Skills">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="card card-interactive h-full p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="icon-tile w-8 h-8">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="font-semibold text-fg">{group.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
