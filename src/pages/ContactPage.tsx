import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@mui/material';
import { _mapContact } from '../_mock/arrays';
import { ContactForm, ContactHero, ContactMap } from '../sections/contact';

// @mui

// _mock

// sections


// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Contact us |  MM Portal</title>
      </Helmet>

      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <ContactForm />

          <ContactMap contacts={_mapContact} />
        </Box>
      </Container>
    </>
  );
}
