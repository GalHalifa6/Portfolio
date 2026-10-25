import About from '@/components/sections/About';
import Timeline from '@/components/sections/Timeline';
import Skills from '@/components/sections/Skills';
import { education, experience, showExperience } from '@/data/timeline';

export default function AboutPage() {
  return (
    <div className="pt-8">
      <About as="h1" />
      {showExperience && (
        <Timeline id="experience" eyebrow="experience" title="Experience" entries={experience} kind="work" />
      )}
      <Timeline id="education" eyebrow="education" title="Education" entries={education} kind="education" />
      <Skills />
    </div>
  );
}
