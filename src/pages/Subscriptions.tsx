import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 0.5rem;
  background: #f7fafc;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  background: ${props => props.active ? '#48BB78' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4A5568'};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#48BB78' : '#EDF2F7'};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const Content = styled.div`
  color: #4a5568;
  line-height: 1.8;

  h2 {
    font-size: 1.8rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  ul {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  strong {
    color: #2d3748;
    font-weight: 600;
  }

  a {
    color: #48BB78;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      color: #38A169;
      text-decoration: underline;
    }
  }

  .contact-info {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f7fafc;
    border-radius: 0.5rem;
    border-left: 4px solid #48BB78;
  }
`;

const StatBox = styled.div`
  background: #f0fff4;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1rem 0;
  border-left: 4px solid #48BB78;

  .stat {
    font-size: 2rem;
    color: #2d3748;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 1.1rem;
    color: #4a5568;
  }
`;

const StepsList = styled.ol`
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  list-style-type: decimal;

  li {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

type TabType = 'benefits' | 'restore' | 'cancel' | 'refund';

interface TabContent {
  title: string;
  content: React.ReactNode;
}

const tabContent: Record<TabType, TabContent> = {
  benefits: {
    title: "Benefits of App Subscription",
    content: (
      <>
        <p>Building a healthy habit</p>
        <p>Breaking negative thinking habits and increasing supporting thinking doesn't happen in a day. When we started working on the apps, we knew that to succeed, we have to let people exercise for a short amount of time every day.</p>
        
        <h3>Published and collected real-world evidence shows:</h3>
        
        <StatBox>
          <div className="stat">82.2%</div>
          <div className="description">of users see results within 1 week</div>
        </StatBox>
        
        <ul>
          <li>Using the app for 14 days can increase supportive thinking and reduces negative thinking</li>
          <li>Using ocd.app for 24 days shows decrease of OCD symptoms by 20%, on average</li>
          <li>Completing the Body Image module (~14 days) results in improved body acceptance and resilience</li>
          <li>Our self-esteem module is shown to improve confidence and self-worth after 18 days of use</li>
        </ul>
      </>
    )
  },
  restore: {
    title: "Restore Your Subscription",
    content: (
      <>
        <p>How to restore your subscription or previous purchase:</p>
        <StepsList>
          <li>Tap "Upgrade" on your home screen</li>
          <li>From the purchases screen, scroll down to the bottom</li>
          <li>Tap "Restore purchases"</li>
        </StepsList>
        <div className="contact-info">
          <p><strong>Need help with restoration?</strong></p>
          <p>Contact our support team at <a href="mailto:support@ggtude.com">support@ggtude.com</a> for assistance.</p>
        </div>
      </>
    )
  },
  cancel: {
    title: "Cancel Your Subscription",
    content: (
      <>
        <div>
          <h3>iPhone, iPad (App Store)</h3>
          <StepsList>
            <li>Open your iPhone's "Settings" app</li>
            <li>Tap your personal account name</li>
            <li>Tap "Subscriptions"</li>
            <li>Tap the subscription that you want to cancel</li>
            <li>Tap "Cancel Subscription"</li>
          </StepsList>
        </div>

        <div>
          <h3>Android (Google Play)</h3>
          <StepsList>
            <li>On your Android phone or tablet, open the Google Play Store</li>
            <li>Check if you're signed in to the correct Google Account</li>
            <li>Tap Menu {'->'} "Subscriptions"</li>
            <li>Select the subscription you want to cancel</li>
            <li>Tap "Cancel subscription"</li>
            <li>Follow additional instructions</li>
          </StepsList>
        </div>

        <div className="contact-info">
          <p><strong>Important Note:</strong> Uninstalling the app from your device will not cancel your subscription.</p>
        </div>
      </>
    )
  },
  refund: {
    title: "Request a Refund",
    content: (
      <>
        <div>
          <h3>iPhone, iPad (App Store)</h3>
          <StepsList>
            <li>Go to <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a></li>
            <li>Sign in with your Apple ID and password</li>
            <li>If you see the "Report" or "Report a Problem" button next to the item that you want to request a refund for, click it</li>
            <li>Follow the instructions on the page to choose the reason why you want a refund and submit your request</li>
          </StepsList>
        </div>

        <div>
          <h3>Android (Google Play)</h3>
          <StepsList>
            <li>Find your purchase receipt</li>
            <li>Send a copy of your purchase receipt to <a href="mailto:support@ggtude.com">support@ggtude.com</a></li>
            <li>Expect around 48 hours for processing</li>
          </StepsList>
        </div>
      </>
    )
  }
};

const Subscriptions = () => {
  const [activeTab, setActiveTab] = useState<TabType>('benefits');
  const content = tabContent[activeTab];

  return (
    <Container>
      <Title>Subscription Management</Title>
      
      <TabBar>
        <Tab 
          active={activeTab === 'benefits'} 
          onClick={() => setActiveTab('benefits')}
        >
          Benefits
        </Tab>
        <Tab 
          active={activeTab === 'restore'} 
          onClick={() => setActiveTab('restore')}
        >
          Restore Subscription
        </Tab>
        <Tab 
          active={activeTab === 'cancel'} 
          onClick={() => setActiveTab('cancel')}
        >
          Cancel Subscription
        </Tab>
        <Tab 
          active={activeTab === 'refund'} 
          onClick={() => setActiveTab('refund')}
        >
          Request Refund
        </Tab>
      </TabBar>

      <AnimatePresence mode="wait">
        <ContentWrapper
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Content>
            <h2>{content.title}</h2>
            {content.content}
          </Content>
        </ContentWrapper>
      </AnimatePresence>
    </Container>
  );
};

export default Subscriptions; 