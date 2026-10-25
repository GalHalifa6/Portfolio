import Projects from '@/components/sections/Projects';

export default function ProjectsPage() {
  return (
    <div className="pt-8">
      <Projects defaultFilter="all" as="h1" />
    </div>
  );
}
