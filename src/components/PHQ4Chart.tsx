import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

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

const generatePHQ4Data = (days: number) => {
  const steadyDays = 5;   // Days before starting app
  const improvementDays = 21; // Days to reach target improvement
  const scores = [
    11, 11, 11, 11, 11, // Steady high score before app
    10, 10, 9, 9, 8, 8, 7, 7, 6, 8, 6, 7, 6, 6, 6, 5, 6, 6, 6, 5, 5 // Improvement phase
  ];

  const data = [];
  const dates = [];
  
  for (let i = 0; i < days; i++) {
    const value = i < scores.length ? scores[i] : 6; // Use hard-coded scores or maintain at 6
    data.push(value);
    dates.push(`Day ${i + 1}`);
  }
  
  return { data, dates, startAppDay: steadyDays };
};

const PHQ4Chart = () => {
  const chartRef = useRef<any>(null);
  const { data, dates, startAppDay } = generatePHQ4Data(30);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'PHQ4 Score',
        data: data,
        borderColor: '#48bb78',
        backgroundColor: 'rgba(72, 187, 120, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
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
      annotation: {
        annotations: {
          startLine: {
            type: 'line',
            xMin: startAppDay,
            xMax: startAppDay,
            borderColor: '#4299e1',
            borderWidth: 2,
            label: {
              content: 'Started Thinkable',
              enabled: true,
              position: 'top',
              backgroundColor: '#4299e1',
              color: 'white',
              padding: 4
            }
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 12,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <ChartContainer>
      <ChartTitle>Patient's PHQ4 Progress</ChartTitle>
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            annotation: {
              annotations: [
                {
                  type: 'line',
                  xMin: startAppDay,
                  xMax: startAppDay,
                  borderColor: '#4299e1',
                  borderWidth: 2,
                  label: {
                    content: 'Started Thinkable',
                    display: true,
                    position: 'center',
                    backgroundColor: '#4299e1',
                    color: 'white',
                    padding: 4
                  }
                }
              ]
            }
          }
        }}
      />
      <ChartDescription>
        PHQ4 scores show steady improvement after starting Thinkable. 
        Patients typically see a 35% reduction in symptoms within 3 weeks.
      </ChartDescription>
    </ChartContainer>
  );
};

export default PHQ4Chart;