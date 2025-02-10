import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type MProgressProps = {
  value: number;
  status?: 'active' | 'normal' | 'exception' | 'success';
};

const WProgressTable = ({ value, status }: MProgressProps) => {
  // Determine color based on status
  let color: 'primary' | 'secondary' | 'error' | 'success' | 'warning' = 'primary';

  switch (status) {
    case 'exception':
      color = 'error';
      break;
    case 'success':
      color = 'success';
      break;
    case 'active':
      color = 'secondary'; // Active mapped to secondary for visualization
      break;
    default:
      color = 'primary'; // Default as normal
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={value} color={color} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default WProgressTable;
