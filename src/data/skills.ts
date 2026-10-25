export type SkillGroup = {
  title: string;
  icon: 'code' | 'server' | 'brain' | 'layout' | 'cloud' | 'layers';
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    icon: 'code',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C', 'C#', 'SQL'],
  },
  {
    title: 'Backend',
    icon: 'server',
    items: ['Spring Boot', 'FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'Hibernate / JPA', 'Redis', 'Celery'],
  },
  {
    title: 'AI & LLMs',
    icon: 'brain',
    items: ['LLMs', 'RAG', 'LangChain', 'Qdrant', 'Stanford NLP', 'YOLO', 'OpenCV', 'OCR (PaddleOCR, Tesseract)'],
  },
  {
    title: 'Frontend & Data',
    icon: 'layout',
    items: ['React', 'Vaadin', 'i18n / RTL', 'PostgreSQL', 'SQLite'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['AWS EC2', 'AWS S3', 'AWS SQS', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Git'],
  },
  {
    title: 'Engineering Practices',
    icon: 'layers',
    items: [
      'OOP',
      'System Design',
      'Distributed Systems',
      'Multithreading',
      'Data Structures',
      'Algorithms',
      'Unit Testing',
      'Integration Testing',
      'JUnit',
      'Mockito',
      'PyTest',
    ],
  },
];
