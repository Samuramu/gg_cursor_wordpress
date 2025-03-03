import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState, useEffect } from 'react';

// Create 2D animations
const float = keyframes`
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, calc(-50% - 3px)); }
`;

const wobble = keyframes`
  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-50%, -52%) rotate(2deg); }
  75% { transform: translate(-50%, -48%) rotate(-1deg); }
`;

const floatX = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(25px); }
  75% { transform: translateX(-25px); }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  33% { transform: translateY(20px); }
  66% { transform: translateY(-20px); }
`;

// Create random floating movement
const randomFloat = (intensity: number) => keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px); }
  40% { transform: translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px); }
  60% { transform: translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px); }
  80% { transform: translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px); }
  100% { transform: translate(0, 0); }
`;

const Container = styled.div`
  width: 1200px;
  margin: 3rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 1280px) {
    width: calc(100% - 2rem);
    margin: 2rem auto;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  text-align: center;
  max-width: 500px;
  margin: 0 auto 2rem;
  color: #4a5568;
`;

const Scene = styled.div`
  position: relative;
  width: 600px;
  height: 450px;
  margin: 0 auto;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const Globe = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PatientIcon = styled.img`
  width: 72px;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 48px;
  }
`;

const Node = styled.div<{ 
  angle: number; 
  distance: number; 
  yOffset: number; 
  isPatient?: boolean;
  isOrganized?: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transition: transform 0.5s ease-out;
  
  ${props => {
    if (props.isOrganized) {
      if (props.isPatient) {
        return `
          transform: translate(-50%, -50%);
        `;
      }
      const angleRad = props.angle * Math.PI / 180;
      const x = Math.cos(angleRad) * props.distance;
      const y = Math.sin(angleRad) * props.distance;
      return `
        transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
      `;
    }
    
    if (props.isPatient) {
      return `
        transform: translate(-50%, -50%);
        animation: ${float} 4s ease-in-out infinite;
      `;
    }
    
    // Calculate base position based on angle and distance
    const baseX = Math.cos(props.angle * Math.PI / 180) * props.distance;
    const baseY = Math.sin(props.angle * Math.PI / 180) * props.distance + props.yOffset;
    
    // Create dynamic floating animation by combining X and Y movements
    const xDuration = 7 + (Math.abs(props.angle) % 5);
    const yDuration = 5 + (Math.abs(props.distance) % 4);
    
    return `
      transform: translate(calc(-50% + ${baseX}px), calc(-50% + ${baseY}px));
      animation: 
        ${floatX} ${xDuration}s ease-in-out infinite,
        ${floatY} ${yDuration}s ease-in-out infinite;
      animation-delay: -${(props.angle % 7)}s, -${(props.distance % 5)}s;
    `;
  }}

  @media (max-width: 768px) {
    ${props => {
      if (props.isOrganized) {
        if (props.isPatient) {
          return `
            transform: translate(-50%, -50%);
          `;
        }
        const angleRad = props.angle * Math.PI / 180;
        const x = Math.cos(angleRad) * props.distance * 0.6;
        const y = Math.sin(angleRad) * props.distance * 0.6;
        return `
          transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
        `;
      }
      
      if (props.isPatient) {
        return `
          transform: translate(-50%, -50%);
          animation: ${float} 4s ease-in-out infinite;
        `;
      }

      // Calculate base position based on angle and distance (scaled for mobile)
      const baseX = Math.cos(props.angle * Math.PI / 180) * props.distance * 0.6;
      const baseY = Math.sin(props.angle * Math.PI / 180) * props.distance * 0.6 + props.yOffset * 0.6;
      
      // Create dynamic floating animation by combining X and Y movements (scaled for mobile)
      const xDuration = 7 + (Math.abs(props.angle) % 5);
      const yDuration = 5 + (Math.abs(props.distance) % 4);
      
      return `
        transform: translate(calc(-50% + ${baseX}px), calc(-50% + ${baseY}px));
        animation: 
          ${floatX} ${xDuration}s ease-in-out infinite,
          ${floatY} ${yDuration}s ease-in-out infinite;
        animation-delay: -${(props.angle % 7)}s, -${(props.distance % 5)}s;
      `;
    }}
  }
`;

