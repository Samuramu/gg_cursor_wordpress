import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f8fa 0%, #e9ecef 100%);
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 16/9;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin: 2rem 0;
`;

const Node = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  transform: translate(-50%, -50%);
`;

const NodeButton = styled(motion.button)<{ $isActive: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#48BB78' : '#E2E8F0'};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.$isActive ? 'white' : '#4A5568'};
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const InfoPanel = styled(motion.div)`
  position: absolute;
  right: 2rem;
  top: 2rem;
  width: 300px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    position: fixed;
    right: 1rem;
    left: 1rem;
    width: auto;
    bottom: 1rem;
    top: auto;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background: #48BB78;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.2s;

  &:hover {
    background: #38A169;
    transform: translateY(-2px);
  }
`;

interface SiteNode {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: string;
  description: string;
  path: string;
}

const siteNodes: SiteNode[] = [
  {
    id: 'home',
    label: 'Home',
    x: 50,
    y: 50,
    icon: '🏠',
    description: 'Return to our homepage to discover how we can help improve patient outcomes.',
    path: '/'
  },
  {
    id: 'solutions',
    label: 'Solutions',
    x: 25,
    y: 30,
    icon: '💡',
    description: 'Explore our solutions for clinics, payers, and mental health organizations.',
    path: '/solutions'
  },
  {
    id: 'science',
    label: 'Science',
    x: 75,
    y: 30,
    icon: '🔬',
    description: 'Learn about the research and evidence behind our approach.',
    path: '/science'
  },
  {
    id: 'webinars',
    label: 'Webinars',
    x: 20,
    y: 70,
    icon: '📺',
    description: 'Join our upcoming webinars to learn more about our platform.',
    path: '/webinars'
  },
  {
    id: 'about',
    label: 'About',
    x: 80,
    y: 70,
    icon: '👥',
    description: 'Get to know our team and mission.',
    path: '/about'
  }
];

const NotFound = () => {
  const [activeNode, setActiveNode] = useState<SiteNode | null>(null);

  return (
    <Container>
      <Title>404: Page Not Found</Title>
      <Subtitle>
        Don't worry! Use our interactive map to explore the main features of our site.
      </Subtitle>

      <MapContainer>
        {siteNodes.map(node => (
          <Node key={node.id} $x={node.x} $y={node.y}>
            <NodeButton
              $isActive={activeNode?.id === node.id}
              onClick={() => setActiveNode(node)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {node.icon}
            </NodeButton>
          </Node>
        ))}

        {activeNode && (
          <InfoPanel
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {activeNode.label}
            </h3>
            <p style={{ color: '#4A5568', marginBottom: '1rem' }}>
              {activeNode.description}
            </p>
            <StyledLink to={activeNode.path}>
              Visit {activeNode.label}
            </StyledLink>
          </InfoPanel>
        )}
      </MapContainer>
    </Container>
  );
};

export default NotFound; 