// components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/users');
        if (!response.ok) {
          if (response.status === 404) {
            setError('No users found.');
          } else {
            setError('Failed to fetch users. Please try again later.');
          }
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>
                {user.name} - {user.username} - {user.email}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
