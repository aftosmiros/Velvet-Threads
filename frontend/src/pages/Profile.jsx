import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const [user, setUser] = useState({ _id: '', name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/profile`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleEditClick = () => {
    setFormData({ name: user.name, email: user.email, password: '' });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/profile`,
        {
          userId: user._id,
          name: formData.name,
          email: formData.email,
          password: formData.password, // Если поле пустое, можно на бекенде игнорировать обновление пароля
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        setUser(response.data.user);
        setIsEditing(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white-50">
      <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {!isEditing ? (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                <span className="font-semibold">Name: </span>
                {user.name}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                <span className="font-semibold">Email: </span>
                {user.email}
              </p>
            </div>
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter new password if you want to change it"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;