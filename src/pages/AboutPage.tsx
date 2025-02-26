import { Helmet } from 'react-helmet-async';
import { Divider } from '@mui/material';
import { AboutHero, AboutTeam, AboutTestimonials, AboutVision, AboutWhat } from '../sections/about';

// @mui

// sections


// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title> About us |  MM Portal</title>
      </Helmet>

      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials />
    </>
  );
}
