type IParamsGetDriverHostBookingList = {
  ContainerCode?: string;
  PinCode?: string;
  DriverNo?: string;
  RemoocNo?: string;
  StartDate?: string;
  EndDate?: string;
  OrderStatus?: string;
  JobModeCode?: string[];
};

type IDriverHostState = {
  listOrder: IOrderTransport[];
};
