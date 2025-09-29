export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  year?: string;
  image?: string;
  video?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'Trading-System',
    title: 'E-Commerce Trading System',
    description: 'Full-stack e-commerce platform with comprehensive store management, user authentication, payment integration, and supplier systems. Features admin controls, shopping cart functionality, and detailed configuration system.',
    tech: ['JavaScript', 'Java', 'JSON', 'Web Development'],
    repo: 'https://github.com/GalHalifa6/Trading-System',
    year: '2024',
    image: '/images/trading-preview.png',
    video: '/videos/trading-demo.mp4',
    featured: true
  },
  {
    id: 'Set-Game',
    title: 'Set Card Game',
    description: 'Digital implementation of the classic Set card game with intelligent game logic, pattern recognition algorithms, and interactive gameplay mechanics.',
    tech: ['Java', 'Game Development', 'Algorithms'],
    repo: 'https://github.com/GalHalifa6/Set-Game',
    year: '2022',
    image: '/images/set-game-preview.png',
    video: '/videos/Set-Game-demo.mp4',
    featured: true
  },
  {
    id: 'TriviaKing',
    title: 'TriviaKing',
    description: 'A multiplayer online trivia game where you prove your Pokémon knowledge against friends.',
    tech: ['Python'],
    repo: 'https://github.com/GalHalifa6/TriviaKing',
    year: '2023',
    image: '/images/TriviaKing-demo.png',
    video: '/videos/TriviaKing-demo.mp4',
    featured: true
  },
  {
    id: 'Super-Lee',
    title: 'Super-Lee',
    description: 'Automatic system for managing inventory, suppliers, and orders.',
    tech: ['Java'],
    repo: 'https://github.com/GalHalifa6/Super-Lee',
    year: '2023',
    image: '/images/Super-Lee-demo.png',
    video: '/videos/Super-Lee-demo.mp4',
    featured: true
  },
  {
    id: 'Dungeons-and-Dragons',
    title: 'Dungeons & Dragons Game',
    description: 'Text-based RPG implementation of classic D&D mechanics with character management, combat systems, and adventure progression.',
    tech: ['Java', 'Game Development', 'OOP'],
    repo: 'https://github.com/GalHalifa6/Dungeons-and-Dragons',
    year: '2022',
    image: '/images/dnd-preview.png',
    video: '/videos/dnd-demo.mp4',
    featured: true

  },
  {
    id: 'Kanban',
    title: 'Kanban Board System',
    description: 'Project management tool implementing Kanban methodology with task tracking, workflow visualization, and team collaboration features.',
    tech: ['C#', 'Project Management', 'Desktop Development'],
    repo: 'https://github.com/GalHalifa6/Kanban',
    year: '2022',
    image: '/images/kanban-preview.png',
    video: '/videos/kanban-demo.mp4'
  },
  {
    id: 'World-Cup-subscription-service',
    title: 'World-Cup-subscription-service',
    description: 'World Cup Update Subscription Service project simulates a live community-driven system where users can stay updated with real-time game events during the World Cup.',
    tech: ['c++'],
    repo: 'https://github.com/GalHalifa6/World-Cup-subscription-service',
    image: '/images/World-Cup-demo.png',
    year: '2022',
    
  },
  {
    id: 'The-Coalition-Race',
    title: 'The Coalition Race',
    description: 'Strategic racing simulation game with advanced C++ programming concepts, object-oriented design patterns, and optimized performance algorithms.',
    tech: ['C++', 'Game Development', 'OOP'],
    repo: 'https://github.com/GalHalifa6/The-Coalition-Race',
    year: '2022',
    image: '/images/coalition-preview.png'
  },
  {
    id: 'pianoTile-solver',
    title: 'pianoTile-solver',
    description: 'An automatic Piano Tiles solver detects falling tiles in real time and simulates instant clicks to achieve perfect speed and accuracy.',
    tech: ['Python'],
    repo: 'https://github.com/GalHalifa6/pianoTile-solver',
    image: '/images/pianoTile-solver-demo.png',
    video: '/videos/pianoTile-solver-demo.mp4',
    year: '2024',
    
  },
  {
    id: 'Heuristic_Search-Grid-Robot',
    title: 'Heuristic_Search-Grid-Robot',
    description: 'A Python project that implements the A* search algorithm on a grid, with heuristics guiding a robot to reach a target under height constraints.',
    tech: ['Python'],
    repo: 'https://github.com/GalHalifa6/Heuristic_Search-Grid-Robot',
    image: '/images/HeuristicSearch-demo.png',
    year: '2025',
    
  },
  {
    id: 'AlgoTrade-Tesla',
    title: 'AlgoTrade-Tesla',
    description: 'Tesla prediction (Arima, XGboost).',
    tech: ['Python'],
    repo: 'https://github.com/GalHalifa6/AlgoTrade-Tesla',
    image: '/images/algoTrade-demo.png',
    year: '2025',
    
  },
];
