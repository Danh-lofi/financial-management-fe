import { Helmet } from 'react-helmet-async';
import Register from '../../sections/auth/Register';

// sections


// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | fm Portal</title>
      </Helmet>

      <Register />
    </>
  );
}
