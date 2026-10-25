export type TimelineEntry = {
  org: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  badge?: string;
  points: string[];
  tags: string[];
};

export const education: TimelineEntry[] = [
  {
    org: 'Ben-Gurion University of the Negev',
    role: 'B.Sc. Software Engineering',
    start: '2021',
    end: '2025',
    points: [
      'Completed comprehensive studies in software engineering fundamentals, algorithms, data structures, distributed systems, computer vision, AI/ML, and enterprise software development.',
      'Gained hands-on experience through multiple projects — from a distributed AWS text-processing pipeline to a full-stack e-commerce marketplace.',
    ],
    tags: ['Python', 'Java', 'C++', 'SQL', 'Spring Boot', 'AWS', 'Distributed Systems', 'AI / ML'],
  },
];

// Flip to false to hide the Experience section (and its nav link).
export const showExperience = true;

export const experience: TimelineEntry[] = [
  {
    org: 'Elysian Softech',
    role: 'Software Engineer',
    start: 'Feb 2026',
    end: 'Present',
    badge: 'Current',
    points: [
      'Developed and deployed production backend services powering AI-driven WhatsApp and voice agents.',
      'Designed and implemented RAG pipelines using LangChain and Qdrant, with metadata-based filtering for context-aware retrieval.',
      'Integrated CRM platforms and third-party APIs to automate business workflows and connect AI agents with external systems.',
      'Owned major features end-to-end, from requirements gathering and system architecture to implementation, testing, and production deployment.',
      'Collaborated directly with enterprise clients to understand business needs, define technical requirements, and deliver tailored solutions.',
      'Improved system performance and reliability by resolving production issues, optimizing backend processes, and implementing automated tests.',
    ],
    tags: ['RAG', 'LangChain', 'Qdrant', 'LLMs', 'CRM & API Integrations', 'Automated Testing'],
  },
  {
    org: 'Military Service',
    role: 'Military Fitness Instructor',
    start: '2016',
    end: '2018',
    badge: 'Volunteer',
    points: [
      'Volunteered for military service and served as a fitness instructor.',
      'Completed a professional gym instructor course at the Wingate Institute.',
    ],
    tags: ['Leadership', 'Instruction', 'Discipline'],
  },
];
