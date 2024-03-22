'use client'
import { useEffect, useState } from 'react';

const LoginForm = ({ onLogin, handleActiveTab, active }) => {
  const [actives, setActive] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation logic
    const errors = {};
    if (!formData.email || !formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password || !formData.password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const userData = await response.json();
        
        console.log('userDatauserData', userData)

        // Compare input values with data from API
        if (userData.email === formData.email && userData.password === formData.password) {
          onLogin(formData);
        } else {
          setApiError('Invalid email or password');
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setApiError('Failed to fetch user data');
      }
    } else {
      setErrors(errors);
    }
  };

  const handleSwitchRegister = () => {
    handleActiveTab(true);
  }

  return (
    <form onSubmit={handleSubmit} className={`${active ? 'inactive' : 'active'}`}>
      <div className='form-group'>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div className='form-group'>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">Login</button>
      <p><button type='button' onClick={handleSwitchRegister}>For Register</button></p>
      {apiError && <p>{apiError}</p>}
    </form>
  );
};

export default LoginForm;
