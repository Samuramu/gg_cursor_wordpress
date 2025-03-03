import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const Content = styled.div`
  color: #4a5568;
  line-height: 1.8;

  h2, h3, h4 {
    color: #2d3748;
    margin: 2rem 0 1rem;
  }

  h2 { font-size: 1.8rem; }
  h3 { font-size: 1.4rem; }
  h4 { font-size: 1.2rem; }

  p { margin-bottom: 1rem; }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li { margin-bottom: 0.5rem; }

  a {
    color: #4299e1;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

const Privacy = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch('https://ggtude.com/wp-json/wp/v2/pages?slug=privacy-policy');
        if (!response.ok) throw new Error('Failed to load privacy policy');
        
        const pages = await response.json();
        if (pages.length > 0) {
          setContent(pages[0].content.rendered);
        } else {
          throw new Error('Privacy policy not found');
        }
      } catch (err) {
        console.error('Error loading privacy policy:', err);
        setError('Failed to load privacy policy. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Title>Privacy Policy</Title>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

export default Privacy; 