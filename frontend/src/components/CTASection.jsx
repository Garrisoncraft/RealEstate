import { Typography, Box, Container, Grid } from "@mui/material";
import { keyframes } from "@mui/system";
import ctaImage from "../assets/Product 3.jpg";

// Define animations
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

const CTASection = () => {
  return (
    <Container
      sx={{
        mt: 3,
        minHeight: "70vh",
        backgroundColor: "#f9fafb",
        py: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="stretch" 
        direction={{ xs: "column-reverse", md: "row" }}
        sx={{ height: "100%" }} 
      >
        {/* Text Section */}
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingRight: { md: 4 },
              animation: `${slideInLeft} 1.2s ease-out`,
              textAlign: { xs: "center", md: "left" },
            }}
          >
          <Typography
              variant="subtitle1"
              sx={{
                mt: 6,
                fontWeight: "bold",
                color: "#6b7280",
                mb: 1,
                animation: `${slideInLeft} 1.4s ease-out`,
              }}
            >
              Invest
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "#111827",
                mb: 2,
                fontSize: "2.5rem",
                lineHeight: 1.2,
                animation: `${slideInLeft} 1.6s ease-out`,
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Find Your Perfect <br /> Investment Properties
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#4b5563",
                mb: 4,
                fontSize: "1rem",
                lineHeight: 1.75,
                animation: `${slideInLeft} 1.8s ease-out`,
              }}
            >
              Explore a selection of high-value real estate opportunities{" "}
              <br />
              designed for financial growth and stability
            </Typography>
          </Box>
        </Grid>
        {/* Image Section */}
        <Grid item xs={12} md={6} sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-end" } }}>
          <Box
            component="img"
            src={ctaImage}
            alt="Security"
            sx={{
              width: { xs: "100%", md: "80%" },
              maxWidth: 400,
              height: "auto",
              borderRadius: 4,
              filter: "brightness(0.7)",
              transition: "filter 0.5s",
              "&:hover": {
                filter: "brightness(0.9)",
              },
              boxShadow: 3,
              mb: { xs: 2, md: 0 },
            }}
          />
        </Grid>
      </Grid>
    </Container>

  );
};

export default CTASection;