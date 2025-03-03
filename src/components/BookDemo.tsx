import styled from '@emotion/styled';
import { useState } from 'react';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  padding: 2rem;
  overflow-y: auto;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${fadeIn} 0.4s ease-out;
  margin: auto;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const Logo = styled.img`
  width: 72px;
  height: auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const Button = styled.button`
  background: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #38a169;
    transform: translateY(-2px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #4a5568;
  
  &:hover {
    color: #2d3748;
  }
`;

interface BookDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookDemo = ({ isOpen, onClose }: BookDemoProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const themeUrl = window.wpData?.themeUrl || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update to your calendar link
    const baseUrl = 'https://calendar.app.google/t3LQui1CNZNWd4FP9';
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      description: `Company: ${formData.company}\nRole: ${formData.role}`
    });

    window.open(`${baseUrl}?${params.toString()}`, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClick={onClose}>
      <FormContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <HeaderContainer>
          <Logo src={`${themeUrl}/images/logos/thinkable-logo.png`} alt="Thinkable" />
          <h2 className="text-2xl font-bold">Schedule a Demo</h2>
        </HeaderContainer>
        <p className="text-gray-600 mb-6">
          Learn how GGtude can help your practice thrive.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Work Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Company/Organization"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Your Role"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            required
          />
          <Button type="submit">Schedule Now</Button>
        </form>
      </FormContainer>
    </Modal>
  );
};

export default BookDemo; 