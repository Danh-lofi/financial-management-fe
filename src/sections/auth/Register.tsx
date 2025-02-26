import { t } from 'i18next';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_AUTH } from '@/routes/paths';
import { Link, Stack, Typography } from '@mui/material';
import LoginLayout from '../../layouts/login';
import AuthRegisterForm from './AuthRegisterForm';
import AuthWithSocial from './AuthWithSocial';

// @mui

// layouts

// routes

//



// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{t('registerIn')}</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{t('alreadyAccount')}? </Typography>

          <Link to={PATH_AUTH.login} component={RouterLink} variant="subtitle2">
            {t('signIn')}
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />
    </LoginLayout>
  );
}
