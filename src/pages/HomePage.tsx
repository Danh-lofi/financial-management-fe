import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import ScrollProgress from '../components/scroll-progress';
import {
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeColorPresets,
  HomeDarkMode,
  HomeForDesigner,
  HomeHero,
  HomeHugePackElements,
  HomeLookingFor,
  HomeMinimal,
  HomePricingPlans,
} from '../sections/home';

// @mui

// components

// sections


// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> The starting point for your next project |  MM Portal</title>
      </Helmet>

      <ScrollProgress />

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeDarkMode />

        <HomeColorPresets />

        <HomeCleanInterfaces />

        <HomePricingPlans />

        <HomeLookingFor />

        <HomeAdvertisement />
      </Box>
    </>
  );
}
