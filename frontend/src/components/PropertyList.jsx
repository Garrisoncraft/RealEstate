import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, MenuItem, Select, Pagination, CircularProgress } from '@mui/material';
import PropertyCard from './PropertyCard';

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = React.useState('mostPopular');
  const [page, setPage] = React.useState(1);
  const [rentOrSaleFilter, setRentOrSaleFilter] = React.useState('');
  const pageSize = 9;

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/properties/get`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Sorting logic
  const getSortedProperties = () => {
    if (!Array.isArray(properties)) return [];
    let filtered = properties;
    if (rentOrSaleFilter) {
      filtered = properties.filter(p => p.rentOrSale === rentOrSaleFilter);
    }
    let sorted = [...filtered];
    if (sort === 'priceLowHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceHighLow') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRentOrSaleFilterChange = (event) => {
    setRentOrSaleFilter(event.target.value);
    setPage(1);
  };

  const sortedProperties = getSortedProperties();
  const pagedProperties = sortedProperties.slice((page - 1) * pageSize, page * pageSize);
  const totalFilteredPages = Math.ceil(sortedProperties.length / pageSize);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', minHeight: '100vh'}}>
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          background: '#fff',
          borderRadius: '0.5rem 0.5rem 0 0',
          p: 1,
          boxShadow: 1,
        }}
      >
        {/* Left: Showing results */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ flex: '1 1 100%', textAlign: 'left', fontSize: { xs: '0.7rem', sm: '0.8rem' }, mb: { xs: 1, sm: 0 } }}
        >
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, sortedProperties.length)} of {sortedProperties.length} results
        </Typography>
        {/* Center: Title */}
        <Typography
          variant="h6"
          sx={{
            flex: '1 1 100%',
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'text.primary',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            mb: { xs: 1, sm: 0 },
          }}
        >
          Property Listings
        </Typography>
        {/* Right: Filters */}
        <Box
          sx={{
            flex: '1 1 100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Select
            value={rentOrSaleFilter}
            onChange={handleRentOrSaleFilterChange}
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: 90, sm: 120 }, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
            displayEmpty
          >
            <MenuItem value="" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              All
            </MenuItem>
            <MenuItem value="sale" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              For Sale
            </MenuItem>
            <MenuItem value="rent" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              For Rent
            </MenuItem>
          </Select>
          <Select
            value={sort}
            onChange={handleSortChange}
            size="small"
            variant="outlined"
            sx={{ minWidth: { xs: 120, sm: 170 }, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
          >
            <MenuItem value="mostPopular" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              Most Popular
            </MenuItem>
            <MenuItem value="priceLowHigh" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              Price: Low to High
            </MenuItem>
            <MenuItem value="priceHighLow" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              Price: High to Low
            </MenuItem>
          </Select>
        </Box>
      </Box>
      {/* Listings */}
      <Grid mt={3} mb={3} container spacing={3}>
        {pagedProperties.map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={3} lg={3} sx={{ display: 'flex' }}>
            <div style={{ flexGrow: 1}}>
              <PropertyCard property={property} />
            </div>
          </Grid>
        ))}
      </Grid>
      <Box className="flex justify-center mt-6">
        <Pagination count={totalFilteredPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Box>
  );
}
