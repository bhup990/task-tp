import React, { useState } from 'react';

const RegisterForm = ({ onRegister, handleActiveTab, active }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '', 
    password: '',
    confirmPassword: '',
    state: '',
    city_id: '',
    district: '',
    isactive:1
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Custom validation logic
    const errors = {};
    if (!formData.full_name || !formData.full_name.trim()) {
      errors.full_name = 'Name is required';
    }
    if (!formData.email || !formData.email.trim()) {
      errors.email = 'Email is required';
    }
    // Add email format validation if needed
    if (!formData.password || !formData.password.trim()) {
      errors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.state || !formData.state.trim()) {
      errors.state = 'State is required';
    }
    if (!formData.city_id || !formData.city_id.trim()) {
      errors.city_id = 'City is required';
    }
    if (!formData.district || !formData.district.trim()) {
      errors.district = 'District is required';
    }

    if (Object.keys(errors).length === 0) {
      console.log("formDataformData", formData)
      fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((results) => {
          if(results.status === 200){
            route
          }
        })

        .catch((err) => { console.log(err) })
    } else {
      setErrors(errors);
    }
  };

  const handleSwitchLogin = () => {
    handleActiveTab(false);
  }

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
      <button type="submit" onClick={handleSwitchLogin}>Register</button>
      <p><button type='button' onClick={handleSwitchLogin}>Login</button></p>
    </form>
  );
};

export default RegisterForm;
