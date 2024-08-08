import React, { useState, useEffect } from "react";
import { FaUser, FaSearch, FaUserEdit } from "react-icons/fa";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { data, isLoading, isError } = useGetUsersQuery<UsersData>();

  // Search state for each column
  const [searchName, setSearchName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchRole, setSearchRole] = useState<string>("");
  const [searchMobileNo, setSearchMobileNo] = useState<string>("");
  const [searchNid, setSearchNid] = useState<string>("");
  const [searchDob, setSearchDob] = useState<string>("");

  useEffect(() => {
    if (data && data.users) {
      setFilteredUsers(data.users);
    }
  }, [data]);

  const handleSearchChange = () => {
    filterUsers();
    setCurrentPage(1);
  };

  const filterUsers = () => {
    let filtered = data?.users || [];

    if (searchName.trim()) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchEmail.trim()) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }
    if (searchRole.trim()) {
      const role = searchRole.toLowerCase() === "admin" ? true : false;
      filtered = filtered.filter((user) => user.isAdmin === role);
    }
    if (searchMobileNo.trim()) {
      filtered = filtered.filter((user) =>
        user.mobileNo.toLowerCase().includes(searchMobileNo.toLowerCase())
      );
    }
    if (searchNid.trim()) {
      filtered = filtered.filter((user) =>
        user.nid.toLowerCase().includes(searchNid.toLowerCase())
      );
    }
    if (searchDob.trim()) {
      filtered = filtered.filter((user) =>
        new Date(user.dob).toLocaleDateString().includes(searchDob)
      );
    }

    setFilteredUsers(filtered);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const viewUserProfile = (userId: string) => {
    navigate(`/admin/users/userprofile/${userId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Users</h1>
          <h1 onClick={()=>navigate('/admin/users/adduser')} className="text-xl font-bold px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded">
            Add Users
          </h1>
        </header>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  Mobile No
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  NID
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  Date of Birth
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 border-b">
                  <input
                    type="text"
                    placeholder="Search Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyUp={handleSearchChange}
                    className="w-full p-2 border rounded"
                  />
                </th>
                <th className="py-2 px-4 border-b">
                  <input
                    type="text"
                    placeholder="Search Email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    onKeyUp={handleSearchChange}
                    className="w-full p-2 border rounded"
                  />
                </th>
                <th className="py-2 px-4 border-b">
                  <input
                    type="text"
                    placeholder="Search Role"
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    onKeyUp={handleSearchChange}
                    className="w-full p-2 border rounded"
                  />
                </th>
                <th className="py-2 px-4 border-b">
                  <input
                    type="text"
                    placeholder="Search Mobile"
                    value={searchMobileNo}
                    onChange={(e) => setSearchMobileNo(e.target.value)}
                    onKeyUp={handleSearchChange}
                    className="w-full p-2 border rounded"
                  />
                </th>
                <th className="py-2 px-4 border-b">
                  <input
                    type="text"
                    placeholder="Search NID"
                    value={searchNid}
                    onChange={(e) => setSearchNid(e.target.value)}
                    onKeyUp={handleSearchChange}
                    className="w-full p-2 border rounded"
                  />
                </th>
                <th className="py-2 px-4 border-b">
                  <input
                    type="text"
                    placeholder="Search DOB"
                    value={searchDob}
                    onChange={(e) => setSearchDob(e.target.value)}
                    onKeyUp={handleSearchChange}
                    className="w-full p-2 border rounded"
                  />
                </th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 border-b">{user.mobileNo}</td>
                  <td className="py-2 px-4 border-b">{user.nid}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(user.dob).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-sm text-gray-500">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      onClick={() => viewUserProfile(user._id)}
                    >
                      <FaUser className="inline-block mr-1" /> View
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900"
                      onClick={() =>
                        navigate(`/admin/users/updateuser/${user._id}`)
                      }
                    >
                      <FaUserEdit className="inline-block mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
