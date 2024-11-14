"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Calendar, Brain, Battery, Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Patient } from '@/types/patient';
import { getPatientData } from '@/data/patients';

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

export default function PatientDashboard() {
  const params = useParams();
  const patientId = params.id as string;
  const patientData = getPatientData(patientId);
  const [notes, setNotes] = useState('');
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

  if (!patientData) {
    return <div className="p-6">Patient not found</div>;
  }

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