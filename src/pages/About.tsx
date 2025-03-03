import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Hero = styled.div`
  text-align: center;
  margin: 4rem 0;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #2d3748;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin: 6rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
`;

const ValueDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  text-align: center;
`;

const Story = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;

  p {
    margin-bottom: 1.5rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
`;

const TeamMemberImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
`;

const TeamMemberName = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const TeamMemberRole = styled.p`
  color: #48bb78;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const TeamMemberBio = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const About = () => {
  return (
    <Container>
      <Hero>
        <Title>About GGtude</Title>
        <Subtitle>
          Transforming mental health care through innovative digital solutions
          that empower both practitioners and patients.
        </Subtitle>
      </Hero>

      <Section>
        <Story>
          <p>
            Founded in 2019, GGtude emerged from a simple yet powerful idea:
            making evidence-based mental health interventions more accessible and
            engaging through technology.
          </p>
          <p>
            Our journey began with extensive research in cognitive bias
            modification and has evolved into a comprehensive suite of digital
            mental health solutions. Today, we're proud to serve healthcare
            providers, organizations, and patients worldwide with our innovative
            platform.
          </p>
          <p>
            Through continuous research and development, we've demonstrated that
            digital interventions can significantly improve mental health outcomes
            while reducing the burden on healthcare providers.
          </p>
        </Story>
      </Section>

      <Section>
        <SectionTitle>Our Values</SectionTitle>
        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ValueIcon>🔬</ValueIcon>
            <ValueTitle>Evidence-Based Innovation</ValueTitle>
            <ValueDescription>
              We combine cutting-edge technology with proven therapeutic approaches,
              ensuring our solutions are both innovative and effective.
            </ValueDescription>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ValueIcon>🤝</ValueIcon>
            <ValueTitle>Patient-Centered Care</ValueTitle>
            <ValueDescription>
              Every feature and intervention is designed with the patient's
              experience and well-being in mind.
            </ValueDescription>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ValueIcon>🔒</ValueIcon>
            <ValueTitle>Trust & Security</ValueTitle>
            <ValueDescription>
              We maintain the highest standards of data privacy and security,
              ensuring our platform is a trusted partner in healthcare delivery.
            </ValueDescription>
          </Card>
        </Grid>
      </Section>
    </Container>
  );
};

export default About; 