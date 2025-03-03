import React from 'react';
import styled from '@emotion/styled';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateTherapistTimeData = () => {
  // Each entry represents a week
  const sessions = [
    { day: 'Week 1', sessionLength: 50, notes: 40 }, // 90min total - initial session + notes
    { day: 'Week 2', sessionLength: 45, notes: 20 }, // Patient doing app exercises
    { day: 'Week 3', sessionLength: 40, notes: 10 }, // Quick notes via dashboard
    { day: 'Week 4', sessionLength: 40, notes: 5 },  // Minimal notes needed
    { day: 'Week 5', sessionLength: 40, notes: 5 },  // App tracks progress
  ];

  return {
    labels: sessions.map(s => s.day),
    sessionData: sessions.map(s => s.sessionLength),
    notesData: sessions.map(s => s.notes),
  };
};

const TherapistTimeChart = () => {
  const { labels, sessionData, notesData } = generateTherapistTimeData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Session Time (minutes)',
        data: sessionData,
        backgroundColor: '#48bb78',
        stack: 'Stack 0',
      },
      {
        label: 'Notes Time (minutes)',
        data: notesData,
        backgroundColor: '#9ae6b4',
        stack: 'Stack 0',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          footer: (tooltipItems: any) => {
            const total = tooltipItems[0].parsed + (tooltipItems[1]?.parsed || 0);
            return `Total Time: ${total} minutes`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Minutes',
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <ChartTitle>Therapist Time Per Week</ChartTitle>
      <Bar data={chartData} options={options} />
      <ChartDescription>
        Time spent decreases as patient completes exercises via app between sessions.
        Quick session notes can be added through the Thinkable dashboard.
      </ChartDescription>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const ChartTitle = styled.h3`
  margin: 0 0 1rem;
  color: #2d3748;
`;

const ChartDescription = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export default TherapistTimeChart; 