import React from 'react';
import { Typography, Box } from '@mui/material';
import headerImage from '../assets/Header.jpg';

export default function Header() {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: 'rgba(38, 38, 37, 0.85)', 
        backgroundBlendMode: 'overlay',
        minHeight: 400,
        filter: 'brightness(0.4)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bolder', color: 'white', maxWidth: 600, mb: 1, textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' } }}>
          Find Your Perfect Investment Properties
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', maxWidth: 500, fontWeight: 'medium', textShadow: '1px 1px 3px rgba(0,0,0,0.4)', fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem' } }}>
          Explore a selection of high-value real estate opportunities designed for financial growth and stability
        </Typography>
      </Box>
    </Box>
  );
}
