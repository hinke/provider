import { Patient } from '@/types/patient';

export const patients: Patient[] = [
  {
    id: 'P-2024-0123',
    name: 'Sarah Johnson',
    dateOfBirth: '1990-03-15',
    lastSciScore: 6.0,
    weekNumber: 5,
    totalWeeks: 6,
    status: 'improving',
    lastUpdate: '2024-02-20'
  },
  {
    id: 'P-2024-0124',
    name: 'Michael Chen',
    dateOfBirth: '1985-07-22',
    lastSciScore: 8.5,
    weekNumber: 3,
    totalWeeks: 6,
    status: 'stable',
    lastUpdate: '2024-02-19'
  },
  {
    id: 'P-2024-0125',
    name: 'Emma Wilson',
    dateOfBirth: '1995-11-30',
    lastSciScore: 9.2,
    weekNumber: 2,
    totalWeeks: 6,
    status: 'declining',
    lastUpdate: '2024-02-21'
  }
];

export const getPatientData = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
}; 