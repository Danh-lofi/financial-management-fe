// i18n

import './locales/i18n';
import 'simplebar-react/dist/simplebar.min.css';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import  './styles/global.css';
import  './styles/react-data-grid.scss';
import './app.css';

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthProvider } from './auth/JwtContext';
import { MotionLazyContainer } from './components/animate';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { SettingsProvider, ThemeSettings } from './components/settings';
import SnackbarProvider from './components/snackbar';
import ThemeLocalization from './locales';
import { persistor, store } from './redux/store';
import Router from './routes';
import ThemeProvider from './theme';
import {SnackbarUtilsConfigurator} from "./utils/snackbar"

// scroll bar


// lightbox






// editor


// slick-carousel



// lazy image


// ----------------------------------------------------------------------





// @mui


// redux

// routes



// theme



// locales

// components







// ----------------------------------------------------------------------

// Check our docs
// https://docs.minimals.cc/authentication/ts-version


// import { AuthProvider } from './auth/Auth0Context';
// import { AuthProvider } from './auth/FirebaseContext';
// import { AuthProvider } from './auth/AwsCognitoContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <MotionLazyContainer>
                    <ThemeProvider>
                      <ThemeSettings>
                        <ThemeLocalization>
                          <SnackbarProvider>
                            <SnackbarUtilsConfigurator />
                            <StyledChart />
                            <Router />
                          </SnackbarProvider>
                        </ThemeLocalization>
                      </ThemeSettings>
                    </ThemeProvider>
                  </MotionLazyContainer>
                </BrowserRouter>
              </SettingsProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
