import React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

type MBadgeProps = {
  count?: string | number;
  color?: string;
};

const MBadge = ({ count = '', color = '' }: MBadgeProps) => {
  return (
    <Box>
      <Badge
        badgeContent={count}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: color || 'default',
            color: 'white', // Adjust text color if needed
          },
        }}
      >
        {/* The child can be any element; placeholder for now */}
        <Box sx={{ width: 40, height: 40, backgroundColor: '#f0f0f0' }} />
      </Badge>
    </Box>
  );
};

export default MBadge;
