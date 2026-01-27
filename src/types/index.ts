export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  avatar?: string;
  cohort?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: TechStack[];
  cohort: string;
  owner: User;
  members: User[];
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

export type TechStack = 'React' | 'Python' | 'Flask' | 'Android' | 'Fullstack' | 'TypeScript' | 'Node.js' | 'PostgreSQL' | 'MongoDB';

export interface Cohort {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  studentsCount: number;
  projectsCount: number;
}

export interface FilterOptions {
  cohort: string;
  techStack: TechStack | '';
  search: string;
}
