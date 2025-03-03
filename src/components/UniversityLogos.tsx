import styled from '@emotion/styled';

const LogoSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    margin: 2rem auto;
    padding: 1rem;
  }
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const Logo = styled.img`
  max-width: 150px;
  height: auto;
  opacity: 0.7;
  transition: opacity 0.3s;
  filter: grayscale(100%);

  @media (max-width: 768px) {
    max-width: 120px;
  }

  &:hover {
    opacity: 1;
    filter: none;
  }
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const UniversityLogos = () => {
  const themeUrl = window.wpData?.themeUrl || '';
  
  return (
    <LogoSection>
      <SectionTitle>Trusted by Leading Partners</SectionTitle>
      <LogoGrid>
        <Logo src={`${themeUrl}/images/logos/washington.png`} alt="University of Washington" />
        <Logo src={`${themeUrl}/images/logos/meta.png`} alt="Meta Inc" />
        <Logo src={`${themeUrl}/images/logos/deloitte.png`} alt="Deloitte" />
        <Logo src={`${themeUrl}/images/logos/padova.png`} alt="University of Padova" />
        <Logo src={`${themeUrl}/images/logos/valencia.png`} alt="University of Valencia" />
        <Logo src={`${themeUrl}/images/logos/reichman.png`} alt="Reichman University" />
      </LogoGrid>
    </LogoSection>
  );
};

export default UniversityLogos; 