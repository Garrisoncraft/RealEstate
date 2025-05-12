import React from 'react';
import { Box, Typography, Link, Stack, IconButton, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '../assets/Logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 5, px: 3 }}>
      <Grid
        container
        spacing={4}
        maxWidth="lg"
        margin="auto"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ display: 'flex' }}
      >
        <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
            <img src={Logo} alt="Logo" style={{borderRadius: 50, width: 120, marginRight: 8, maxWidth: '100%' }} />
            <Typography variant="h6" sx={{ mb: 0 }}>
              CraftSpace
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, maxWidth: 300, mx: { xs: 'auto', sm: 0 } }}>
            Stay connected, explore opportunities, and invest with confidence. Your real estate success starts here
          </Typography>
          <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            <IconButton aria-label="Facebook" sx={{ color: 'white', p: 0, mr: 1 }} href="https://facebook.com" target="_blank" size="small">
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Instagram" sx={{ color: 'white', p: 0, mr: 1 }} href="https://instagram.com" target="_blank" size="small">
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Twitter" sx={{ color: 'white', p: 0, mr: 1 }} href="https://twitter.com" target="_blank" size="small">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="LinkedIn" sx={{ color: 'white', p: 0 }} href="https://linkedin.com" target="_blank" size="small">
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Home</Typography>
          <Stack spacing={1}>
            <Link href="#" color="inherit" underline="hover">Services</Link>
            <Link href="#" color="inherit" underline="hover">Invest</Link>
            <Link href="#" color="inherit" underline="hover">Properties</Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>About</Typography>
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Link href="#" color="inherit" underline="hover">Contact</Link>
          </Stack>
          <Stack spacing={1}>
            <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
            <Link href="#" color="inherit" underline="hover">Terms & Conditions</Link>
          </Stack>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 5, opacity: 0.6 }}>
        All Rights Reserved {currentYear} | CraftSpace
      </Typography>
    </Box>
  );
}
