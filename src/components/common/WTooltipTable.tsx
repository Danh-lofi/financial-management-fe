import React, { ReactElement } from 'react';
import { Tooltip, TooltipProps, createTheme, ThemeProvider } from '@mui/material';

type WTooltipTableProps = {
  children: ReactElement<any, any>;
  title?: string;
  placement?: TooltipProps['placement'];
};

const WTooltipTable = ({ children, title = '', placement = 'top' }: WTooltipTableProps) => {
  // Create a custom theme
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#0f172a',
            color: '#DBEAFE',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Tooltip title={title} placement={placement}>
        {children}
      </Tooltip>
    </ThemeProvider>
  );
};

export default WTooltipTable;
