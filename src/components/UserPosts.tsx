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
  const [Liked, setLiked] = useState<{ [key: number]: boolean } >({});
  const [PostComments, setPostComments] = useState<number>(1);


  // Getting liked post
  useEffect(()=>{
    const fav: string | null = localStorage.getItem("Favorites");
    const favParse: { [key: number]: boolean }  = fav ? JSON.parse(fav) : null;
    setLiked(favParse);

  },[])
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

        setLoading(false);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
  }, [userId]);



  if(loading){
    return(
      <div className='spinned_wrapper'>
         <p className='loading-spinner'></p>
      </div>
    )
  }


  // Storing liked post
  const handleLiked = async (id: number) => {
    setLiked((prevLiked : any) => {
      const newLiked : { [key: number]: boolean } = {
        ...prevLiked,
        [id]: true
      };
      // Save to localStorage
      localStorage.setItem("Favorites", JSON.stringify(newLiked));
      return newLiked;
    });
  };

  // Storing unliked post
  const handleUnlikedLiked = (id : number)=>{
    setLiked((prevLiked : any) => {
      const newLiked : { [key: number]: boolean } = {
        ...prevLiked,
        [id]: false
      };
      // Save to localStorage
      localStorage.setItem("Favorites", JSON.stringify(newLiked));
      return newLiked;
    });
  }

  return (
     <div className="user-list-container post_container" >
     {error ? (
       <p className="error-message">{error}</p>
     ) : (
       <div className='user_card_container' >
        <h2>Your Posts</h2>
         <ul className="user-list">
           {posts?.map((post) => {

            return(
              <li key={post.id} className="user-item post-item"  >
              <div className="user-link post_links">
                <div className="user-details user_post">
                 <div>
                  <p className="user-name">{post.title}</p>
                  <p className="user-email" style={{marginTop:"3px"}}>{post.body}</p>
                 </div>
                  <div className='post_comment' >
                 
                 {
                  Liked && Liked[post.id]?
                    <svg  onClick={()=>handleUnlikedLiked(post.id)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>:
                      <svg onClick={()=>handleLiked(post.id)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>

                 }
                
                  <svg onClick={()=>{
                    setOpenModal(true)
                    setPostComments(post.id)
                    }} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
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
