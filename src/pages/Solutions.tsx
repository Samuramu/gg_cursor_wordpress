import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookDemo from '../components/BookDemo';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2d3748;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 700px;
  margin: 0 auto;
`;

const SolutionTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const TabsContainer = styled.div`
  display: inline-flex;
  gap: 0.5rem;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border: 2px solid ${props => props.active ? '#48BB78' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.active ? '#48BB78' : 'transparent'};
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-color: ${props => props.active ? '#48BB78' : 'white'};
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    width: 100%;
  }
`;

const SolutionContent = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Feature = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  color: #48BB78;
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #2D3748;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #4A5568;
  line-height: 1.5;
`;

const CTAButton = styled.button`
  background: #48BB78;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Cover = styled.div`
  position: relative;
  padding: 6rem 2rem;
  background: ${() => `
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('${window.wpData?.themeUrl}/images/solutions-cover.jpg')`} center/cover;
  color: white;
  text-align: center;
  margin-bottom: 4rem;
`;

const CoverContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CoverTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const CoverSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

interface Solution {
  title: string;
  description: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

const solutions: Record<string, Solution> = {
  clinics: {
    title: "For Clinics",
    description: "Enhance your mental health practice with a customized digital solution that improves patient outcomes and increases revenue.",
    features: [
      {
        icon: "🎨",
        title: "White-Label Solution",
        description: "Custom-branded platform that seamlessly integrates with your clinic's identity"
      },
      {
        icon: "📈",
        title: "Outcome Monitoring",
        description: "Track patient progress with real-time analytics and outcome measurements"
      },
      {
        icon: "💰",
        title: "Reimbursement Support",
        description: "Streamlined billing process for insurance reimbursement"
      },
      {
        icon: "🤝",
        title: "Patient Engagement",
        description: "Keep patients engaged between sessions with personalized interventions"
      }
    ]
  },
  organizations: {
    title: "For Mental Health Organizations",
    description: "Scale your impact with a comprehensive digital mental health platform tailored to your organization's needs.",
    features: [
      {
        icon: "🏢",
        title: "Enterprise Integration",
        description: "Seamless integration with your existing systems and workflows"
      },
      {
        icon: "📊",
        title: "Population Analytics",
        description: "Comprehensive data insights across your entire patient population"
      },
      {
        icon: "🔒",
        title: "Security & Compliance",
        description: "HIPAA-compliant platform with enterprise-grade security"
      },
      {
        icon: "📱",
        title: "Multi-Platform Support",
        description: "Access across web, mobile, and tablet devices"
      }
    ]
  },
  payers: {
    title: "For Payers",
    description: "Reduce costs and improve outcomes with data-driven mental health solutions.",
    features: [
      {
        icon: "💵",
        title: "Cost Reduction",
        description: "Lower treatment costs through early intervention and prevention"
      },
      {
        icon: "📉",
        title: "Risk Management",
        description: "Identify and manage high-risk cases proactively"
      },
      {
        icon: "🎯",
        title: "Targeted Interventions",
        description: "Personalized care pathways based on individual needs"
      },
      {
        icon: "📋",
        title: "Outcome Reporting",
        description: "Comprehensive reporting on treatment efficacy and ROI"
      }
    ]
  }
};

const Solutions = () => {
  const [activeSolution, setActiveSolution] = useState(() => {
    // Get initial tab from URL hash or default to 'clinics'
    const hash = window.location.hash.replace('#', '');
    return solutions[hash] ? hash : 'clinics';
  });
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const solution = solutions[activeSolution];

  useEffect(() => {
    // Update active tab when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (solutions[hash]) {
        setActiveSolution(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (key: string) => {
    setActiveSolution(key);
    window.location.hash = key;
  };

  return (
    <>
      <Cover>
        <CoverContent>
          <CoverTitle>Solutions</CoverTitle>
          <CoverSubtitle>
            Discover how GGtude can help your organization improve mental health outcomes
            while maintaining efficiency and reducing costs.
          </CoverSubtitle>
          <TabsContainer>
            {Object.keys(solutions).map(key => (
              <Tab
                key={key}
                active={activeSolution === key}
                onClick={() => handleTabClick(key)}
              >
                {solutions[key].title}
              </Tab>
            ))}
          </TabsContainer>
        </CoverContent>
      </Cover>
      <Container>
        <AnimatePresence mode="wait">
          <SolutionContent
            key={activeSolution}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2>{solution.title}</h2>
            <p>{solution.description}</p>

            <FeatureGrid>
              {solution.features.map((feature, index) => (
                <Feature key={index}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureContent>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureContent>
                </Feature>
              ))}
            </FeatureGrid>

            <CTAButton onClick={() => setIsDemoOpen(true)}>Book a Demo</CTAButton>
          </SolutionContent>
        </AnimatePresence>
      </Container>
      <BookDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
};

export default Solutions; 