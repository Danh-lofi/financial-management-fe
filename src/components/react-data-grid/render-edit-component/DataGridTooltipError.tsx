import { useMemo } from 'react';
import { Tooltip } from '@mui/material';
import { CheckCircle, Warning, Error } from '@mui/icons-material';

export type MTooltipProps = {
  text: string;
  status: 'success' | 'error' | 'warning';
  placement?: 'top' | 'bottom' | 'left' | 'right';
};

const MToolTip = ({ text, status = 'success', placement = 'top' }: MTooltipProps) => {
  const iconStatus = useMemo(() => {
    let component = <></>;
    switch (status) {
      case 'error':
        component = <Error sx={{ color: '#e01919' }} />;
        break;
      case 'success':
        component = <CheckCircle sx={{ color: '#22af27' }} />;
        break;
      case 'warning':
        component = <Warning sx={{ color: '#f17c12' }} />;
        break;
      default:
        break;
    }
    return component;
  }, [status]);

  const colorTooltip = useMemo(() => {
    let color = '';
    switch (status) {
      case 'error':
        color = 'error';
        break;
      case 'success':
        color = 'primary';
        break;
      case 'warning':
        color = 'warning';
        break;
      default:
        break;
    }
    return color;
  }, [status]);

  return (
    <Tooltip title={text} placement={placement} arrow>
      {iconStatus}
    </Tooltip>
  );
};

export default MToolTip;
