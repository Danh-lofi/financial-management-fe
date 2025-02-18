import { useEffect, useState } from 'react';
import {
  CONTRACT_STATUS,
  DEFAULT_PAGINATION,
  EMPLOYEE_GENERAL_STATUS,
  INCOMPLETE_STATUS,
} from '@/constants/app.constants';
import useResponsive from '@/hooks/useResponsive';
import { useLocales } from '@/locales';
import {
  getExpiredContract,
  getIncompleteInfo,
  getPrepareExpiredContract,
  getReportProject,
  getTotalGeneral,
} from '@/redux/slices/dashboard/employee';
import { dispatch, useSelector } from '@/redux/store';
import { AnalyticsCurrentVisits } from '@/sections/@dashboard/general/analytics';
import { AppWidgetSummary } from '@/sections/@dashboard/general/app';
import {
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmployeeGeneralReportTable from './EmployeeGeneralReportTable';

const EmployeeAnalytics = () => {
  const theme = useTheme();
  const { t } = useLocales();
  const isDesktop = useResponsive('up', 'lg');
  const { totalGeneral } = useSelector((state) => state.employee);
  const { reportProject } = useSelector((state) => state.employee);
  const [isCalledExpired, setIsCalledExpired] = useState(false);
  const [isCalledPrepareExpired, setIsCalledPrepareExpired] = useState(false);
  const [isCalledIncomplete, setIsCalledIncomplete] = useState(false);
  const [expiredActive, setExpiredActive] = useState(
    EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.value
  );

  const [prepareExpiredActive, setPrepareExpiredActive] = useState(
    EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.value
  );

  const [incompleteActive, setIncompleteActive] = useState(
    EMPLOYEE_GENERAL_STATUS.INCOMPLETE.contact.value
  );

  const [expiredParams, setExpiredParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    contractType: EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.value,
  });

  const [prepareExpiredParams, setPrepareExpiredParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    contractType: EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.value,
    day: 10,
  });

  const [prepareExpiredDay, setPrepareExpiredDay] = useState(prepareExpiredParams.day);

  const [incompleteParams, setIncompleteParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    infoType: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.contact.value,
  });

  const [isOpenExpired, setIsOpenExpired] = useState(false);
  const [isOpenPrepareExpired, setIsOpenPrepareExpired] = useState(false);
  const [isOpenIncomplete, setIsOpenIncomplete] = useState(false);

  const onGetExpiredContract = async (params: any) => {
    await dispatch(getExpiredContract(params));
    setIsCalledExpired(true);
    setIsOpenExpired(true);
  };

  const onGetPrepareExpiredContract = async (params: any) => {
    await dispatch(getPrepareExpiredContract(params));
    setIsCalledPrepareExpired(true);
    setIsOpenPrepareExpired(true);
  };

  const onGetIncompleteInfo = async (params: any) => {
    await dispatch(getIncompleteInfo(params));
    setIsCalledIncomplete(true);
    setIsOpenIncomplete(true);
  };

  useEffect(() => {
    if (isCalledExpired) {
      onGetExpiredContract(expiredParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiredParams]);

  useEffect(() => {
    if (isCalledPrepareExpired) {
      onGetPrepareExpiredContract(prepareExpiredParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepareExpiredParams]);

  useEffect(() => {
    if (isCalledIncomplete) {
      onGetIncompleteInfo(incompleteParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incompleteParams]);

  useEffect(() => {
    // dispatch(getTotalGeneral());
    // dispatch(getReportProject());
  }, []);

  const handleExpiredChange = (event: any) => {
    setExpiredActive(event.target.value as string);
  };

  const handlePrepareExpiredChange = (event: any) => {
    setPrepareExpiredActive(event.target.value as string);
  };

  const handleIncompleteChange = (event: any) => {
    setIncompleteActive(event.target.value as string);
  };

  const onExpiredFilter = () => {
    onGetExpiredContract({
      ...expiredParams,
      contractType: expiredActive,
    });
  };

  const onPrepareExpiredFilter = () => {
    onGetPrepareExpiredContract({
      ...prepareExpiredParams,
      contractType: prepareExpiredActive,
      day: prepareExpiredDay,
    });
  };

  const onIncompleteFilter = () => {
    onGetIncompleteInfo({
      ...incompleteParams,
      infoType: incompleteActive,
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} lg={5}>
          <AnalyticsCurrentVisits
            title={t('employeeByDepartment')}
            chart={{
              series: reportProject?.map((item) => {
                return {
                  label: item.project_name,
                  value: item.totalEmployee,
                };
              }),
              colors: [
                theme.palette.primary.main,
                theme.palette.warning.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.success.main,
                theme.palette.primary.dark,
                theme.palette.error.dark,
                theme.palette.success.dark,
                theme.palette.warning.dark,
                theme.palette.info.dark,
                theme.palette.success.darker,
                theme.palette.info.darker,
                theme.palette.warning.darker,
                theme.palette.primary.darker,
                theme.palette.error.darker,
                theme.palette.info.light,
                theme.palette.warning.light,
                theme.palette.primary.light,
                theme.palette.error.light,
                theme.palette.success.light,
              ],
            }}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <Box sx={{ mt: 2.5 }}>
            <Typography variant="h6">{t('summaryCount')}</Typography>
          </Box>
          <Grid sx={{ mt: isDesktop ? 5 : 0 }} container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <AppWidgetSummary
                onGetData={() => onGetExpiredContract(expiredParams)}
                title={t('expiredContract')}
                percent={2.6}
                total={Number(totalGeneral?.totalExpired)}
                chart={{
                  colors: [theme.palette.primary.main],
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <AppWidgetSummary
                onGetData={() => onGetPrepareExpiredContract(prepareExpiredParams)}
                title={t('prepareExpiredContract')}
                percent={2.6}
                total={Number(totalGeneral?.totalPrepareExpired)}
                chart={{
                  colors: [theme.palette.primary.main],
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <AppWidgetSummary
                onGetData={() => onGetIncompleteInfo(incompleteParams)}
                title={t('incompleteInfo')}
                percent={2.6}
                total={Number(totalGeneral?.totalUncompletedProfile)}
                chart={{
                  colors: [theme.palette.primary.main],
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth="lg" onClose={() => setIsOpenExpired(false)} open={isOpenExpired}>
        <EmployeeGeneralReportTable
          filters={
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('contract')}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={expiredActive}
                      label={t('contract')}
                      onChange={handleExpiredChange}
                    >
                      {CONTRACT_STATUS.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={4} lg={4}>
                  <Button onClick={onExpiredFilter} variant="contained">
                    {t('filter')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          }
          params={expiredParams}
          setParams={setExpiredParams}
        />
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={() => setIsOpenPrepareExpired(false)}
        open={isOpenPrepareExpired}
      >
        <EmployeeGeneralReportTable
          params={prepareExpiredParams}
          setParams={setPrepareExpiredParams}
          filters={
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('contract')}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={prepareExpiredActive}
                      label={t('contract')}
                      onChange={handlePrepareExpiredChange}
                    >
                      {CONTRACT_STATUS.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                  <FormControl fullWidth>
                    <TextField
                      onChange={(e) => setPrepareExpiredDay(Number(e.target.value))}
                      id="outlined-basic"
                      label={t('prepareExpiredDay')}
                      variant="outlined"
                      value={prepareExpiredDay}
                    />
                  </FormControl>
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={4} lg={4}>
                  <Button onClick={onPrepareExpiredFilter} variant="contained">
                    {t('filter')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          }
        />
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={() => setIsOpenIncomplete(false)}
        open={isOpenIncomplete}
      >
        <EmployeeGeneralReportTable
          params={incompleteParams}
          setParams={setIncompleteParams}
          filters={
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('infoType')}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={incompleteActive}
                      label={t('infoType')}
                      onChange={handleIncompleteChange}
                    >
                      {INCOMPLETE_STATUS.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={4} lg={4}>
                  <Button onClick={onIncompleteFilter} variant="contained">
                    {t('filter')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          }
        />
      </Dialog>
    </>
  );
};

export default EmployeeAnalytics;
