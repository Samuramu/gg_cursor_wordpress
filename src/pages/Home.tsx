import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { getPosts } from '../api/wordpress';
import Cover from '../components/Cover';
import PHQ4Chart from '../components/PHQ4Chart';
import TherapistTimeChart from '../components/TherapistTimeChart';
import HumanAssistantChart from '../components/HumanAssistantChart';
import StudyExplorer from '../components/StudyExplorer';
import UniversityLogos from '../components/UniversityLogos';
import SupportEcosystem from '../components/SupportEcosystem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import BookDemo from '../components/BookDemo';

// Helper function to decode HTML entities
const decodeHTML = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin: 2rem auto;
  display: block;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PostCard = styled.article`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: #2d3748;
`;

const PostExcerpt = styled.div`
  color: #4a5568;
  font-size: 0.875rem;
  line-height: 1.5;

  p {
    margin: 0;
  }
`;

const StatsSection = styled.section`
  width: 1200px;
  margin: 2rem auto;

  @media (max-width: 1280px) {
    width: calc(100% - 2rem);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  > * {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin: 3rem auto 2rem;
  max-width: 1200px;
  padding: 0 1rem;
`;

const StudySection = styled.section`
  width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  background: white;

  @media (max-width: 1280px) {
    width: calc(100% - 2rem);
  }
`;

// Define an interface for the post object
interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://ggtude.com/wp-json/wp/v2/posts?_embed&per_page=3');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const [isDemoOpen, setIsDemoOpen] = useState(false);

  console.log(posts);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar onDemoOpen={() => setIsDemoOpen(true)} />
      <Cover 
        title="See your patients improve while you spend less time and less effort."
        subtitle="Discover insights, tools, and resources to help you provide the best care possible."
        ctaText="Book demo"
      />
      <UniversityLogos />
      <SupportEcosystem />
      <StatsSection>
        <StatsGrid>
          <PHQ4Chart />
          <TherapistTimeChart />
          <HumanAssistantChart />
        </StatsGrid>
      </StatsSection>
      
      <StudySection>
        <StudyExplorer />
      </StudySection>

      <SectionTitle>Latest Articles</SectionTitle>
      <PostsGrid>
        {posts?.slice(0, 6).map((post: Post) => (
          <PostCard key={post.id}>
            <Link to={`/post/${post.slug}`}>
              <PostImage 
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'} 
                alt={decodeHTML(post.title.rendered)}
              />
              <PostContent>
                <PostTitle>{decodeHTML(post.title.rendered)}</PostTitle>
                <PostExcerpt dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </PostContent>
            </Link>
          </PostCard>
        ))}
      </PostsGrid>
      <BookDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}

export default Home; 