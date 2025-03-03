import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const Content = styled.div`
  max-width: 800px;
`;

const Text = styled.p`
  margin: 0;
  color: #4A5568;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid ${props => props.primary ? '#48BB78' : '#E2E8F0'};
  background: ${props => props.primary ? '#48BB78' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#4A5568'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const PolicyLink = styled(Link)`
  color: #4299E1;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Here you would initialize your analytics and other cookies
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    // Here you would ensure no non-essential cookies are set
  };

  if (!isVisible) return null;

  return (
    <Banner>
      <Content>
        <Text>
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
          By clicking "Accept All", you consent to our use of cookies. Read our{' '}
          <PolicyLink to="/privacy">Privacy Policy</PolicyLink> and{' '}
          <PolicyLink to="/cookie-policy">Cookie Policy</PolicyLink> to learn more.
        </Text>
      </Content>
      <ButtonGroup>
        <Button onClick={handleDecline}>Decline All</Button>
        <Button primary onClick={handleAccept}>Accept All</Button>
      </ButtonGroup>
    </Banner>
  );
};

export default CookieConsent; 