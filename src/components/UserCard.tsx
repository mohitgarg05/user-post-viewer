import { Link } from "react-router-dom"
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }
  
  interface UserCardProps {
    user: User;
  }
const UserCard: React.FC<UserCardProps> = ({user}) => {

    const userImageArray: string[] = [
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
    ]
    const randomIndex: number = Math.floor(Math.random() * userImageArray.length);

    return(

            <li key={user.id} className="user-item">
              <Link to={`/user/${user.id}`} className="user-link">
                <div className="user-details">
                <img alt="user_image" src={userImageArray[randomIndex]} />
                  <div className="name_username">
                    <p className="user-name">{user.name}</p>
                    <p className="user-username">{user.username}</p>
                  </div>
                  <p className="user-email">{user.email}</p>
                  <div className="view_button">
                    <button>View Posts</button>
                  </div>
                </div>
              </Link>
            </li>

    )

}


export default UserCard