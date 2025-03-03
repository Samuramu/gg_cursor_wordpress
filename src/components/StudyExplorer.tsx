import React, { useState } from 'react';
import studiesData from '../data/studies.json';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface StudiesData {
  studies: Study[];
}

const { studies } = studiesData as StudiesData;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StudyCard = styled.div<{ isExpanded: boolean }>`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-out;
  
  ${({ isExpanded }) => isExpanded && `
    grid-column: 1 / -1;
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div<{ isRct: boolean }>`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: ${({ isRct }) => isRct ? 'linear-gradient(135deg, #EBF8FF 0%, #BEE3F8 100%)' : 'white'};
  border-radius: 1rem 1rem 0 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  transition: all 0.3s ease;
`;

const Badge = styled.span`
  background: #48BB78;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

interface Study {
  authors: string;
  journal: string;
  population: string;
  module: string;
  summary: string[]; // Array of summary points
  fullText: string; // Full text of the study details.
  isRct: boolean;
}

const StudyExplorer: React.FC = () => {
  const [expandedStudy, setExpandedStudy] = useState<number | null>(null);

  const toggleStudy = (index: number) => {
    setExpandedStudy(expandedStudy === index ? null : index);
  };

        return (
    <Container>
      <Header>
        <h2 className="text-3xl font-bold mb-4">The Science Behind GGtude</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our research portfolio of {studies.length} peer-reviewed studies, 
          including {studies.filter(s => s.isRct).length} randomized controlled trials
        </p>
      </Header>

      <StudyGrid>
{studies.map((study, index) => (
          <StudyCard 
            key={index}
            isExpanded={expandedStudy === index}
onClick={() => toggleStudy(index)}
>
            <CardHeader isRct={study.isRct}>
              <div className="flex items-center mb-2">
                <Badge>{study.module}</Badge>
                {study.isRct && <Badge>RCT</Badge>}
</div>
              <h3 className="font-bold text-lg mb-1">{study.authors}</h3>
              <p className="text-sm text-gray-600">{study.journal}</p>
              <p className="text-sm text-gray-600">Population: {study.population}</p>
            </CardHeader>

            <CardContent>
{expandedStudy === index && (
                <>
                  <ul className="list-disc ml-5 mb-4 text-gray-700">
                    {study.summary.map((point, i) => (
                      <li key={i} className="mb-2">{point}</li>
                    ))}
                  </ul>
<p className="text-gray-700 whitespace-pre-line">{study.fullText}</p>
                </>
)}
            </CardContent>
          </StudyCard>
))}
      </StudyGrid>
    </Container>
);
};

export default StudyExplorer;