import React, { useEffect, useState } from 'react';
import apiRequest from '../services/axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
 
  const navigate = useNavigate();


  const fetchEmployees = async () => {
    try {
      const response = await apiRequest("GET", `user-list?page=${currentPage}&limit=10&name=${searchTerm}`);
      setEmployees(response);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage,searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };



  const handleDelete = async (id) => {
    try {
      await apiRequest("DELETE", `user/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/?userId=${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/3"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th onClick={() => handleSort('id')} className="p-2 cursor-pointer">Unique ID</th>
              <th className="p-2">Image</th>
              <th onClick={() => handleSort('name')} className="p-2 cursor-pointer">Name</th>
              <th onClick={() => handleSort('email')} className="p-2 cursor-pointer">Email</th>
              <th onClick={() => handleSort('mobileNo')} className="p-2 cursor-pointer">Mobile No</th>
              <th onClick={() => handleSort('designation')} className="p-2 cursor-pointer">Designation</th>
              <th onClick={() => handleSort('gender')} className="p-2 cursor-pointer">Gender</th>
              <th onClick={() => handleSort('course')} className="p-2 cursor-pointer">Course</th>
              <th onClick={() => handleSort('createdAt')} className="p-2 cursor-pointer">Create Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees?.data?.map(employee => (
              <tr key={employee._id} className="hover:bg-gray-100">
                <td className="p-2">{employee._id}</td>
                <td className="p-2">
                  <img src={employee.image} alt={employee.name} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="p-2">{employee.name}</td>
                <td className="p-2">{employee.email}</td>
                <td className="p-2">{employee.mobileNo}</td>
                <td className="p-2">{employee.designation}</td>
                <td className="p-2">{employee.gender}</td>
                <td className="p-2">{employee.course}</td>
                <td className="p-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(employee._id)} className="text-blue-500">Edit</button>
                  <button onClick={() => handleDelete(employee._id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: employees?.pagination?.totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
