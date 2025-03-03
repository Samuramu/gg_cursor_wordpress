import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/wordpress';

function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Latest Posts</h1>
      {posts?.map(post => (
        <article key={post.id}>
          <h2>
            <Link to={`/post/${post.slug}`}>
              {post.title.rendered}
            </Link>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </article>
      ))}
    </div>
  );
}

export default Home; 