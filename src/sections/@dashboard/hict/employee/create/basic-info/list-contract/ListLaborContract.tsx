import { GridColDef } from '@mui/x-data-grid';
import { Dialog } from '@mui/material';
import ItemLaborContract from './ItemLaborContract';
import { useSelector } from '../../../../../../../redux/store';

type IProps = {
  columns: GridColDef[];
  isDisabled: boolean;
  listDisabled: number[];
  loading: boolean;
  openCreate: boolean;
  index: number;
  onUpdateAllowance: (id: number) => void;
  onAddItemDetail: (index: number) => void;
  onProcessRowUpdate: (
    updatedRow: IDetailContract,
    originalRow: IDetailContract,
    contract: IDetailContract[],
    indexOfContract: number
  ) => void;
  onFocus: () => void;
  onBlur: (index: number) => void;
  onSubmitUpdateDetails: (details: IDetailContract[], index: number) => void;
  handleClose: () => void;
};

const ListLaborContract = ({
  columns,
  isDisabled,
  listDisabled,
  loading,
  index,
  openCreate,
  onUpdateAllowance,
  onAddItemDetail,
  onProcessRowUpdate,
  onFocus,
  onBlur,
  onSubmitUpdateDetails,
  handleClose,
}: IProps) => {
  const { contracts } = useSelector((state) => state.contract);
  const contract = contracts.find((item) => item.id === index);
  if (!contract) return null;
  return (
    <Dialog fullWidth maxWidth="lg" open={openCreate} onClose={handleClose}>
      <ItemLaborContract
        contract={contract}
        onUpdateAllowance={onUpdateAllowance}
        onAddItemDetail={onAddItemDetail}
        columns={columns}
        onProcessRowUpdate={onProcessRowUpdate}
        onFocus={onFocus}
        onBlur={onBlur}
        isDisabled={isDisabled}
        listDisabled={listDisabled}
        loading={loading}
        onSubmitUpdateDetails={onSubmitUpdateDetails}
        index={index}
      />
    </Dialog>
  );
};

export default ListLaborContract;
