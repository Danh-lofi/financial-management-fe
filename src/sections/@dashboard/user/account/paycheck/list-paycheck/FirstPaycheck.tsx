import { Card, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../../../../utils/styleTable';
import { fNumber } from '../../../../../../utils/formatNumber';

const earningRows = [
  {
    label: t('actualSalary'),
    value: fNumber(2200000000),
  },
  {
    label: null,
    value: null,
  },
  {
    label: null,
    value: null,
  },
  {
    label: null,
    value: null,
  },
  {
    label: null,
    value: null,
  },
  {
    label: `${t('totalEarning')}`,
    value: fNumber(10000000000000000),
  },
];

const deductionRows = [
  {
    label: `${t('insurance')} (8%)`,
    value: fNumber(17600000),
  },
  {
    label: `${t('medicalInsurance')} (1.5%)`,
    value: fNumber(330000),
  },
  {
    label: `${t('unemployeeInsurance')} (1%)`,
    value: fNumber(220000),
  },
  {
    label: `${t('personalIncomeTax')}`,
    value: fNumber(835500),
  },
  {
    label: `${t('personalIncomeTax')}`,
    value: fNumber(835500),
  },
  {
    label: `${t('totalDeduction')}`,
    value: fNumber(10000000000000000),
  },
];

const taxRows = [
  {
    label: t('totalTaxableIncome'),
    value: fNumber(2200000000),
  },
  {
    label: t('reduceYourself'),
    value: fNumber(90000000),
  },
  {
    label: `${t('dependentTaxReduction')}`,
    value: fNumber(0),
  },
  {
    label: `${t('taxableIncome')}`,
    value: fNumber(1200000000),
  },
];

const totalData = [
  {
    label: t('totalEarning'),
    value: fNumber(2200000000),
  },
  {
    label: t('totalTaxableIncome'),
    value: fNumber(90000000),
  },
  {
    label: `${t('assessibleTaxableIncome')}`,
    value: fNumber(0),
  },
  {
    label: `${t('totalPersonIncomeTax')}`,
    value: fNumber(1200000000),
  },
  {
    label: `${t('mandatoryTotalEmployeeInsurance')}`,
    value: fNumber(1200000000),
  },
  {
    label: `${t('totalDeductionYourself')}`,
    value: fNumber(1200000000),
  },
];

const FirstPaycheck = () => {
  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Grid container spacing={3} sx={{ p: 2 }}>
        <Grid container item xs={12} md={12} lg={6}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'left' }}>
              {t('payslip')}
            </Typography>
          </Grid>
          <Grid container item spacing={2} sx={{ mt: 3 }} xs={12} md={12} lg={12}>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" sx={{}}>
                  {t('nameEmployee')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Vũ Đình Cường
                </Typography>
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
          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={6}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography
              color="#e63946"
              variant="h5"
              sx={{ fontStyle: 'italic', textTransform: 'uppercase', textAlign: 'left' }}
            >
              private and confidential
            </Typography>
          </Grid>
          <Grid container item spacing={2} sx={{ mt: 3 }} xs={12} md={12} lg={12}>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={5}>
                <Typography variant="body1" sx={{}}>
                  {t('salaryPeriod')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={7}>
                <Typography variant="body1" sx={{}}>
                  June,2020
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={5}>
                <Typography variant="body1" sx={{}}>
                  {t('dateOfPayment')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={7}>
                <Typography variant="body1" sx={{}}>
                  01/07/2020
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={5}>
                <Typography variant="body1" sx={{}}>
                  {t('actualWorkingDay')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={7}>
                <Typography variant="body1" sx={{}}>
                  22
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={5}>
                <Typography variant="body1" sx={{}}>
                  {t('stardardWorkingDay')}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={7}>
                <Typography variant="body1" sx={{}}>
                  22
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={6}>
          <></>
        </Grid>
        <Grid container item xs={12} md={12} lg={6}>
          <Grid item xs={12} md={12} lg={5}>
            <Typography variant="body1" sx={{}}>
              {t('noOfDependents')}:
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={7}>
            <Typography variant="body1" sx={{}}>
              3
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ p: 2, mt: 3 }}>
        <Grid item xs={12} md={12} lg={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: 'uppercase' }}>
                    {t('earnings')}
                  </StyledTableCell>
                  <StyledTableCell align="right">VNĐ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {earningRows.map((r) => (
                  <StyledTableRow key={r.label} sx={{ height: 55 }}>
                    <StyledTableCell component="th" scope="r">
                      {r.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{r.value}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: 'uppercase' }}>
                    {t('deductions')}
                  </StyledTableCell>
                  <StyledTableCell align="right">VNĐ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deductionRows.map((r) => (
                  <StyledTableRow key={r.label} sx={{ height: 55 }}>
                    <StyledTableCell component="th" scope="r">
                      {r.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{r.value}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
            {t('netEarning')}: 12.000.000 VNĐ
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ p: 2, mt: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: 'uppercase' }}>
                    {t('otherTaxRelevantInfomation')}
                  </StyledTableCell>
                  <StyledTableCell align="right">VNĐ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taxRows.map((r) => (
                  <StyledTableRow key={r.label} sx={{ height: 55 }}>
                    <StyledTableCell component="th" scope="r">
                      {r.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{r.value}</StyledTableCell>
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
                    {t('generalDataToNow')}
                  </StyledTableCell>
                  <StyledTableCell align="right">VNĐ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalData.map((r) => (
                  <StyledTableRow key={r.label} sx={{ height: 55 }}>
                    <StyledTableCell component="th" scope="r">
                      {r.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">{r.value}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FirstPaycheck;
