import { useLocales } from '@/locales';
import { CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const AttendanceQuickGuide = () => {
  const { t } = useLocales();

  const modules = [
    t('clockInOut'),
    t('registerPublicHoliday')
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="body1">{t('attendanceQuickGuideDesc')}</Typography>
      <Typography sx={{ my: 1 }} variant="body1">
        {t('attendanceFeature')}
      </Typography>
      <Box sx={{ mt: 3 }}>
        {modules.map((item) => (
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }} variant="body1">
            <CheckCircle color="primary" /> {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default AttendanceQuickGuide;
