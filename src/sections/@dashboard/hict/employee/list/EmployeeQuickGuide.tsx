import { useLocales } from '@/locales';
import { CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const EmployeeQuickGuide = () => {
  const { t } = useLocales();

  const modules = [
    t('registerNewEmployee'),
    t('setupEmployeeBasicInfo'),
    t('setupEmployeeStaffInfo'),
    t('setupEmployeeSalaryInfo'),
    t('setupEmployeeBankAccountInfo'),
    t('setupEmployeeSystemUserAccount'),
    t('manageDepartmentDataMaster'),
    t('manageDesignationDataMaster'),
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="body1">{t('employeeQuickGuideDesc')}</Typography>
      <Typography sx={{ my: 1 }} variant="body1">
        {t('employeeFeature')}
      </Typography>
      <Box sx={{ mt: 3 }}>
        {modules.map((item,index) => (
          <Typography key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }} variant="body1">
            <CheckCircle color="primary" /> {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default EmployeeQuickGuide;
