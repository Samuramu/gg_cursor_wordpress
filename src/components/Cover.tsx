import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import BookDemo from './BookDemo';

const floatingLights = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translate(0, 0) scale(1);
  }
  33% {
    opacity: 0.4;
    transform: translate(30px, -20px) scale(1.2);
  }
  66% {
    opacity: 0.2;
    transform: translate(-20px, 10px) scale(0.8);
  }
`;

const CoverContainer = styled.div`
  background-image: ${() => `
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
    url('${window.wpData?.themeUrl}/images/cover-bg.jpg')`};
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    min-height: 50vh;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &::before {
    background: 
      radial-gradient(circle at 20% 30%, rgba(98, 255, 182, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(72, 187, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    animation: ${floatingLights} 8s infinite alternate;
  }

  &::after {
    background: 
      radial-gradient(circle at 70% 20%, rgba(98, 255, 182, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 30% 80%, rgba(72, 187, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    animation: ${floatingLights} 12s infinite alternate-reverse;
    animation-delay: -3s;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0 0 1rem;
  font-weight: 700;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 0 0 2rem;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background: #48bb78;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }

  &:hover {
    background: #38a169;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

interface CoverProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

const Cover = ({ title, subtitle, ctaText }: CoverProps) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <CoverContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <CTAButton onClick={() => setIsDemoOpen(true)}>
          {ctaText}
        </CTAButton>
      </CoverContainer>
      <BookDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
};

export default Cover; 