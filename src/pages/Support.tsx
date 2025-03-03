import { useState } from 'react';
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

const Description = styled.p`
  color: #4a5568;
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const CheckboxGroup = styled.div`
  margin: 1rem 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  input {
    margin-right: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #38a169;
  }
`;

const Required = styled.span`
  color: #e53e3e;
  margin-left: 0.25rem;
`;

interface FormData {
  userId: string;
  name: string;
  email: string;
  helpType: string;
  product: string;
  device: string[];
  message: string;
  comment: string;
}

const Support = () => {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    name: '',
    email: '',
    helpType: 'General questions',
    product: '',
    device: [],
    message: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      device: checked 
        ? [...prev.device, value]
        : prev.device.filter(device => device !== value)
    }));
  };

  return (
    <Container>
      <Title>Support</Title>
      <Description>
        If you have questions, this is the right place. Please fill in the details and we'll do our best to get back to you as soon as we can.
      </Description>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="userId">User ID</Label>
          <Input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="name">Name <Required>*</Required></Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email <Required>*</Required></Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="helpType">What do you seek help with? <Required>*</Required></Label>
          <Select
            id="helpType"
            name="helpType"
            required
            value={formData.helpType}
            onChange={handleInputChange}
          >
            <option value="General questions">General questions</option>
            <option value="Technical support">Technical support</option>
            <option value="Billing">Billing</option>
            <option value="Other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="product">What product do you need help with? <Required>*</Required></Label>
          <Select
            id="product"
            name="product"
            required
            value={formData.product}
            onChange={handleInputChange}
          >
            <option value="">Select app</option>
            <option value="app1">App 1</option>
            <option value="app2">App 2</option>
            <option value="app3">App 3</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Your device</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="device"
                value="iPhone / iPad"
                checked={formData.device.includes('iPhone / iPad')}
                onChange={handleCheckboxChange}
              />
              iPhone / iPad
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="device"
                value="Android"
                checked={formData.device.includes('Android')}
                onChange={handleCheckboxChange}
              />
              Android
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="device"
                value="Other"
                checked={formData.device.includes('Other')}
                onChange={handleCheckboxChange}
              />
              Other
            </CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Your message in detail <Required>*</Required></Label>
          <TextArea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comment">Comment</Label>
          <Input
            type="text"
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </FormGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default Support; 