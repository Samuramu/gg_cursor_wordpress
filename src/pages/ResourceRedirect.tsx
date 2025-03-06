import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResourceRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the corresponding post URL
    if (slug) {
      navigate(`/post/${slug}`, { replace: true });
    } else {
      // If no slug is provided, redirect to home
      navigate('/', { replace: true });
    }
  }, [slug, navigate]);

  // Return a loading state while redirecting
  return <div>Redirecting...</div>;
};

export default ResourceRedirect; 