import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Timeline from '@/components/sections/Timeline';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { education, experience, showExperience } from '@/data/timeline';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      {showExperience && (
        <Timeline id="experience" eyebrow="experience" title="Experience" entries={experience} kind="work" />
      )}
      <Timeline id="education" eyebrow="education" title="Education" entries={education} kind="education" />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
