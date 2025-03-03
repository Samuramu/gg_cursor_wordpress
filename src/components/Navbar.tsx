import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;

  @media (max-width: 768px) {
    height: 32px;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background: ${props => props.isOpen ? 'transparent' : '#2d3748'};
  position: relative;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: #2d3748;
    transition: all 0.3s ease;
  }

  &::before {
    transform: translateY(${props => props.isOpen ? '0' : '-6px'}) 
               rotate(${props => props.isOpen ? '45deg' : '0'});
  }

  &::after {
    transform: translateY(${props => props.isOpen ? '0' : '6px'}) 
               rotate(${props => props.isOpen ? '-45deg' : '0'});
  }
`;

const NavLink = styled(Link)`
  color: #2d3748;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: rgba(66, 153, 225, 0.1);
    color: #4299e1;
  }
`;

const DemoButton = styled.a`
  background: #48bb78;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.2);
    background: #38a169;
  }
`;

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Science', path: '/science' }
];

const Navbar = ({ onDemoOpen }: { onDemoOpen: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeUrl = window.wpData?.themeUrl || '';

  return (
    <Nav>
      <NavContainer>
        <Link to="/">
          <Logo src={`${themeUrl}/images/logo.png`} alt="GGtude" />
        </Link>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon isOpen={isMenuOpen} />
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          {navItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <DemoButton 
            href="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              onDemoOpen();
              setIsMenuOpen(false);
            }}
          >
            Book Demo
          </DemoButton>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 