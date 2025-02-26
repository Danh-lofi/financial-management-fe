import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useSettingsContext } from '../../components/settings';

// @mui


// components


// ----------------------------------------------------------------------

export default function BlankPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Blank Page |  MM Portal</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Blank </Typography>

        <Box
          sx={{
            mt: 5,
            width: 1,
            height: 320,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        />
      </Container>
    </>
  );
}
