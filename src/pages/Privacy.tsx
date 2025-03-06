import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        // Try to fetch the privacy policy content
        // First, try with the slug 'privacy-policy'
        let response = await fetch('https://ggtude.com/wp-json/wp/v2/pages?slug=privacy-policy');
        
        if (!response.ok) {
          // If that fails, try with the slug 'privacy'
          response = await fetch('https://ggtude.com/wp-json/wp/v2/pages?slug=privacy');
          if (!response.ok) throw new Error('Failed to load privacy policy');
        }
        
        const pages = await response.json();
        if (pages.length > 0) {
          setContent(pages[0].content.rendered);
        } else {
          // If no content is found, use a fallback privacy policy
          setContent(`
            <h2>Privacy Policy</h2>
            <p>Last updated: ${new Date().toLocaleDateString()}</p>
            <p>This Privacy Policy describes how we collect, use, and disclose your personal information when you visit our website.</p>
            
            <h3>Information We Collect</h3>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and other similar contact information that you voluntarily provide to us.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, time spent on pages, and other similar data.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information.</li>
            </ul>
            
            <h3>How We Use Your Information</h3>
            <p>We use the information we collect for various purposes, including:</p>
            <ul>
              <li>To provide and maintain our website</li>
              <li>To notify you about changes to our website</li>
              <li>To allow you to participate in interactive features when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our website</li>
              <li>To monitor the usage of our website</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
            
            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
          `);
        }
      } catch (err) {
        console.error('Error loading privacy policy:', err);
        setError('Failed to load privacy policy. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, [location.pathname]);

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