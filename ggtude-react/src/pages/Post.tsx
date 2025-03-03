import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/wordpress';

function Post() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPost(slug!)
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <article>
      <h1>{post?.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.content.rendered || '' }} />
    </article>
  );
}

export default Post; 