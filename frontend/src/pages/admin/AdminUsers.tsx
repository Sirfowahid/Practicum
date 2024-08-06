import React, { useState, useEffect } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/ui/Pagination";
import { useGetUsersQuery } from "../../slices/usersApiSlice";

// Define TypeScript interfaces for data
interface User {
  _id: string; // Assuming the unique identifier is _id
  name: string;
  email: string;
  isAdmin: boolean;
  mobileNo: string;
  nid: string;
  dob: string;
}

interface UsersData {
  users: User[];
}

const AdminUsers: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { data, isLoading, isError } = useGetUsersQuery<UsersData>();

  useEffect(() => {
    if (data && data.users) {
      setFilteredUsers(data.users);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterUsers(term);
    setCurrentPage(1);
  };

  const filterUsers = (term: string) => {
    if (!term.trim()) {
      setFilteredUsers(data ? data.users : []);
      return;
    }

    const filtered = data?.users.filter((user: User) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered || []);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const viewUserProfile = (userId: number) => {
    navigate(`/admin/users/userprofile/${userId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Admin Users</h2>
        </header>
        <div className="flex items-center px-6 pb-6">
          <input
            type="text"
            placeholder="Search by name"
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.mobileNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.dob).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => viewUserProfile(user._id)}
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
