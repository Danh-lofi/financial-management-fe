import { t } from 'i18next';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_AUTH } from '@/routes/paths';
import { Link, Stack, Typography } from '@mui/material';
import { useAuthContext } from '../../auth/useAuthContext';
import LoginLayout from '../../layouts/login';
import AuthLoginForm from './AuthLoginForm';

// @mui

// auth

// routes
// layouts

//




// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Đăng nhập</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{t('dontHaveAccount')}? </Typography>
          <Link to={PATH_AUTH.register} component={RouterLink} variant="subtitle2">
            {t('registerIn')}
          </Link>
        </Stack>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}
