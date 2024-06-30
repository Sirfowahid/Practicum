// AdminUsers.tsx

import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Pagination from '../../components/ui/Pagination';
import { usersData,User } from '../../data/userData';

const AdminUsers: React.FC = () => {
  const navigate = useNavigate(); // Use useNavigate hook to access navigation functionality
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5); // Number of users to display per page
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // State for filtered users

  // Use effect to set filtered users initially
  useEffect(() => {
    setFilteredUsers(usersData);
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterUsers(term);
    setCurrentPage(1); // Reset current page to 1 when search term changes
  };

  // Function to filter users based on search term
  const filterUsers = (term: string) => {
    if (!term.trim()) {
      setFilteredUsers(usersData); // If search term is empty, reset filtered users
      return;
    }

    const filtered = usersData.filter((user) =>
      user.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Pagination logic: Calculate current users to display based on current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle page change
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to navigate to user profile page
  const viewUserProfile = (userId: number) => {
    navigate(`/admin/users/userprofile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Admin Users</h2>
        
      </header>

      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg">
        <div className="flex items-center px-6 pb-6">
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md px-3 py-2 w-full mr-2"
          />
          <FaSearch className="text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => viewUserProfile(user.id)}
                    >
                      <FaUser className="inline-block mr-1" /> View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
