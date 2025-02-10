import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';
// @mui
import { Link, Stack, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
// layouts
import LoginLayout from '../../layouts/login';
//

import AuthLoginForm from './AuthLoginForm';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{t('signInTohict')}</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{t('dontHaveAccount')}? </Typography>

          <Link to={PATH_AUTH.register} component={RouterLink} variant="subtitle2">
            {t('registerIn')}
          </Link>
        </Stack>
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>admin@hict.com.vn</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      <AuthLoginForm />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
