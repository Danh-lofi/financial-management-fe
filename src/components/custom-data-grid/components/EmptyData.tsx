import EmptyContent from '@/components/empty-content';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', {
      fill: '#E8EAED',
    }),
  },
}));

const EmptyDataDataGrid = () => {
  return (
    <StyledGridOverlay>
      <EmptyContent title='Không có dữ liệu' />
    </StyledGridOverlay>
  );
};

export default EmptyDataDataGrid;
