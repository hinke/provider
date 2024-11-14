"use client";

import React, { useState, useEffect, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Calendar, Brain, Battery, Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Import the Patient interface and mock data from the main page
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

// Mock data - should be moved to a shared location or API service
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

const getPatientData = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
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

export default function PatientDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: patientId } = use(params);
  const patientData = getPatientData(patientId);
  const [notes, setNotes] = useState('');
  
  if (!patientData) {
    return <div className="p-6">Patient not found</div>;
  }

  const notesStorageKey = `patientNotes-${patientId}`;

  useEffect(() => {
    const savedNotes = localStorage.getItem(notesStorageKey);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [notesStorageKey]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(notesStorageKey, newNotes);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <Link 
        href="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Patient List
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{patientData.name}</h1>
          <div className="text-gray-500 space-x-4">
            <span>ID: {patientData.id}</span>
            <span>Age: {calculateAge(patientData.dateOfBirth)}</span>
            <span>DOB: {new Date(patientData.dateOfBirth).toLocaleDateString()}</span>
            <span>Program Start: {new Date(patientData.lastUpdate).toLocaleDateString()}</span>
          </div>
        </div>
        <Badge className={`${getStatusColor(patientData.status)} hover:${getStatusColor(patientData.status)}`}>
          Week {patientData.weekNumber} of {patientData.totalWeeks}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sleep Progress</CardTitle>
          <CardDescription>Current SCI Score: {patientData.lastSciScore}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add your charts and other visualizations here */}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
          <CardDescription>Add your observations and treatment notes here</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            className="w-full min-h-[200px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your clinical notes here..."
          />
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function for status colors
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