const NodeContent = styled.div<{ isOrganized?: boolean; angle?: number }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2d3748;
  text-align: center;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${props => props.isOrganized ? 'none' : `${wobble} ${3 + Math.abs((props.angle || 0) % 4)}s ease-in-out infinite`};
  animation-delay: ${props => ((props.angle || 0) % 5) * -0.5}s;
`;

const NodeContentInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
`;

const ToggleSwitch = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 100;
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ToggleTrack = styled.div<{ isRight: boolean }>`
  width: 40px;
  height: 20px;
  background: #E2E8F0;
  border-radius: 20px;
  padding: 2px;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.isRight ? 'calc(100% - 18px)' : '2px'};
    width: 16px;
    height: 16px;
    background: #48BB78;
    border-radius: 50%;
    transition: all 0.2s ease-out;
  }
`;

const ToggleLabel = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  color: ${props => props.isActive ? '#48BB78' : '#718096'};
  cursor: pointer;
`;

// Organized positions for the thinkable state - circle layout
const organizedPositions = [
  // Center position for patient
  { angle: 0, distance: 0, yOffset: 0, label: 'Patient', isPatient: true },
  // Circle positions for other nodes - 6 nodes evenly distributed
  { angle: 0, distance: 150, yOffset: 0, label: 'Family' },
  { angle: 60, distance: 150, yOffset: 0, label: 'Therapy' },
  { angle: 120, distance: 150, yOffset: 0, label: 'Clinic' },
  { angle: 180, distance: 150, yOffset: 0, label: 'Human Assistant' },
  { angle: 240, distance: 150, yOffset: 0, label: 'AI Assistant' },
  { angle: 300, distance: 150, yOffset: 0, label: 'Support' },
];

const generateRandomPositions = () => [
  { 
    label: 'Patient', 
    icon: <PatientIcon src={`${window.wpData?.themeUrl}/images/pngs/patient.png`} alt="Patient" />, 
    angle: 0, 
    distance: 0, 
    yOffset: 0, 
    isPatient: true 
  },
  { 
    label: 'Family', 
    icon: <PatientIcon src={`${window.wpData?.themeUrl}/images/pngs/family.png`} alt="Family" />, 
    angle: Math.random() * 360, 
    distance: 80 + Math.random() * 100, 
    yOffset: -50 + Math.random() * 100
  },
  { 
    label: 'Therapy', 
    icon: <PatientIcon src={`${window.wpData?.themeUrl}/images/pngs/therapist.png`} alt="Therapy" />, 
    angle: Math.random() * 360, 
    distance: 80 + Math.random() * 100, 
    yOffset: -50 + Math.random() * 100
  },
  { 
    label: 'Clinic', 
    icon: <PatientIcon src={`${window.wpData?.themeUrl}/images/pngs/clinic.png`} alt="Clinic" />, 
    angle: Math.random() * 360, 
    distance: 80 + Math.random() * 100, 
    yOffset: -50 + Math.random() * 100
  },
  { 
    label: 'Human Assistant', 
    icon: <PatientIcon src={`${window.wpData?.themeUrl}/images/pngs/human-assistant.png`} alt="Human Assistant" />, 
    angle: Math.random() * 360, 
    distance: 80 + Math.random() * 100, 
    yOffset: -50 + Math.random() * 100
  },
  { 
    label: 'AI Assistant', 
    icon: <PatientIcon src={`${window.wpData?.themeUrl}/images/pngs/ai-agent.png`} alt="AI Assistant" />, 
    angle: Math.random() * 360, 
    distance: 80 + Math.random() * 100, 
    yOffset: -50 + Math.random() * 100
  },
  { 
    label: 'Support', 
    icon: <PatientIcon src={`${window.wpData?.themeUrl}/images/pngs/support.png`} alt="Support" />, 
    angle: Math.random() * 360, 
    distance: 80 + Math.random() * 100, 
    yOffset: -50 + Math.random() * 100
  },
];

const ConnectingLine = styled.div<{ x1: number; y1: number; x2: number; y2: number; isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => Math.sqrt(Math.pow(props.x2 - props.x1, 2) + Math.pow(props.y2 - props.y1, 2))}px;
    height: 2px;
    background: rgba(72, 187, 120, 0.3);
    transform-origin: left;
    transform: translate(${props => props.x1}px, ${props => props.y1}px) 
              rotate(${props => Math.atan2(props.y2 - props.y1, props.x2 - props.x1)}rad);
  }
`;

