// Employee.js
import React, { useState } from 'react';

const Employee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'course') {
      const updatedCourses = formData.course.includes(value)
        ? formData.course.filter((course) => course !== value)
        : [...formData.course, value];
      setFormData({ ...formData, course: updatedCourses });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobile) newErrors.mobile = 'Mobile No is required';
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile No must be 10 digits';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.course.length === 0) newErrors.course = 'At least one course must be selected';
    if (!formData.image) newErrors.image = 'Image upload is required';
    if (formData.image && !/\.(jpg|jpeg|png)$/i.test(formData.image.name)) {
      newErrors.image = 'Only jpg/png files are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email) => {
    // Simulate an API call to check if the email already exists
    const existingEmails = ['test@example.com', 'user@example.com']; // Mock existing emails
    return existingEmails.includes(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Check for duplicate email
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setEmailExists(true);
        return;
      } else {
        setEmailExists(false);
      }

      // Prepare form data for submission
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Example of sending data to the server
      try {
        const response = await fetch('/api/employees', {
          method: 'POST',
          body: formDataToSend,
        });
        if (response.ok) {
          alert('Employee added successfully!');
          setFormData({
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            course: [],
            image: null,
          });
        } else {
          alert('Failed to add employee');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* Email Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            {emailExists && <p className="text-red-500 text-xs">Email already exists</p>}
          </div>

          {/* Mobile No Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile No</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
          </div>

          {/* Designation Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.designation && <p className="text-red-500 text-xs">{errors.designation}</p>}
          </div>

          {/* Gender Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={formData.gender === 'M'}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={formData.gender === 'F'}
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
          </div>

          {/* Course Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <div className="flex flex-col">
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={formData.course.includes('MCA')}
                  onChange={handleChange}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={formData.course.includes('BCA')}
                  onChange={handleChange}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={formData.course.includes('BSC')}
                  onChange={handleChange}
                />
                BSC
              </label>
            </div>
            {errors.course && <p className="text-red-500 text-xs">{errors.course}</p>}
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Upload</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-te al-500"
            />
            {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-teal-500 rounded-md shadow hover:bg-teal-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employee;