import styled from '@emotion/styled';
import { useState } from 'react';

const Container = styled.div`
  max-width: 1200px;
  margin: 6rem auto 4rem;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const FAQSection = styled.div`
  margin-bottom: 2rem;
`;

const Question = styled.div<{ isOpen: boolean }>`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  h2 {
    font-size: 1.25rem;
    color: #2d3748;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:after {
    content: '${props => props.isOpen ? '−' : '+'}';
    font-size: 1.5rem;
    color: #48bb78;
  }
`;

const Answer = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  padding: ${props => props.isOpen ? '1.5rem' : '0'};
  background: #f7fafc;
  border-radius: 0 0 0.5rem 0.5rem;
  margin-top: ${props => props.isOpen ? '-1rem' : '0'};
  margin-bottom: 1rem;

  p {
    margin: 0 0 1rem;
    line-height: 1.6;
    color: #4a5568;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: #4a5568;
    }
  }
`;

const FAQ = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    pricing: true,
    useCases: false,
    research: false,
    gamification: false,
    assistants: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Container>
      <Title>Frequently Asked Questions</Title>

      <FAQSection>
        <Question 
          isOpen={openSections.pricing}
          onClick={() => toggleSection('pricing')}
        >
          <h2>What is your pricing model?</h2>
        </Question>
        <Answer isOpen={openSections.pricing}>
          <p>Our pricing is designed to be transparent and scalable based on your organization's needs:</p>
          <ul>
            <li>Pricing starts from $20 per active user per month</li>
            <li>Pricing is per site/location</li>
            <li>Volume discounts available for larger organizations</li>
            <li>Custom enterprise plans available for healthcare networks</li>
          </ul>
          <p>Contact our sales team for a detailed quote tailored to your organization's specific needs.</p>
        </Answer>

        <Question 
          isOpen={openSections.useCases}
          onClick={() => toggleSection('useCases')}
        >
          <h2>What are the main use cases for Thinkable?</h2>
        </Question>
        <Answer isOpen={openSections.useCases}>
          <p>Thinkable's platform is designed to support both medical and mental health conditions:</p>
          
          <h3 style={{ color: '#2d3748', marginTop: '1rem', marginBottom: '0.5rem' }}>Medical Applications</h3>
          <ul>
            <li>Chronic pain management and monitoring</li>
            <li>Endometriosis management and monitoring</li>
            <li>Post-surgery recovery support</li>
            <li>Chronic illness management</li>
            <li>Pain-related anxiety and depression</li>
          </ul>

          <h3 style={{ color: '#2d3748', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Mental Health Applications</h3>
          <ul>
            <li>Depression and anxiety treatment support</li>
            <li>OCD treatment support</li>
            <li>Cognitive behavioral therapy (CBT) enhancement</li>
            <li>Young people mental health services</li>
            <li>Addiction recovery support</li>
            <li>PTSD treatment assistance</li>
            <li>Preventive mental health care</li>
          </ul>
          
          <p style={{ marginTop: '1rem' }}>Each application is tailored with specific interventions and monitoring tools designed for that particular condition.</p>
        </Answer>

        <Question 
          isOpen={openSections.research}
          onClick={() => toggleSection('research')}
        >
          <h2>How do you conduct research and validate your approach?</h2>
        </Question>
        <Answer isOpen={openSections.research}>
          <p>Our research approach is rigorous and evidence-based:</p>
          <ul>
            <li>Randomized Controlled Trials (RCTs) to validate effectiveness</li>
            <li>Active collaborations with leading universities worldwide</li>
            <li>Ongoing clinical studies in various mental health settings</li>
            <li>Regular peer-reviewed publications of our findings</li>
            <li>Continuous data analysis to improve our methodologies</li>
          </ul>
          <p>Our commitment to research ensures that our solutions are not just innovative but also scientifically validated.</p>
        </Answer>

        <Question 
          isOpen={openSections.gamification}
          onClick={() => toggleSection('gamification')}
        >
          <h2>Why use a game-like solution for mental health?</h2>
        </Question>
        <Answer isOpen={openSections.gamification}>
          <p>Our game-like approach is strategically designed to enhance treatment effectiveness:</p>
          <ul>
            <li>Drives higher engagement rates compared to traditional methods</li>
            <li>Makes therapeutic exercises more appealing and less intimidating</li>
            <li>Creates positive associations with mental health practices</li>
            <li>Encourages regular practice through achievement systems</li>
            <li>Provides immediate feedback and reinforcement</li>
            <li>Makes progress tracking more intuitive and motivating</li>
          </ul>
          <p>This approach has proven to significantly increase user adherence to treatment plans while maintaining clinical effectiveness.</p>
        </Answer>

        <Question 
          isOpen={openSections.assistants}
          onClick={() => toggleSection('assistants')}
        >
          <h2>What are human assistants and how do they help?</h2>
        </Question>
        <Answer isOpen={openSections.assistants}>
          <p>Our human assistants are a cost-effective solution that significantly improves treatment outcomes:</p>
          <ul>
            <li>Trained professionals who provide personalized support</li>
            <li>Drive higher adherence to treatment plans</li>
            <li>Offer motivation and accountability</li>
            <li>Help users overcome obstacles in their therapy journey</li>
            <li>Provide regular check-ins and progress monitoring</li>
            <li>Cost-effective alternative to full-time therapeutic support</li>
          </ul>
          <p>Studies show that our human assistant model leads to better engagement and improved treatment results while maintaining cost-effectiveness for healthcare providers.</p>
        </Answer>
      </FAQSection>
    </Container>
  );
};

export default FAQ; 