import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }
      localStorage.setItem('token', data.token);
      // Decode JWT token to get userId
      const base64Url = data.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      localStorage.setItem('userId', payload.userId);
      toast.success('Login successful');
      navigate('/');
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
          Log in now
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ style: { color: 'brown' } }}
            inputProps={{ style: { color: 'brown' } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ style: { color: 'brown' } }}
            inputProps={{ style: { color: 'brown' } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} sx={{ color: 'brown' }} />}
              label="Remember me"
              sx={{ color: 'brown' }}
            />
            <Link href="#" underline="hover" sx={{ color: 'brown', fontSize: 14 }}>
              Forgot Password?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}
          >
            Log in
          </Button>
        </form>
        <Typography sx={{ mt: 2, textAlign: 'center', color: 'brown' }}>
          Don't have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/signup')}
            sx={{ color: 'green', fontWeight: 'bold' }}
          >
            Signup
          </Link>
        </Typography>
      </Box>
    </>
  );
}
