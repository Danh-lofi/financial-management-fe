/* eslint-disable @typescript-eslint/no-explicit-any */

import WToolbarTable from '@/components/common/WToolbarTable';

export function renderCellEditToolBar({
  row,
  handleConfirm,
  buttonConfig = [],
}: {
  row: any;
  key: string;
  options?: any[];
  onRowChange: () => void;
  handleConfirm: (value: any) => void;
  buttonConfig: any[];
}) {
  return (
    <WToolbarTable
      style={{ padding: '0px !important' }}
      buttonConfig={buttonConfig}
      handleConfirm={(props: any) => handleConfirm({ ...props, value: row })}
    />
  );
}
