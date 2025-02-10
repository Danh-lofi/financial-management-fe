import React, { Fragment, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { RHFCheckbox, RHFDatePicker, RHFTextField } from '@/components/hook-form';
import { useSettingsContext } from '@/components/settings';
import { SIZE_FIELD, backgroundColor } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Checkbox, TableCell, TableHead, TableRow, useTheme } from '@mui/material';

type Props = {
  methods?: any;
  values?: any;
};

const ProbationarySection = ({ methods, values }: Props) => {
  const { t } = useLocales();

  // Form
  const {
    control,
    formState: { isSubmitting, errors },
  } = methods;

  // Theme
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'probationaryDetail',
  });

  useEffect(() => {
    append([
      {
        id:0,
        contractType: t('isProbationary'),
        appendix: `${t('originalContract')}`,
        duration: '',
        startDate: new Date(),
        endDate: new Date(),
        contractNumber: '1',
        position: '',
        insurance: '',
        salary: '',
        PC1: '',
        PC2: '',
        PC3: '',
        PC4: '',
        PC5: '',
        total: '',
        note: '',
      },
      {
        id:0,
        contractType: '',
        appendix: `${t('appendix')} 01`,
        duration: '',
        startDate: new Date(),
        endDate: new Date(),
        contractNumber: '1',
        position: '',
        insurance: '',
        salary: '',
        PC1: '',
        PC2: '',
        PC3: '',
        PC4: '',
        PC5: '',
        total: '',
        note: '',
      },
      {
        id:0,
        contractType: '',
        appendix: `${t('appendix')} 02`,
        duration: '',
        startDate: new Date(),
        endDate: new Date(),
        contractNumber: '1',
        position: '',
        insurance: '',
        salary: '',
        PC1: '',
        PC2: '',
        PC3: '',
        PC4: '',
        PC5: '',
        total: '',
        note: '',
      },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {fields?.map((field, index) => {
        return (
          <Fragment key={field.id}>
            <TableRow>
              <TableCell
                style={{
                  position: 'sticky',
                  left: 0,
                  backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
                  zIndex: 8,
                }}
                padding="checkbox"
              >
                <RHFCheckbox label="" name={`probationaryDetail[${index}].isProbationary`} />
              </TableCell>
              <TableCell>{values?.[index]?.contractType}</TableCell>
              <TableCell>{values?.[index]?.appendix}</TableCell>
              <TableCell>
                <RHFDatePicker
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].duration`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFDatePicker
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].startDate`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFDatePicker
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].endDate`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].contractNo`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].position`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].insurance`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].salary`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].PC1`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].PC2`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].PC3`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].PC4`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].PC5`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].total`}
                  shrink={false}
                />
              </TableCell>
              <TableCell>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name={`probationaryDetail[${index}].note`}
                  shrink={false}
                />
              </TableCell>
            </TableRow>
          </Fragment>
        );
      })}
    </>
  );
};

export default ProbationarySection;
