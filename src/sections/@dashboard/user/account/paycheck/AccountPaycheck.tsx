import { useState } from 'react';
import { useLocales } from '@/locales';
import {
  Card,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { useSettingsContext } from '../../../../../components/settings';
import {
  useTable
} from '../../../../../components/table';
import { PAYCHECKS } from '../../../../../constants/app.constants';
import FirstPaycheck from './list-paycheck/FirstPaycheck';
import SecondPaycheck from './list-paycheck/SecondPaycheck';

// @mui



// routes

// sections





// ----------------------------------------------------------------------

interface FormValuesProps {
  yearPaycheck: string | number;
  monthPaycheck: string | number;
}
// ----------------------------------------------------------------------

export default function AccountPaycheck() {
  const [selectedPaycheck, setSelectedPaycheck] = useState<number>(0);

  const { themeStretch } = useSettingsContext();

  const changePayCheckHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaycheck(+event.target.value);
  };

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <Card sx={{ mt: 3, p: 2 }}>
        <RadioGroup row onChange={changePayCheckHandle} value={selectedPaycheck}>
          {PAYCHECKS.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              sx={{
                '&:not(:last-of-type)': {
                  mb: 0,
                  // mb: spacing || 0,
                },
              }}
            />
          ))}
        </RadioGroup>
      </Card>
      {selectedPaycheck === 0 && <FirstPaycheck />}
      {selectedPaycheck === 1 && <SecondPaycheck />}
    </Container>
  );
}
