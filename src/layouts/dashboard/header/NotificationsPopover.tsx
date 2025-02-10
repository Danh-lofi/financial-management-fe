import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { INotice } from '@/@types/notice';
import NoticeApi from '@/apis/notice.api';
import { IconButtonAnimate } from '@/components/animate';
import Iconify from '@/components/iconify';
import MenuPopover from '@/components/menu-popover';
import Scrollbar from '@/components/scrollbar';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import {
  getEmployeeId,
  getListNotice,
  getNoticeHistories,
  markViewNotice,
} from '@/redux/slices/dashboard/notice';
import { dispatch, useSelector } from '@/redux/store';
import { fToNow } from '@/utils/formatTime';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

// @mui






// utils


// _mock_

// components






// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
  });
  const { noticeList,totalNotSeen } = useSelector((state) => state.notice);
 
  const [notifications, setNotifications] = useState(_notifications);
  const { t } = useLocales();
  const totalUnRead = noticeList?.filter((item) => item.isViewed === true).length ?? 0;
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setParams({
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    });
    setOpenPopover(null);
  };

  const handleClickNotice = async (item: any) => {

    setParams({
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    });
    setOpenPopover(null);
    navigate(`/dashboard/hict/notice/notice-details/${item.type}/${item.employee_id}`);
  };
  const handleMarkAllAsRead = async () => {
    let errorCount = 0;

    noticeList
      ?.filter((notice) => {
        return notice.isViewed === false;
      })
      .forEach((item) => {
        NoticeApi.put(item.id).catch(() => {
          errorCount += 1;
        });
      });
    if (errorCount === 0) {
      setParams({
        ...params,
      });
    }
  };

  const handleViewAll = (e: any) => {
    setParams({
      ...params,
      pageSize: params.pageSize + 10,
    });
  };

  useEffect(() => {
    // dispatch(getListNotice(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalNotSeen} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{t('notifications')}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('youHave')} {totalNotSeen} {t('unReadMess')}
            </Typography>
          </Box>

          {totalNotSeen > 0 && (
            <Tooltip title={t('markAll')}>
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' }, maxHeight: '480px' }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {t('unRead')}
              </ListSubheader>
            }
          >
            {noticeList
              ?.filter((notice) => {
                return notice.isViewed === false;
              })
              .map((item) => {
                return <NotificationItem handleClickNotice={handleClickNotice} notice={item} />;
              })}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {t('readed')}
              </ListSubheader>
            }
          >
            {noticeList
              ?.filter((notice) => {
                return notice.isViewed === true;
              })
              .map((item) => {
                return <NotificationItem handleClickNotice={handleClickNotice} notice={item} />;
              })}
          </List>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ p: 1 }}>
            <Button fullWidth disableRipple onClick={handleViewAll}>
              {t('viewMore')}
              {/* <NavLink to="/dashboard/hict/notice/list">View All</NavLink> */}
            </Button>
          </Box>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

type Props = {
  handleClickNotice?: any;
  notice?: INotice;
};

export function NotificationItem({ handleClickNotice, notice }: Props) {

  return (

    <ListItemButton
      onClick={() => {
        handleClickNotice(notice);
      }}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        borderRadius:'10px',
        ...(!notice?.isViewed && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }} src={notice?.avatar_url}/>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography variant="subtitle2">
            {notice?.fullName ?? notice?.employee_id}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              &nbsp; {notice?.message}
            </Typography>
          </Typography>
        }
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notice?.createdAt)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: any) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
