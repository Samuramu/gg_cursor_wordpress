import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #2d3748;
  color: #fff;
  padding: 3rem 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.75rem;
  }

  a {
    color: #cbd5e0;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 1rem;

    &:hover {
      color: #fff;
    }
  }
`;

const EmailLink = styled.a`
  color: #cbd5e0;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const CompanyInfo = styled.div`
  color: #cbd5e0;
  font-size: 0.875rem;
  line-height: 1.6;

  p {
    margin-bottom: 1rem;
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #4a5568;
  text-align: center;
  color: #cbd5e0;
  font-size: 0.875rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Quick Links</h3>
          <LinkList>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/solutions">Our Solutions</Link></li>
            <li><Link to="/science">Research</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </LinkList>
        </FooterSection>

        <FooterSection>
          <h3>Solutions</h3>
          <LinkList>
            <li><Link to="/solutions#organizations">For Mental Health</Link></li>
            <li><Link to="/solutions#payers">For Payers</Link></li>
            <li><Link to="/solutions#clinics">For Clinics</Link></li>
          </LinkList>
        </FooterSection>

        <FooterSection>
          <h3>Resources</h3>
          <LinkList>
            <li><Link to="/science">Research Papers</Link></li>
            <li><Link to="/webinars">Webinars</Link></li>
            <li><Link to="/documentation">API documentation</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/support">Support</Link></li>
          </LinkList>
        </FooterSection>

        <FooterSection>
          <h3>Contact</h3>
          <CompanyInfo>
            <p>GGtude Ltd.</p>
            <p>Email: <EmailLink href="mailto:hello@ggtude.com">hello@ggtude.com</EmailLink></p>
            <p>Book a demo to learn more about our solutions and how we can help you improve patient outcomes.</p>
            <Link to="/book-demo" style={{ color: '#4299e1', textDecoration: 'none' }}>
              Book a Demo →
            </Link>
          </CompanyInfo>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <p>© {new Date().getFullYear()} GGtude Ltd. All rights reserved.</p>
      </BottomBar>
    </FooterContainer>
  );
}

export default Footer; 