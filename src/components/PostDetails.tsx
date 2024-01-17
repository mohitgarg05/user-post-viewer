// components/PostDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/${postId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Post not found.');
          } else {
            setError('Failed to fetch post details. Please try again later.');
          }
          return;
        }

        const data = await response.json();
        setPost(data.post);
        setComments(data.comments);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setError('Failed to fetch post details. Please try again later.');
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      {error ? (
        <p>
          {error} <Link to={`/user/${post?.id}`}>Go back to User Posts</Link>
        </p>
      ) : (
        <div>
          {post ? (
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ) : (
            <p>Loading post details...</p>
          )}

          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>
                  <strong>{comment.name}</strong> - {comment.email}
                </p>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>

          <Link to={`/user/${post?.id}`}>Back to User Posts</Link>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
