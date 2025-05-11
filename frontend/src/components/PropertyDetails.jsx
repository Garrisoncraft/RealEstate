import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Grid,
  Container,
  keyframes,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Animation
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/properties/get/${id}`);
        if (!response.ok) throw new Error('Property not found');
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const loggedInUserId = localStorage.getItem('userId');
  const isOwner = property && property.userId?.toString() === loggedInUserId?.toString();

  const handleEdit = () => navigate(`/properties/edit/${id}`);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in to delete a property.');

    try {
      const response = await fetch(`http://localhost:5000/properties/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to delete property');
        return;
      }

      alert('Property deleted successfully');
      navigate('/');
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  const openDeleteDialog = () => setOpenConfirm(true);
  const closeDeleteDialog = () => setOpenConfirm(false);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h6" color="error" gutterBottom textAlign="center">
          {error}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        py: 6,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        direction={{ xs: 'column', md: 'row' }}
        sx={{ height: '100%' }}
      >
        {/* Image Section */}
        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'center' } }}>
          <Box
            component="img"
            src={
              property.image && property.image.startsWith('/uploads')
                ? 'http://localhost:5000' + property.image
                : property.image
            }
            alt={property.title}
            sx={{
              width: { xs: '100%', md: '80%' },
              maxWidth: 500,
              height: 'auto',
              borderRadius: 4,
              filter: 'brightness(0.8)',
              transition: 'filter 0.5s ease',
              '&:hover': {
                filter: 'brightness(1)',
              },
              boxShadow: 3,
            }}
          />
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: { md: 4 },
              animation: `${slideInLeft} 1.2s ease-out`,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Chip
              label={property.rentOrSale === 'rent' ? 'For Rent' : 'For Sale'}
              color={property.rentOrSale === 'rent' ? 'primary' : 'secondary'}
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: '0.875rem',
                alignSelf: { xs: 'center', md: 'flex-start' },
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: '#111827',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.2,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {property.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#4b5563',
                mb: 3,
                fontSize: '1rem',
                lineHeight: 1.75,
              }}
            >
              {property.description || 'No description available.'}
            </Typography>

            {/* Property Info Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 4,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <LocationOnIcon color="action" sx={{ mr: 1 }} />
                <span>Location: {property.location}</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <SquareFootIcon color="action" sx={{ mr: 1 }} />
                <span>Area: {property.area} sq. ft.</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <BedIcon color="action" sx={{ mr: 1 }} />
                <span>Beds: {property.beds}</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <BathtubIcon color="action" sx={{ mr: 1 }} />
                <span>Baths: {property.baths}</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <AttachMoneyIcon color="action" sx={{ mr: 1 }} />
                <span>Price: ${property.price.toLocaleString()}</span>
              </Box>
            </Box>

            {/* Owner Actions */}
            {isOwner && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#6b4c3b',
                    '&:hover': { bgcolor: '#5a3e2f' },
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={openDeleteDialog}>
                  Delete
                </Button>
              </Box>
            )}

            {/* Back Button */}
            <Box sx={{ mt: 4, textAlign: { xs: 'center', md: 'left' } }}>
              <Button variant="outlined" onClick={() => navigate(-1)} fullWidth={false}>
                Back to Listings
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={closeDeleteDialog}>
        <DialogTitle className="text-lg font-semibold">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-700">
            Are you sure you want to delete the property{' '}
            <strong>"{property.title}"</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={() => { closeDeleteDialog(); handleDelete(); }} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}