const SupportEcosystem = () => {
  const [isThinkable, setIsThinkable] = useState(false);
  const [randomNodes, setRandomNodes] = useState(generateRandomPositions());

  // Auto toggle between states
  useEffect(() => {
    const interval = setInterval(() => {
      setIsThinkable(prev => !prev);
      if (!isThinkable) {
        setRandomNodes(generateRandomPositions());
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isThinkable]);

  // Handle manual toggle
  const handleToggle = (value: boolean) => {
    setIsThinkable(value);
    if (!value) {
      setRandomNodes(generateRandomPositions());
    }
  };

  // Calculate node positions for connecting lines
  const getNodePosition = (node: typeof organizedPositions[0]) => {
    if (node.isPatient) {
      return { x: 0, y: 0 }; // Center position
    }
    // Convert angle and distance to x,y coordinates
    const angleRad = (node.angle * Math.PI) / 180;
    const x = Math.cos(angleRad) * node.distance;
    const y = Math.sin(angleRad) * node.distance;
    return { x, y };
  };

  return (
    <Container>
      <Title>360° Mental Health Support</Title>
      <Subtitle>
        A comprehensive ecosystem of support, connecting patients with healthcare providers, AI assistance, and community resources
      </Subtitle>
      <Scene>
        <Globe>
          {/* Add connecting lines */}
          {isThinkable && organizedPositions.map((node, i) => {
            if (i === 0) return null; // Skip patient node
            const fromPos = getNodePosition(organizedPositions[0]); // Patient position
            const toPos = getNodePosition(node);
            return (
              <ConnectingLine
                key={`line-${i}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                isVisible={isThinkable}
              />
            );
          })}
          {/* Add connecting lines between adjacent nodes */}
          {isThinkable && organizedPositions.slice(1).map((node, i) => {
            if (i >= organizedPositions.length - 2) return null;
            const nextNode = organizedPositions[i + 2];
            const fromPos = getNodePosition(node);
            const toPos = getNodePosition(nextNode);
            return (
              <ConnectingLine
                key={`circle-line-${i}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                isVisible={isThinkable}
              />
            );
          })}
          {randomNodes.map((node, i) => {
            const currentNode = isThinkable ? organizedPositions[i] : node;
            return (
              <Node 
                key={i} 
                {...currentNode}
                isPatient={node.isPatient}
                isOrganized={isThinkable}
              >
                <NodeContent isOrganized={isThinkable} angle={currentNode.angle}>
                  <NodeContentInner>
                    <div>
                      {typeof node.icon === 'string' ? node.icon : node.icon}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.2 }}>{node.label}</div>
                  </NodeContentInner>
                </NodeContent>
              </Node>
            );
          })}
        </Globe>
        <ToggleSwitch>
          <ToggleLabel isActive={!isThinkable} onClick={() => handleToggle(false)}>Existing</ToggleLabel>
          <ToggleTrack isRight={isThinkable} onClick={() => handleToggle(!isThinkable)} />
          <ToggleLabel isActive={isThinkable} onClick={() => handleToggle(true)}>Thinkable</ToggleLabel>
        </ToggleSwitch>
      </Scene>
    </Container>
  );
};

export default SupportEcosystem;
