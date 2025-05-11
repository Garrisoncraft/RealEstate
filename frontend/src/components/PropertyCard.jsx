import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:5000';
  const imageUrl = property.image && property.image.startsWith('/uploads')
    ? `${backendUrl}${property.image}`
    : property.image;

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 2,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 4,
        },
        cursor: 'pointer',
        p: 0,
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={property.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography mr={1} variant="h6" fontWeight="bold" noWrap>
            {property.title}
          </Typography>
          <Chip
            label={property.rentOrSale === 'rent' ? 'For Rent' : 'For Sale'}
            color={property.rentOrSale === 'rent' ? 'primary' : 'secondary'}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 1 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">{property.location}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BedIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{property.beds} Beds</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BathtubIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{property.baths} Baths</Typography>
          </Box>
        </Box>

        <Typography variant="h6" color="success.main" fontWeight="bold">
          ${property.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}