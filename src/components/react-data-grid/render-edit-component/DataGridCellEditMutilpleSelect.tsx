import WMutilpeSelectTable from "@/components/common/WMutilpeSelectTable";

export function renderCellEditMutilpleSelect({
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
    <WMutilpeSelectTable
      style={{
        width: "100%",
        height: "100%",
      }}
      autoFocus
      value={row[key]}
      options={options}
      onGetData={(value: any) => {
        console.log(value);

        onRowChange({ ...row, [key]: value, isEdit: !row.isNew }, true);
        baseColumn?.onCellChange?.({ row, key, value });
      }}
      // autoFocus
      allowClear={baseColumn.allowClear ?? false}
    />
  );
}
