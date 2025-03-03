import React from 'react';
import styled from '@emotion/styled';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
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

// Intervention markers
const InterventionMarker = styled.div<{ type: 'check-in' | 'module-change' | 'no-activity' }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: ${props => {
    if (props.type === 'check-in') return '#4299e1';
    if (props.type === 'module-change') return '#ed64a6';
    return '#f56565';
  }};
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
  font-size: 0.85rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const TimelineContainer = styled.div`
  margin-top: 1.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: #f7fafc;
`;

const TimelineTitle = styled.h4`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: #2d3748;
`;

const Timeline = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 40px;
  margin: 1rem 0;
`;

const TimelineBar = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #e2e8f0;
  transform: translateY(-50%);
`;

const TimelineEvent = styled.div<{ position: number; type: 'check-in' | 'module-change' }>`
  position: absolute;
  top: 50%;
  left: ${props => props.position}%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.type === 'check-in' ? '#4299e1' : '#ed64a6'};
  z-index: 2;
  cursor: pointer;

  &::after {
    content: '${props => props.type === 'check-in' ? 'Check-in' : 'Module Change'}';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    white-space: nowrap;
    color: ${props => props.type === 'check-in' ? '#4299e1' : '#ed64a6'};
  }
`;

const NoActivityPeriod = styled.div<{ start: number; end: number }>`
  position: absolute;
  top: 50%;
  left: ${props => props.start}%;
  width: ${props => props.end - props.start}%;
  height: 8px;
  background-color: #f56565;
  transform: translateY(-50%);
  z-index: 1;
  
  &::after {
    content: 'No Activity';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    white-space: nowrap;
    color: #f56565;
  }
`;

const HumanAssistantChart = () => {
  // Generate 14 days of data for a cleaner view
  const days = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`);
  
  // User activity data (0-100%)
  const userActivity = [
    60, 65, 70, 55, 0, 0, 5, 85, 75, 65, 60, 55, 60, 65
  ];

  // Create intervention markers
  const interventions = [
    { day: 7, type: 'Check-in', description: 'Low activity detected for 2 days' },
    { day: 8, type: 'Module Change', description: 'Adjusted difficulty and content' }
  ];

  // Background colors to highlight no-activity periods
  const backgroundColors = userActivity.map((value, index) => {
    if (index === 4 || index === 5) {
      return 'rgba(245, 101, 101, 0.2)'; // Light red for no activity
    }
    return 'rgba(72, 187, 120, 0.5)'; // Default green
  });

  const data = {
    labels: days,
    datasets: [
      {
        label: 'User Activity',
        data: userActivity,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(72, 187, 120, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          afterLabel: (context: any) => {
            const dayIndex = context.dataIndex;
            const dayInterventions = interventions.filter(i => i.day === dayIndex + 1);
            if (dayInterventions.length > 0) {
              return dayInterventions.map(i => `${i.type}: ${i.description}`);
            }
            return [];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Activity Level (%)'
        }
      }
    }
  };

  return (
    <ChartContainer>
      <ChartTitle>Human Assistant Role</ChartTitle>
      <Bar data={data} options={options} />
      
      <TimelineContainer>
        <TimelineTitle>Intervention Timeline</TimelineTitle>
        <Timeline>
          <TimelineBar />
          <NoActivityPeriod start={25} end={40} />
          <TimelineEvent position={45} type="check-in" />
          <TimelineEvent position={70} type="module-change" />
        </Timeline>
      </TimelineContainer>
      
      <LegendContainer>
        <LegendItem>
          <InterventionMarker type="check-in" />
          Check-in
        </LegendItem>
        <LegendItem>
          <InterventionMarker type="module-change" />
          Module Change
        </LegendItem>
        <LegendItem>
          <InterventionMarker type="no-activity" />
          No Activity
        </LegendItem>
      </LegendContainer>
      
      <ChartDescription>
        Human assistants monitor activity levels and provide timely interventions when patients show no activity.
        After check-ins, module changes often lead to increased engagement.
      </ChartDescription>
    </ChartContainer>
  );
};

export default HumanAssistantChart; 