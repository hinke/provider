export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  lastSciScore: number;
  weekNumber: number;
  totalWeeks: number;
  status: 'improving' | 'declining' | 'stable';
  lastUpdate: string;
} 