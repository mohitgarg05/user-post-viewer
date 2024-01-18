// components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TotalPages, setTotalPages] = useState<number>(1);

  const fetchUsers = async (page: number) => {
    try {
        // call API to fetch the posts
        setLoading(true)
      const response = await fetch(`http://localhost:4000/users?page=${page}`);
      if (!response.ok) {
        if (response.status === 404) {
          // If not found
          setError('No users found.');
        } else {
          // In case of internal server error
          setError('Failed to fetch users. Please try again later.');
        }
        setLoading(false)
        return;
      }

      const { users, totalPages } = await response.json();
      setUsers(users);
      setTotalPages(totalPages);
      setLoading(false)

    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    }
  };



  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= TotalPages) {
      setCurrentPage(newPage);
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
    <div className="user-list-container">
    {error ? (
      <p className="error-message">{error}</p>
    ) : (
      <>
      <div className='user_card_container'>
        <ul className="user-list">
          {users?.map((user) => (
            <UserCard user={user} />
          ))}
        </ul>
         
      </div>
       <div className="pagination">
       <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
        <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
      </svg>
       </button>
       <span>{currentPage}</span>
       <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === TotalPages}>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
        <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
      </svg>
        </button>
     </div></>
    )}
  </div>
  );
};

export default UserList;
