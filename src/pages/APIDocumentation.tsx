import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1200px;
  margin: 6rem auto 4rem;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const ComingSoon = styled(motion.div)`
  background: #48bb78;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  display: inline-block;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const Section = styled.div`
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const CodeBlock = styled.pre`
  background: #2d3748;
  color: #cbd5e0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: 'Fira Code', monospace;
`;

const Text = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 1rem;

  li {
    color: #4a5568;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: '•';
      color: #48bb78;
      position: absolute;
      left: 0;
    }
  }
`;

const getNextWednesday = () => {
  const today = new Date();
  // Add one month
  const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
  // Find the first Wednesday after that
  const daysUntilWednesday = (3 - nextMonth.getDay() + 7) % 7;
  nextMonth.setDate(nextMonth.getDate() + daysUntilWednesday);
  
  return nextMonth.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const APIDocumentation = () => {
  const releaseDate = getNextWednesday();

  return (
    <Container>
      <Header>
        <Title>API Documentation</Title>
        <ComingSoon
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Coming in v3.0 on {releaseDate}
        </ComingSoon>
        <Text>
          Our comprehensive API will enable seamless integration with your existing healthcare systems.
          Here's a preview of what's coming.
        </Text>
      </Header>

      <Section>
        <SectionTitle>Authentication</SectionTitle>
        <Text>
          Secure your API requests using JWT tokens. We support both Bearer token authentication
          and API key methods.
        </Text>
        <CodeBlock>
{`// Example authentication header
Authorization: Bearer your_jwt_token

// Alternative API key method
X-API-Key: your_api_key`}
        </CodeBlock>
      </Section>

      <Section>
        <SectionTitle>Core Endpoints</SectionTitle>
        <List>
          <li>User Management API</li>
          <li>Progress Tracking API</li>
          <li>Analytics API</li>
          <li>Content Management API</li>
          <li>Integration Webhooks</li>
        </List>
        <CodeBlock>
{`// Example endpoint structure
GET /api/v3/users
GET /api/v3/progress/:userId
POST /api/v3/analytics/export
GET /api/v3/content/:programId`}
        </CodeBlock>
      </Section>

      <Section>
        <SectionTitle>Key Features</SectionTitle>
        <List>
          <li>RESTful API design following OpenAPI 3.0 specification</li>
          <li>Real-time WebSocket support for live updates</li>
          <li>Comprehensive error handling and status codes</li>
          <li>Rate limiting with generous quotas</li>
          <li>Detailed analytics and reporting endpoints</li>
          <li>HIPAA and GDPR compliant data handling</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Integration Examples</SectionTitle>
        <Text>
          Our API will include SDKs for popular programming languages and frameworks:
        </Text>
        <List>
          <li>JavaScript/TypeScript</li>
          <li>Python</li>
          <li>Java</li>
          <li>C#/.NET</li>
          <li>Ruby</li>
        </List>
        <CodeBlock>
{`// JavaScript example
import { ThinkableAPI } from '@thinkable/sdk';

const api = new ThinkableAPI({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Fetch user progress
const progress = await api.progress.get(userId);`}
        </CodeBlock>
      </Section>
    </Container>
  );
};

export default APIDocumentation; 