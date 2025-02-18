// @mui

import { useEffect } from 'react';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import useResponsive from '@/hooks/useResponsive';
import { getListNotice } from '@/redux/slices/dashboard/notice';
import { dispatch } from '@/redux/store';
import { AppBar, IconButton, Stack, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import Logo from '../../../components/logo';
import { useSettingsContext } from '../../../components/settings';
import { HEADER, NAV } from '../../../config-global';
import useOffSetTop from '../../../hooks/useOffSetTop';
import { bgBlur } from '../../../utils/cssStyles';
import AccountPopover from './AccountPopover';
import ContactsPopover from './ContactsPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Searchbar from './Searchbar';

// utils





// hooks


// config

// components



//







// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        {/* <LanguagePopover /> */}

        <NotificationsPopover />
{/* 
        <ContactsPopover /> */}

        <AccountPopover />
      </Stack>
    </>
  );

  useEffect(() => {
    // dispatch(getListNotice({
    //   pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    //   pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    // }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
