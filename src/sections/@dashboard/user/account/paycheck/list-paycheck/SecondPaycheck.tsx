import {
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../../../../utils/styleTable';
import { fNumber } from '../../../../../../utils/formatNumber';

const earningRows = [
  {
    label: t('basicSalary'),
    standardLevel: fNumber(5000000),
    time: 26,
    unitOfMeasurement: 'Ngày',
    intoMoney: fNumber(5000000),
    taxable: fNumber(5000000),
    taxFree: 0,
  },
  {
    label: t('subTotalShift'),
    standardLevel: fNumber(5000000),
    time: 26,
    unitOfMeasurement: 'Ngày',
    intoMoney: fNumber(5000000),
    taxable: fNumber(5000000),
    taxFree: 0,
  },
  {
    label: t('overtimeSalary'),
    standardLevel: fNumber(0),
    time: 10,
    unitOfMeasurement: 'Giờ',
    intoMoney: fNumber(5000000),
    taxable: fNumber(5000000),
    taxFree: 0,
  },
  {
    label: t('kpiBonus'),
    standardLevel: fNumber(0),
    time: 10,
    unitOfMeasurement: 'Giờ',
    intoMoney: fNumber(5000000),
    taxable: fNumber(5000000),
    taxFree: 0,
  },
  {
    label: t('comissionBonus'),
    standardLevel: fNumber(0),
    time: 10,
    unitOfMeasurement: 'Giờ',
    intoMoney: fNumber(5000000),
    taxable: fNumber(5000000),
    taxFree: 0,
  },
  {
    label: t('otherBonus'),
    standardLevel: fNumber(0),
    time: 10,
    unitOfMeasurement: 'Giờ',
    intoMoney: fNumber(5000000),
    taxable: fNumber(5000000),
    taxFree: 0,
  },
  {
    label: t('totalSalaryGross'),
    standardLevel: '',
    time: '',
    unitOfMeasurement: '',
    intoMoney: fNumber(5000000),
    taxable: fNumber(5000000),
    taxFree: fNumber(5000000),
  },
];

const deductionRows = [
  {
    label: t('mandatoryEmployeeInsurance'),
    regulations: fNumber(17600000),
    ratio: '10.5%',
    intoMoney: fNumber(525000),
  },
  {
    label: t('tradeUnio'),
    regulations: fNumber(17600000),
    ratio: '1.0%',
    intoMoney: fNumber(50000),
  },
  {
    label: t('collectionOfHealthInsurance'),
    regulations: fNumber(17600000),
    ratio: '4.5%',
    intoMoney: 0,
  },
  {
    label: t('totalDeduction'),
    regulations: '',
    ratio: '',
    intoMoney: fNumber(575000),
  },
];

const taxRows = [
  {
    label: `${t('taxableIncome')}`,
    regulations: fNumber(17600000),
    count: 1,
    intoMoney: 0,
  },

  {
    label: t('reduceYourself'),
    regulations: fNumber(17600000),
    count: 1,
    intoMoney: 0,
  },
  {
    label: `${t('dependentTaxReduction')}`,
    regulations: fNumber(17600000),
    count: 1,
    intoMoney: 0,
  },
  {
    label: t('totalTaxableIncome'),
    regulations: '',
    count: '',
    intoMoney: 0,
  },
];

const SecondPaycheck = () => {
  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Grid container spacing={3} mt={2} mb={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h4" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
            {t('payslip')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            color="#e63946"
            variant="h5"
            sx={{ fontStyle: 'italic', textTransform: 'uppercase', textAlign: 'center' }}
          >
            private and confidential
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ p: 2 }}>
        <Grid container item xs={12} md={12} lg={6}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h6" sx={{ textAlign: 'left' }}>
              {t('employeeInformation')}
            </Typography>
          </Grid>
          <Grid container item spacing={2} sx={{ mt: 1 }} xs={12} md={12} lg={12}>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" sx={{}}>
                  {t('name')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1">Vũ Đình Cường</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" sx={{}}>
                  {t('project')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1">TECNO MOBILE</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" sx={{}}>
                  {t('idEmployee')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" sx={{}}>
                  VTSHR00002
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" sx={{}}>
                  {t('position')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" sx={{}}>
                  Payroll & Consultant
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" sx={{}}>
                  {t('taxId')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" sx={{}}>
                  8406301777
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" sx={{}}>
                  {t('socialInsuranceNumber')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" sx={{}}>
                  123112678
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={6}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h6" sx={{ textAlign: 'left' }}>
              {t('salaryPeriodInformation')}
            </Typography>
          </Grid>
          <Grid container item spacing={2} xs={12} md={12} lg={12}>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  {t('salaryPeriod')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  June,2020
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  {t('participationLevel')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  12665
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  {t('stardardWorkingDay')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  22
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  {t('probationaryDay')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  22
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  {t('officialPublicDay')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  22
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  {t('totalWorkingDaysForSalaryCalculation')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography variant="body1" sx={{}}>
                  22
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ p: 2, mt: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: 'uppercase' }}>
                    {t('earnings')}
                  </StyledTableCell>
                  <StyledTableCell align="right">{t('standardLevel')}</StyledTableCell>
                  <StyledTableCell align="right">{t('time')}</StyledTableCell>
                  <StyledTableCell align="right">{t('unitOfMeasurement')}</StyledTableCell>
                  <StyledTableCell align="right"> {t('intoMoney')}</StyledTableCell>
                  <StyledTableCell align="right">{t('taxable')}</StyledTableCell>
                  <StyledTableCell align="right">{t('taxFree')}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {earningRows.map((r) => (
                  <StyledTableRow key={r.label} sx={{ height: 55 }}>
                    <StyledTableCell component="th" scope="r">
                      {r.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{r.standardLevel}</StyledTableCell>
                    <StyledTableCell align="right">{r.time}</StyledTableCell>
                    <StyledTableCell align="right">{r.unitOfMeasurement}</StyledTableCell>
                    <StyledTableCell align="right">{r.intoMoney}</StyledTableCell>
                    <StyledTableCell align="right">{r.taxable}</StyledTableCell>
                    <StyledTableCell align="right">{r.taxFree}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={12} lg={12} mt={5}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: 'uppercase' }}>
                    {t('deductions')}
                  </StyledTableCell>
                  <StyledTableCell align="right">{t('regulations')}</StyledTableCell>
                  <StyledTableCell align="right">{t('ratio')}</StyledTableCell>
                  <StyledTableCell align="right">{t('intoMoney')}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deductionRows.map((r) => (
                  <StyledTableRow key={r.label} sx={{ height: 55 }}>
                    <StyledTableCell component="th" scope="r">
                      {r.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{r.regulations}</StyledTableCell>
                    <StyledTableCell align="right">{r.ratio}</StyledTableCell>
                    <StyledTableCell align="right">{r.intoMoney}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ p: 2, mt: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: 'uppercase' }}>
                    {t('incomeTax')}
                  </StyledTableCell>
                  <StyledTableCell align="right">{t('regulations')}</StyledTableCell>
                  <StyledTableCell align="right">{t('number')}</StyledTableCell>
                  <StyledTableCell align="right">{t('intoMoney')}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taxRows.map((r) => (
                  <StyledTableRow key={r.label} sx={{ height: 55 }}>
                    <StyledTableCell component="th" scope="r">
                      {r.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{r.regulations}</StyledTableCell>
                    <StyledTableCell align="right">{r.count}</StyledTableCell>
                    <StyledTableCell align="right">{r.intoMoney}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mt={5}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {t('realReceiveNET')}:  {fNumber(1000000)}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SecondPaycheck;
