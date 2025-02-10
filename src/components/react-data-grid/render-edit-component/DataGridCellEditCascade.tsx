/* eslint-disable @typescript-eslint/no-explicit-any */

import WCascadeTable from '@/components/common/WCascadeTable';

export function renderCellEditCascade({
  row,
  key,
  options,
  onRowChange,
  baseColumn,
}: {
  row: any;
  key: string;
  options: any[];
  onRowChange: (value: any, isEdit: boolean) => void;
  baseColumn: any;
}) {
  return (
    <WCascadeTable
      style={{
        width: '100%',
        height: '100%',
      }}
      autoFocus
      value={row[key]}
      options={options}
      onGetData={(value: any) => {
        onRowChange({ ...row, [key]: value, isEdit: !row.isNew }, true);
        baseColumn?.onCellChange?.({ row, key, value });
      }}
      allowClear={baseColumn.allowClear ?? false}
    />
  );
}
