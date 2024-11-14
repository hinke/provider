"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  lastSciScore: number;
  weekNumber: number;
  totalWeeks: number;
  status: 'improving' | 'declining' | 'stable';
  lastUpdate: string;
}

// Mock data - replace with actual API call
const patients: Patient[] = [
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

const getStatusColor = (status: Patient['status']) => {
  switch (status) {
    case 'improving':
      return 'bg-green-100 text-green-800';
    case 'declining':
      return 'bg-red-100 text-red-800';
    case 'stable':
      return 'bg-blue-100 text-blue-800';
  }
};

const calculateAge = (dateOfBirth: string) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export default function PatientList() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <p className="text-gray-500">Overview of all patients and their sleep progress</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <Link 
                href={`/patient/${patient.id}`} 
                key={patient.id}
                className="block"
              >
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      <div className="text-sm text-gray-500 space-x-4">
                        <span>ID: {patient.id}</span>
                        <span>Age: {calculateAge(patient.dateOfBirth)}</span>
                        <span>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">SCI Score: {patient.lastSciScore}</div>
                        <div className="text-xs text-gray-500">
                          Week {patient.weekNumber} of {patient.totalWeeks}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last updated: {new Date(patient.lastUpdate).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
