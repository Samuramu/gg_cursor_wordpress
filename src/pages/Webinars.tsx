import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Cover = styled.div`
  position: relative;
  height: 400px;
  background: linear-gradient(rgba(45, 55, 72, 0.9), rgba(45, 55, 72, 0.9)),
    url(${() => `${window.wpData?.themeUrl}/images/webinar-cover.jpg`}) center/cover;
  border-radius: 1rem;
  overflow: hidden;
  margin: 6rem 2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  color: white;

  @media (max-width: 768px) {
    height: auto;
    min-height: 300px;
    margin: 5rem 1rem 3rem;
  }
`;

const CoverContent = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NextWebinar = styled.div`
  font-size: 1.2rem;
  color: #48bb78;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #cbd5e0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-top: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ContentSection = styled.div``;

const RegistrationForm = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #48bb78;
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #38a169;
    transform: translateY(-2px);
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #4a5568;
`;

const FeatureIcon = styled.span`
  margin-right: 1rem;
  color: #48bb78;
  font-size: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const getNextThursday = () => {
  const today = new Date();
  let daysUntilThursday = (4 - today.getDay() + 7) % 7;
  
  // If it's less than 7 days away, add another week
  if (daysUntilThursday < 7) {
    daysUntilThursday += 7;
  }
  
  const nextThursday = new Date(today);
  nextThursday.setDate(today.getDate() + daysUntilThursday);
  return nextThursday;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const Webinars = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: ''
  });

  const nextWebinarDate = getNextThursday();
  const formattedDate = formatDate(nextWebinarDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the email body with registration details
    const emailSubject = encodeURIComponent(`New Webinar Registration - ${formData.name}`);
    const emailBody = encodeURIComponent(
      `New webinar registration details:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Organization: ${formData.organization}\n` +
      `Role: ${formData.role}\n\n` +
      `Webinar Date: ${formattedDate}`
    );

    // Open mailto link
    window.location.href = `mailto:gur@ggtude.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Show confirmation to user
    alert('Thank you for registering! You will receive a confirmation email shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Cover>
        <CoverContent>
          <NextWebinar>Next Webinar: {formattedDate}</NextWebinar>
          <Title>How Thinkable Can Power Your Clinic</Title>
          <Description>
            Join us for an in-depth look at how Thinkable's digital mental health
            platform can transform your clinical practice, improve patient outcomes,
            and streamline your workflow.
          </Description>
        </CoverContent>
      </Cover>

      <Container>
        <Grid>
          <ContentSection>
            <SectionTitle>What You'll Learn</SectionTitle>
            <FeatureList>
              <FeatureItem>
                <FeatureIcon>✨</FeatureIcon>
                How to leverage digital interventions to enhance traditional therapy
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>📊</FeatureIcon>
                Real-time progress tracking and outcome measurement
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>💰</FeatureIcon>
                Maximizing revenue through efficient patient care
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>🤝</FeatureIcon>
                Building stronger therapeutic relationships with digital support
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>📱</FeatureIcon>
                Hands-on demonstration of the Thinkable platform
              </FeatureItem>
            </FeatureList>

            <SectionTitle>Who Should Attend?</SectionTitle>
            <FeatureList>
              <FeatureItem>
                <FeatureIcon>👩‍⚕️</FeatureIcon>
                Mental Health Practitioners
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>🏥</FeatureIcon>
                Clinic Owners and Administrators
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>👥</FeatureIcon>
                Practice Managers
              </FeatureItem>
            </FeatureList>
          </ContentSection>

          <RegistrationForm
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>Reserve Your Spot</SectionTitle>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="role"
                placeholder="Your Role"
                value={formData.role}
                onChange={handleChange}
                required
              />
              <Button type="submit">Register Now</Button>
            </form>
          </RegistrationForm>
        </Grid>
      </Container>
    </>
  );
};

export default Webinars; 