import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import AccountApi from '@/apis/account.api';
import { LOCAL_STORAGE_KEYS } from '@/constants/app.constants';
import { LocalUtils } from '@/utils/local';
import localStorageAvailable from '@/utils/localStorageAvailable';
import SnakeBar from '@/utils/snackbar';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
import { isValidToken, jwtDecode, setSession } from './utils';

// utils






//




// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REFRESH = 'REFRESH',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
  [Types.REFRESH]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  if (action.type === Types.REFRESH) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const decodeToken = jwtDecode(accessToken);
        const userInfo = await AccountApi.getUserInfo(decodeToken?.userId);

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: userInfo?.data?.payload?.[0],
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await AccountApi.login({
        username,
        password,
      });
      const { accessToken, refreshToken, payload } = response.data;
      LocalUtils.set(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

      // Group Permission
      if (accessToken) {
        setSession(accessToken);
        const userInfo = await AccountApi.getUserInfo(payload.user.userId);
        dispatch({
          type: Types.LOGIN,
          payload: {
            user: {
              refreshToken,
              ...userInfo?.data?.payload?.[0],
            },
          },
        });
        SnakeBar.success(response?.data?.message);
      } else {
        SnakeBar.error(response?.data?.message);
      }
    } catch (error) {
      SnakeBar.error(error?.response?.data?.message || error);
    }
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    LocalUtils.set('permissionList', null);

    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      logout,
      refresh: initialize,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, initialize]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
