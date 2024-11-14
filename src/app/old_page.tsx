"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Calendar, Brain, Battery, Trophy } from 'lucide-react';

// Enhanced weekly data with daily SCI scores
const weeklyData = [
  {
    week: 'Week 1',
    retention: 100,
    sciScore: 14,
    completed: true,
    level: "Sleep Education",
    dailySCI: [
      { day: 'Mon', score: 14 },
      { day: 'Tue', score: 14 },
      { day: 'Wed', score: 13.5 },
      { day: 'Thu', score: 13.8 },
      { day: 'Fri', score: 13.6 },
      { day: 'Sat', score: 13.4 },
      { day: 'Sun', score: 13.2 }
    ]
  },
  {
    week: 'Week 2',
    retention: 95,
    sciScore: 12,
    completed: true,
    level: "Sleep Restriction",
    dailySCI: [
      { day: 'Mon', score: 13.0 },
      { day: 'Tue', score: 12.8 },
      { day: 'Wed', score: 12.5 },
      { day: 'Thu', score: 12.3 },
      { day: 'Fri', score: 12.1 },
      { day: 'Sat', score: 12.0 },
      { day: 'Sun', score: 11.8 }
    ]
  },
  {
    week: 'Week 3',
    retention: 92,
    sciScore: 10,
    completed: true,
    level: "Stimulus Control",
    dailySCI: [
      { day: 'Mon', score: 11.5 },
      { day: 'Tue', score: 11.2 },
      { day: 'Wed', score: 10.8 },
      { day: 'Thu', score: 10.5 },
      { day: 'Fri', score: 10.2 },
      { day: 'Sat', score: 10.0 },
      { day: 'Sun', score: 9.8 }
    ]
  },
  {
    week: 'Week 4',
    retention: 88,
    sciScore: 8,
    completed: true,
    level: "Cognitive Restructuring",
    dailySCI: [
      { day: 'Mon', score: 9.5 },
      { day: 'Tue', score: 9.0 },
      { day: 'Wed', score: 8.8 },
      { day: 'Thu', score: 8.5 },
      { day: 'Fri', score: 8.2 },
      { day: 'Sat', score: 8.0 },
      { day: 'Sun', score: 7.8 }
    ]
  },
  {
    week: 'Week 5',
    retention: 85,
    sciScore: 6,
    inProgress: true,
    level: "Relaxation Techniques",
    dailySCI: [
      { day: 'Mon', score: 7.5 },
      { day: 'Tue', score: 7.0 },
      { day: 'Wed', score: 6.8 },
      { day: 'Thu', score: 6.5 },
      { day: 'Fri', score: 6.0 },
      { day: null, score: null },
      { day: null, score: null }
    ]
  },
  {
    week: 'Week 6',
    retention: null,
    sciScore: null,
    upcoming: true,
    level: "Maintenance Planning",
    dailySCI: []
  }
];

// Transform data for detailed SCI chart
const detailedSCIData = weeklyData.flatMap(week => 
  week.dailySCI.map(day => ({
    date: `${week.week} ${day.day || ''}`,
    score: day.score,
    weekLevel: week.level,
    isComplete: week.completed,
    isInProgress: week.inProgress
  }))
).filter(item => item.score !== null);

const currentWeek = 5;
const totalWeeks = 6;

type TooltipData = {
  value: number;
  payload: {
    weekLevel: string;
  };
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipData[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-sm">SCI Score: {payload[0].value}</p>
        <p className="text-xs text-gray-500">
          {payload[0].payload.weekLevel}
        </p>
      </div>
    );
  }
  return null;
};

const PatientSleepDashboard = () => {
  const currentLevel = weeklyData[currentWeek - 1]?.level;
  const averageSciScore = weeklyData
    .filter(week => week.sciScore !== null)
    .reduce((acc, curr) => acc + curr.sciScore, 0) / currentWeek;

  // Add state for notes
  const [notes, setNotes] = useState('');

  // Load notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('patientNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever they change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem('patientNotes', newNotes);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Previous header and metrics components remain the same */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Sarah Johnson</h1>
          <div className="text-gray-500 space-x-4">
            <span>ID: P-2024-0123</span>
            <span>Age: 34</span>
            <span>Program Start: Jan 15, 2024</span>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Week {currentWeek} of {totalWeeks}</Badge>
      </div>

      {/* Detailed SCI Score Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Sleep Condition Indicator (SCI) Progress</CardTitle>
          <CardDescription>Daily SCI score tracking with significant changes highlighted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">

          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Clinical Cutoff (Score: 10)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Improvement Trend</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Current Week</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly SCI Score Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.filter(week => week.sciScore !== null).map((week, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{week.week}</div>
                    <div className="text-sm text-gray-500">{week.level}</div>
                  </div>
                  <div className="text-right">
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rest of the components remain the same */}
        {/* ... */}
      </div>

      {/* Add Notes Section at the bottom */}
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
};

export default PatientSleepDashboard;