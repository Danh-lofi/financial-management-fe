import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/auth/useAuthContext';
import { Box } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import useResponsive from '../../hooks/useResponsive';
import Main from './Main';
import Header from './header';
import NavHorizontal from './nav/NavHorizontal';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';

// @mui

// hooks

// components


//






// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { themeLayout, onToggleLayout } = useSettingsContext();
  const { user, logout } = useAuthContext();

  const isDesktop = useResponsive('up', 'lg');
  const location = useLocation();

  // check isEditEmployee
  const isEditEmployee = location.pathname.includes('employee-list/edit');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  useEffect(() => {
    if (isEditEmployee && !isNavMini) {
      onToggleLayout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isEditEmployee]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main>
          <Outlet />
        </Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >

        {user?.roles === 'User' ? '' : renderNavVertical}
   

        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
