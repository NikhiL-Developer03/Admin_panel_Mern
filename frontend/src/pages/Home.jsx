// src/components/UserForm.js
import React, { useEffect, useState } from 'react';
import apiRequest from '../services/axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const UserForm = () => {
  const [formData, setFormData] = useState( {});
  const [errors, setErrors] = useState({});
  const location=  useLocation()
  const navigate= useNavigate()
  const [queryparams,setQueryparams] =  useSearchParams()
const id = queryparams.get("userId") || null
console.log(id)
  // Handler for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.mobileNo || !/^\d{10}$/.test(formData.mobileNo)) newErrors.mobileNo = "Invalid mobile number";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    formData.role="User"
    e.preventDefault();
    if (validate()) {
    try {
      let response
     if(id){
       response = await apiRequest("PUT",`/user/${id}`,formData)
     }else{
      response = await apiRequest("POST","/signin",formData)
     }
      if(response?.success==true){
        navigate("/employee")
      }
      console.log("response",response)
    } catch (error) {
      console.log(error)
    }
    }
  };

const callApi =  async(id)=>{
  try {
    const res =  await apiRequest("GET",`/user/${id}`)
    console.log("res is",res?.data)
    let data  = res?.data
    if(res?.success==true){
      setFormData({
        name:data?.name,
        course:data?.course,
        designation:data?.designation,
        email:data?.email,
        imageUrl:data?.imageUrl
        ,
        mobileNo:data?.mobileNo,
        gender:data?.gender
      })
    }
  } catch (error) {
    console.log(error)
  }
}



useEffect(()=>{
    if(id!=null){
   callApi(id)
    }else{
      setFormData({})
    }
},[id,location])



  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label className="block text-gray-700">Mobile Number</label>
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo}</p>}
      </div>

      {/* Designation */}
      <div className="mb-4">
        <label className="block text-gray-700">Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <select
          name="gender"
          value={formData.gender || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Course */}
      <div className="mb-4">
        <label className="block text-gray-700">Course</label>
        <input
          type="text"
          name="course"
          value={formData.course || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      {/* Profile Image URL */}
      <div className="mb-4">
        <label className="block text-gray-700">Profile Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

   

      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
