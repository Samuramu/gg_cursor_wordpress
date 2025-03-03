import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import rawStudiesData from '../data/studies.json';
import { useState } from 'react';
const studiesData = rawStudiesData as { studies: Study[] };

interface Study {
  authors: string;
  journal: string;
  population: string;
  module: string;
  isRct: boolean;
  summary: string[];
  fullText: string;
  participants?: number;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin: 4rem 0;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 700px;
  margin: 0 auto;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin: 3rem 0;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #48BB78;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #4a5568;
  font-size: 1.1rem;
`;

const SpotlightStudy = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin: 4rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SpotlightContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SpotlightTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const SpotlightMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Badge = styled.span`
  background: ${props => props.color || '#48BB78'};
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
`;

const SpotlightDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FullText = styled.div`
  white-space: pre-wrap;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  line-height: 1.6;
`;

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const StudyCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  transition: all 0.2s ease;
`;

const StudyCardTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const StudyCardMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Science = () => {
  const [selectedStudy, setSelectedStudy] = useState(studiesData.studies.find(study => study.isRct));
  const otherStudies = studiesData.studies.filter(study => study !== selectedStudy);

  const totalParticipants = studiesData.studies.reduce((sum, study) => sum + (study.participants || 0), 0);
  const rctCount = studiesData.studies.filter(s => s.isRct).length;

  const handleStudySelect = (study: Study) => {
    setSelectedStudy(study);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Hero>
        <Title>Evidence-Based Mental Health Solutions</Title>
        <Subtitle>
          Our interventions are backed by rigorous scientific research, including randomized controlled trials
          and peer-reviewed studies.
        </Subtitle>
        
        <Stats>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatNumber>{studiesData.studies.length}</StatNumber>
            <StatLabel>Published Studies</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatNumber>{rctCount}</StatNumber>
            <StatLabel>Randomized Controlled Trials</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <StatNumber>{totalParticipants.toLocaleString()}+</StatNumber>
            <StatLabel>Total Participants</StatLabel>
          </StatItem>
        </Stats>
      </Hero>

      {selectedStudy && (
        <SpotlightStudy
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SpotlightContent>
            <SpotlightTitle>{selectedStudy.authors}</SpotlightTitle>
            <SpotlightMeta>
              <Badge>{selectedStudy.module}</Badge>
              {selectedStudy.isRct && <Badge color="#4299E1">RCT</Badge>}
              <Badge color="#805AD5">{selectedStudy.journal}</Badge>
              {selectedStudy.participants && (
                <Badge color="#ED8936">n={selectedStudy.participants}</Badge>
              )}
            </SpotlightMeta>
            <SpotlightDescription>
              {selectedStudy.summary.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </SpotlightDescription>
            <FullText>
              {selectedStudy.fullText}
            </FullText>
          </SpotlightContent>
        </SpotlightStudy>
      )}

      <h2>More Research</h2>
      <StudyGrid>
        {otherStudies.map((study, index) => (
          <StudyCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            onClick={() => handleStudySelect(study)}
            style={{ cursor: 'pointer' }}
          >
            <StudyCardMeta>
              <Badge>{study.module}</Badge>
              {study.isRct && <Badge color="#4299E1">RCT</Badge>}
            </StudyCardMeta>
            <StudyCardTitle>{study.authors}</StudyCardTitle>
            <p>{study.journal}</p>
            <p style={{ marginTop: '1rem' }}>{study.summary[0]}</p>
          </StudyCard>
        ))}
      </StudyGrid>
    </Container>
  );
};

export default Science; 