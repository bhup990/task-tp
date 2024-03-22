import React, { useState } from 'react';
// import { useRouter } from 'next/router';

const RegisterForm = ({ onRegister, handleActiveTab, active }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    city_id: '',
    district: '',
    isactive: 1
  });
  const [errors, setErrors] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    city_id: '',
    district: ''
  });

  // const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    let error = '';
    switch (name) {
      case 'email':
        const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !validEmailRegex.test(value) ? 'Invalid email address' : '';
        break;
      case 'password':
        error = value.length < 6 ? 'Password must be at least 6 characters long' : '';
        break;
      case 'confirmPassword':
        error = value !== formData.password ? 'Passwords do not match' : '';
        break;
      case 'full_name':
        error = value.length < 2 ? 'Name must be at least 2 characters long' : '';
        break;
      case 'state':
        error = value === '' ? 'State is required' : '';
        break;
      case 'city_id':
        error = value === '' ? 'City is required' : '';
        break;
      case 'district':
        error = value === '' ? 'District is required' : '';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some(error => error !== '');

    if (!hasErrors) {
      // router.push('/dashboard');
      window.location.href='/dashboard';
    } else {
      console.log('Please fix all errors before submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${!active ? 'inactive' : 'active'}`}>
      <div className='form-group'>
        <label>Name:</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
        />
        {errors.full_name && <span>{errors.full_name}</span>}
      </div>
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
      <div className='form-group'>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <div className='form-group'>
        <label>State:</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        >
          <option value="">Select State</option>
          <option value="state1">State 1</option>
          <option value="state2">State 2</option>
          {/* Add more options as needed */}
        </select>
        {errors.state && <span>{errors.state}</span>}
      </div>
      <div className='form-group'>
        <label>City:</label>
        <select
          name="city_id"
          value={formData.city_id}
          onChange={handleInputChange}
        >
          <option value="">Select City</option>
          <option value="city1">City 1</option>
          <option value="city2">City 2</option>
          {/* Add more options as needed */}
        </select>
        {errors.city_id && <span>{errors.city_id}</span>}
      </div>
      <div className='form-group'>
        <label>District:</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleInputChange}
        >
          <option value="">Select District</option>
          <option value="district1">District 1</option>
          <option value="district2">District 2</option>
          {/* Add more options as needed */}
        </select>
        {errors.district && <span>{errors.district}</span>}
      </div>
      <button type='submit'>Register</button>
      <p><button type='button' onClick={() => handleActiveTab(true)}>Login</button></p>
    </form>
  );
};

export default RegisterForm;
