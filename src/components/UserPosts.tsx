// components/UserPosts.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCommentModel from './PostCommentModel';

interface Comment{
  body : string 
  email: string
  id : number
  name: string
  postId : number
}
interface Post {
  id: number;
  title: string;
  body: string;
  commentCount : Comment[]
}

const UserPosts: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const [PostComments, setPostComments] = useState<Comment[]>([]);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
          // call API to fetch the posts
        const response = await fetch(`http://localhost:4000/posts/${userId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            // If not found
            setError('No posts found for this user.');
          } else {
            // In case of internal server error
            setError('Failed to fetch posts. Please try again later.');
          }
          setLoading(false)
          return;
        }

        const data = await response.json();
        
        const postsWithComments = await Promise.all(
          data.map(async (post : any) => {
            const commentCount = await fetchCommentsCount(post.id);
            return { ...post, commentCount };
          })
        );
        setLoading(false)
        setPosts(postsWithComments);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
  }, [userId]);
  const fetchCommentsCount = async (postId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/comment/post/${postId}`);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching comments:', error);
      return 0;
    }
  };

  if(loading){
    return(
      <div className='spinned_wrapper'>
         <p className='loading-spinner'></p>
      </div>
    )
  }

  return (
     <div className="user-list-container post_container" >
     {error ? (
       <p className="error-message">{error}</p>
     ) : (
       <div className='user_card_container'>
        <h2>Your Posts</h2>
         <ul className="user-list">
           {posts?.map((post) => {

            return(
              <li key={post.id} className="user-item"  >
              <div className="user-link">
                <div className="user-details user_post">
                 <div>
                  <p className="user-name">{post.title}</p>
                  <p className="user-email" style={{marginTop:"3px"}}>{post.body}</p>
                 </div>
                  <div className='post_comment' onClick={()=>{
                    setOpenModal(true)
                    setPostComments(post?.commentCount)
                    }} >
                 
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                  </svg>
                  </div>
                </div>
              </div>
            </li>
            )
           })}
         </ul>
        </div>
     )}

     {
      OpenModal && <PostCommentModel comments = {PostComments} setOpenModal={setOpenModal} />
     }
   </div>
  );
};

export default UserPosts;
