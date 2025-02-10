import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import calendarReducer from './slices/calendar';
import chatReducer from './slices/chat';
import bankingReducer from './slices/dashboard/banking';
import dayoffReducer from './slices/dashboard/dayoff';
import departmentReducer from './slices/dashboard/department';
import districtReducer from './slices/dashboard/district';
import employeeReducer from './slices/dashboard/employee';
import medicalFacilityReducer from './slices/dashboard/medicalFacility';
import nationalityReducer from './slices/dashboard/nationality';
import noticeReducer from './slices/dashboard/notice';
import objectTypeReducer from './slices/dashboard/objectType';
import positionReducer from './slices/dashboard/position';
import projectReducer from './slices/dashboard/project';
import provinceReducer from './slices/dashboard/province';
import contractReducer from './slices/dashboard/contract';
import userReducer from './slices/dashboard/user';
import wardReducer from './slices/dashboard/ward';
import kanbanReducer from './slices/kanban';
import mailReducer from './slices/mail';
import productReducer from './slices/product';
import navReducer from './slices/nav/navSlice';
import driverhostReducer from './slices/driverhost/driverhost';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  driverhost: driverhostReducer,
  notice: noticeReducer,
  user: userReducer,
  banking: bankingReducer,
  contract: contractReducer,
  objectType: objectTypeReducer,
  medicalFacility: medicalFacilityReducer,
  nationality: nationalityReducer,
  department: departmentReducer,
  dayoff: dayoffReducer,
  position: positionReducer,
  ward: wardReducer,
  district: districtReducer,
  province: provinceReducer,
  employee: employeeReducer,
  project: projectReducer,
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  nav: navReducer,
  product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;
