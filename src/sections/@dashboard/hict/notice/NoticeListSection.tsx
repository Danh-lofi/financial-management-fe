import { NotificationItem } from 'layouts/dashboard/header/NotificationsPopover';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeId, getListNoticeFull, getNoticeHistories, markViewNotice } from 'redux/slices/dashboard/notice';
import { dispatch, useSelector } from 'redux/store';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs/CustomBreadcrumbs';
import PageWrapper from '@/components/page-wrapper';
import { useSettingsContext } from '@/components/settings';
import { TablePaginationCustom } from '@/components/table';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { Card, Container, List } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// @mui


// routes







// ----------------------------------------------------------------------

const  NoticeListSection = () => {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const { t } = useLocales();
  const { id } = useParams();
  const { noticeListFull,noticeListCount } = useSelector((state) => state.notice);
  const [params, setParams] = useState({
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE - 5,
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
  });
  const handleClickNotice = async (item: any) => {
    await dispatch(markViewNotice(item));
    // await dispatch(
    //   getNoticeHistories({
    //     employeeId: item.employee_id,
    //     pageSize: DEFAULT_PAGINATION.PAGE_ONE,
    //     pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    //     infoType: item.type,
    //   })
    // );
    // await dispatch(getEmployeeId(item.employee_id));
    navigate(`/dashboard/hict/notice/notice-details/${item.type}/${item.employee_id}`);
  };
  
  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setParams({
        ...params,
        pageIndex: newPage + 1,
      });
    },
    [params]
  );
  console.log(noticeListFull)
  useEffect(() => {
    // dispatch(getListNoticeFull(params));
  }, [params]);
  return (
    <Card sx={{ pt: 5, px: 5,mb:3 }}>
      <List disablePadding sx={{borderRadius:'10px'}}>
        {noticeListFull?.map((item: any) => {
          return <NotificationItem handleClickNotice={handleClickNotice} notice={item} />;
        })}
      </List>
      <TablePaginationCustom
        count={noticeListCount}
        page={params.pageIndex - 1}
        rowsPerPage={params.pageSize}
        onPageChange={onChangePage}
        rowsPerPageOptions={[5]}
      />
    </Card>
  );
}

export default NoticeListSection
