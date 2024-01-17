// components/UserPosts.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const UserPosts: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('No posts found for this user.');
          } else {
            setError('Failed to fetch posts. Please try again later.');
          }
          return;
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      <h2>User Posts</h2>
      {error ? (
        <p>
          {error} <Link to="/users">Go back to User List</Link>
        </p>
      ) : (
        <div>
          <Link to="/users">Back to User List</Link>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                  {post.title} - {post.body.substring(0, 50)}...
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
