import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Signup failed');
        return;
      }
      toast.success('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
      toast.error('Network error: ' + err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 8,
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          color: 'brown',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ style: { color: 'brown' } }}
            inputProps={{ style: { color: 'brown' } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
            InputLabelProps={{ style: { color: 'brown' } }}
            inputProps={{ style: { color: 'brown' } }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputLabelProps={{ style: { color: 'brown' } }}
            inputProps={{ style: { color: 'brown' } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: 'brown', '&:hover': { bgcolor: 'darkbrown' } }}
          >
            Sign up
          </Button>
        </form>
        <Typography sx={{ mt: 2, textAlign: 'center', color: 'brown' }}>
          Already have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/login')}
            sx={{ color: 'green', fontWeight: 'bold' }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </>
  );
}
