
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    area: '',
    beds: '',
    baths: '',
    rentOrSale: 'rent',
    image: null,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      navigate('/login');
      return;
    }
    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('price', formData.price);
      formPayload.append('location', formData.location);
      formPayload.append('area', formData.area);
      formPayload.append('beds', formData.beds);
      formPayload.append('baths', formData.baths);
      formPayload.append('rentOrSale', formData.rentOrSale);
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/properties/add`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        body: formPayload,
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to add property');
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setError('Network error', err.message);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
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
        Add New Property
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'brown' } }}
          inputProps={{ style: { color: 'brown' } }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          InputLabelProps={{ style: { color: 'brown' } }}
          inputProps={{ style: { color: 'brown' } }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'brown' } }}
          inputProps={{ style: { color: 'brown' } }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'brown' } }}
          inputProps={{ style: { color: 'brown' } }}
        />
        <TextField
          label="Area (sq ft)"
          name="area"
          type="number"
          value={formData.area}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'brown' } }}
          inputProps={{ style: { color: 'brown' } }}
        />
        <TextField
          label="Bedrooms"
          name="beds"
          type="number"
          value={formData.beds}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'brown' } }}
          inputProps={{ style: { color: 'brown' } }}
        />
        <TextField
          label="Bathrooms"
          name="baths"
          type="number"
          value={formData.baths}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'brown' } }}
          inputProps={{ style: { color: 'brown' } }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="rentOrSale-label" sx={{ color: 'brown' }}>Rent or Sale</InputLabel>
          <Select
            labelId="rentOrSale-label"
            name="rentOrSale"
            value={formData.rentOrSale}
            label="Rent or Sale"
            onChange={handleChange}
            sx={{ color: 'brown' }}
          >
            <MenuItem value="rent">Rent</MenuItem>
            <MenuItem value="sale">Sale</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2, bgcolor: 'brown', '&:hover': { bgcolor: 'darkbrown' } }}
        >
          Upload Image
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </Button>
        {formData.image && (
          <Typography sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
            Selected file: {formData.image.name}
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: 'brown', '&:hover': { bgcolor: 'darkbrown' } }}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Add Property'}
        </Button>
      </form>
    </Box>
  );
}
