import { useState } from 'react';

const LoginForm = ({ onLogin, handleActiveTab, active }) => {
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
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length === 0) {
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error('Failed to login');
          }
        })
        .then((data) => {
          localStorage.setItem('email', JSON.stringify(formData.email));
          window.location.href = '/dashboard';
        })
        .catch((error) => {
          console.error('Error:', error);
          setApiError('Failed to login');
        });
    } else {
      setErrors(errors);
    }
  };

  const handleSwitchRegister = () => {
    handleActiveTab(true);
  };

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
