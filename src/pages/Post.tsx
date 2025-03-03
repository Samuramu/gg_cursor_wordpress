import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { getPost } from '../api/wordpress';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import Footer from '../components/Footer';
import BookDemo from '../components/BookDemo';

// Helper function to decode HTML entities
const decodeHTML = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  line-height: 1.2;
`;

const PostContent = styled.div`
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    color: #2d3748;
    margin: 2rem 0 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin: 1.5rem 0 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
    border-radius: 8px;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #4299e1;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 4px solid #4299e1;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #718096;
  }

  pre {
    background: #f7fafc;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  code {
    background: #f7fafc;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  th, td {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background: #f7fafc;
  }
`;

const PostBody = styled.div`
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    color: #2d3748;
    margin: 2rem 0 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin: 1.5rem 0 1rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #4299e1;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

function Post() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPost(slug!)
  });
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <>
      <Navbar onDemoOpen={() => setIsDemoOpen(true)} />
      <PostContainer>
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <FeaturedImage 
            src={post._embedded['wp:featuredmedia'][0].source_url} 
            alt={decodeHTML(post.title.rendered)}
          />
        )}
        <PostContent>
          <PostTitle>{decodeHTML(post.title.rendered)}</PostTitle>
          <PostBody dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </PostContent>
      </PostContainer>
      <Footer />
      <BookDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}

export default Post; 