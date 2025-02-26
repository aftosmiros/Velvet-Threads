import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  useEffect(() => {
    console.log(token);
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [currentState, setCurrentState] = useState('Sign Up');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('User registered successfully');
          navigate('/');
        } else {
          console.log(response.data);
          const errorMessage =
            error.response && error.response.data
              ? // Если сервер отправляет поле msg:
              error.response.data.msg ||
              // Или если отправляется массив ошибок, берем первую:
              (error.response.data.errors && error.response.data.errors[0].msg) ||
              "An error occurred"
              : error.message;
          toast.error(errorMessage);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Logged in successfully');
          navigate('/');
        } else {
          console.log(response.data);
          const errorMessage =
            error.response && error.response.data
              ? // Если сервер отправляет поле msg:
              error.response.data.msg ||
              // Или если отправляется массив ошибок, берем первую:
              (error.response.data.errors && error.response.data.errors[0].msg) ||
              "An error occurred"
              : error.message;
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data
          ? // Если сервер отправляет поле msg:
          error.response.data.msg ||
          // Или если отправляется массив ошибок, берем первую:
          (error.response.data.errors && error.response.data.errors[0].msg) ||
          "An error occurred"
          : error.message;
      toast.error(errorMessage);
    }
  };



  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' && (
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        required
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        required
        className="w-full px-3 py-2 border border-gray-800"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
