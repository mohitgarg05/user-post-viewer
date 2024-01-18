interface Comment{
    body : string 
    email: string
    id : number
    name: string
    postId : number
  }
  interface PostCommentProps {
    comments : Comment[],
    setOpenModal : any
  }

const PostCommentModel: React.FC<PostCommentProps> = ({comments,setOpenModal}) => {
    return(
        <div className="modal_container">
            <div className="modal_wrapper">
                <div className="cross_svg">
                    <svg onClick={()=>setOpenModal(false)} fill="#000000" height="8px" width="8px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  
                        viewBox="0 0 490 490">
                        <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
                        489.292,457.678 277.331,245.004 489.292,32.337 "/>
                    </svg>
                </div>
                <h3>Comments</h3>
                <div className="modal_comment_wrapper">
                    {
                        comments.map((comment)=>(
                           <div className="comment_wrapper">
                                <div className="comment_img_name">
                                <img alt="user_image" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" />
                                    <p className="user-name">{comment.email}</p>
                                </div>
                                <p  className="user-email">{comment.body}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostCommentModel