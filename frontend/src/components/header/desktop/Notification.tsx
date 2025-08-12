// React
import { useState } from "react";

// MUI
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import {
  Button,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Icons
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircleIcon from "@mui/icons-material/Circle";

// Components
import Image from "@/components/common/Image";
import { TwoLineTypography } from "@/components/typography";

// Redux
import { useAppSelector } from "@/hooks/useStore";
import { userSelector } from "@/features/account";
import { useNotifications } from "@/contexts/NotificationContext";
import { Notification as NotificationType } from "@/types";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const data = useNotifications();
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    onDeleteNotification,
    onMarkAllAsRead,
    onDeleteAllNotifications,
    onMarkAsRead,
  } = data || {
    notifications: [],
    unreadCount: 0,
    onDeleteNotification: () => {},
    onMarkAllAsRead: () => {},
    onMarkAsRead: () => {},
    onDeleteAllNotifications: () => {},
  };

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = useAppSelector(userSelector);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleGoToNotification = (notification: NotificationType) => {
    navigate(notification.referenceUrl);
    onMarkAsRead(notification._id);
    handleClose();
  };

  const userNotifications = notifications.filter(
    (notification) => notification.to === "user"
  );

  const instructorNotifications = notifications.filter(
    (notification) => notification.to === "instructor"
  );

  const adminNotifications = notifications.filter(
    (notification) => notification.to === "admin"
  );

  return (
    <Box>
      <Tooltip title="Thông báo">
        <IconButton onClick={handleClick} size="large" color="inherit">
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: {
            width: "400px",
            p: 0,
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              textColor="secondary"
              indicatorColor="secondary"
            >
              {user?.role !== "admin" && (
                <Tab
                  sx={{
                    textTransform: "capitalize",
                  }}
                  label="Học sinh"
                  {...a11yProps(0)}
                />
              )}
              {["instructor"].includes(user?.role || "") && (
                <Tab
                  sx={{
                    textTransform: "capitalize",
                  }}
                  label="Giáo viên"
                  {...a11yProps(1)}
                />
              )}
              {user?.role === "admin" && (
                <Tab
                  sx={{
                    textTransform: "capitalize",
                  }}
                  label="Quản trị"
                  {...a11yProps(2)}
                />
              )}
            </Tabs>
          </Box>

          {user?.role !== "admin" && (
            <CustomTabPanel value={value} index={0}>
              <List sx={{ width: "100%", p: 0, bgcolor: "background.paper" }}>
                {userNotifications.length > 0 &&
                  userNotifications.map((notification) => (
                    <ListItemButton
                      onClick={handleGoToNotification.bind(null, notification)}
                      key={notification._id}
                    >
                      <NotificationItem
                        notification={notification}
                        onDelete={onDeleteNotification}
                        onMarkAsRead={onMarkAsRead}
                      />
                    </ListItemButton>
                  ))}
                {userNotifications.length === 0 && (
                  <Stack
                    sx={{
                      width: 1,
                      height: "100px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    direction={"column"}
                    gap={1}
                  >
                    <Typography sx={{ fontSize: "0.85rem" }} variant="body1">
                      Không có thông báo nào.
                    </Typography>
                  </Stack>
                )}
              </List>
              {userNotifications.length > 0 && (
                <Stack
                  direction={"row"}
                  gap={1}
                  justifyContent={"space-between"}
                  py={1}
                  px={2}
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      onMarkAllAsRead(userNotifications.map((n) => n._id));
                    }}
                  >
                    <Typography
                      fontSize={"0.85rem"}
                      sx={{
                        textDecoration: "underline",
                      }}
                      color="info"
                    >
                      Đánh dấu tất cả là đã đọc
                    </Typography>
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      onDeleteAllNotifications(
                        userNotifications.map((n) => n._id)
                      );
                    }}
                  >
                    <Typography
                      fontSize={"0.85rem"}
                      sx={{
                        textDecoration: "underline",
                      }}
                      color="info"
                    >
                      Xoá tất cả
                    </Typography>
                  </Button>
                </Stack>
              )}
            </CustomTabPanel>
          )}
          {["instructor"].includes(user?.role || "") && (
            <CustomTabPanel value={value} index={1}>
              <List sx={{ width: "100%", p: 0, bgcolor: "background.paper" }}>
                {instructorNotifications.length > 0 &&
                  instructorNotifications.map((notification) => (
                    <ListItemButton
                      onClick={handleGoToNotification.bind(null, notification)}
                      key={notification._id}
                    >
                      <NotificationItem
                        notification={notification}
                        onDelete={onDeleteNotification}
                        onMarkAsRead={onMarkAsRead}
                      />
                    </ListItemButton>
                  ))}
                {instructorNotifications.length === 0 && (
                  <Stack
                    sx={{
                      width: 1,
                      height: "100px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    direction={"column"}
                    gap={1}
                  >
                    <Typography sx={{ fontSize: "0.85rem" }} variant="body1">
                      Không có thông báo nào.
                    </Typography>
                  </Stack>
                )}
              </List>
              {instructorNotifications.length > 0 && (
                <Stack
                  direction={"row"}
                  gap={1}
                  justifyContent={"space-between"}
                  py={1}
                  px={2}
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      onMarkAllAsRead(
                        instructorNotifications.map((n) => n._id)
                      );
                    }}
                  >
                    <Typography
                      fontSize={"0.85rem"}
                      sx={{
                        textDecoration: "underline",
                      }}
                      color="info"
                    >
                      Đánh dấu tất cả là đã đọc
                    </Typography>
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      onDeleteAllNotifications(
                        instructorNotifications.map((n) => n._id)
                      );
                    }}
                  >
                    <Typography
                      fontSize={"0.85rem"}
                      sx={{
                        textDecoration: "underline",
                      }}
                      color="info"
                    >
                      Xoá tất cả
                    </Typography>
                  </Button>
                </Stack>
              )}
            </CustomTabPanel>
          )}
          {user?.role === "admin" && (
            <CustomTabPanel value={value} index={0}>
              <List sx={{ width: "100%", p: 0, bgcolor: "background.paper" }}>
                {adminNotifications.length > 0 &&
                  adminNotifications.map((notification) => (
                    <ListItemButton
                      onClick={handleGoToNotification.bind(null, notification)}
                      key={notification._id}
                    >
                      <NotificationItem
                        notification={notification}
                        onDelete={onDeleteNotification}
                        onMarkAsRead={onMarkAsRead}
                      />
                    </ListItemButton>
                  ))}
                {adminNotifications.length === 0 && (
                  <Stack
                    sx={{
                      width: 1,
                      height: "100px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    direction={"column"}
                    gap={1}
                  >
                    <Typography sx={{ fontSize: "0.85rem" }} variant="body1">
                      Không có thông báo nào.
                    </Typography>
                  </Stack>
                )}
              </List>
              {adminNotifications.length > 0 && (
                <Stack
                  direction={"row"}
                  gap={1}
                  justifyContent={"space-between"}
                  py={1}
                  px={2}
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      onMarkAllAsRead(adminNotifications.map((n) => n._id));
                    }}
                  >
                    <Typography
                      fontSize={"0.85rem"}
                      sx={{
                        textDecoration: "underline",
                      }}
                      color="info"
                    >
                      Đánh dấu tất cả là đã đọc
                    </Typography>
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      onDeleteAllNotifications(
                        adminNotifications.map((n) => n._id)
                      );
                    }}
                  >
                    <Typography
                      fontSize={"0.85rem"}
                      sx={{
                        textDecoration: "underline",
                      }}
                      color="info"
                    >
                      Xoá tất cả
                    </Typography>
                  </Button>
                </Stack>
              )}
            </CustomTabPanel>
          )}
        </Box>
      </Menu>
    </Box>
  );
}

function NotificationItem({
  notification,
  onDelete,
  onMarkAsRead,
}: {
  notification: NotificationType;
  onDelete: (notificationId: string) => void;
  onMarkAsRead: (notificationId: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [showMore, setShowMore] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{ width: 1, cursor: "pointer" }}
      direction={"row"}
      gap={1}
      alignItems={"flex-start"}
      position={"relative"}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
    >
      <Box
        sx={{
          width: "70px",
          position: "relative",
          aspectRatio: "1/1",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Image src="/images/image-placeholder.png" fill />
      </Box>
      <Stack direction={"column"} gap={0}>
        <Box>
          <TwoLineTypography sx={{ fontSize: "1rem" }} variant="body1">
            {notification.title}
          </TwoLineTypography>
          {!notification.isRead && (
            <CircleIcon
              color="info"
              sx={{
                position: "absolute",
                top: 2,
                right: 0,
                fontSize: "16px",
              }}
            />
          )}
        </Box>
        <Typography sx={{ opacity: 0.6 }} fontSize={"0.75rem"} variant="body1">
          {new Date(notification.createdAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </Typography>
        <TwoLineTypography
          sx={{ mt: "4px", fontSize: "0.85rem", fontWeight: 400 }}
          variant="body1"
        >
          {notification.message}
        </TwoLineTypography>
      </Stack>

      {showMore && (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            bgcolor: "action.hover",
          }}
          onClick={handleClick}
        >
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClose={(e: any) => {
          e.stopPropagation();
          e.preventDefault();
          handleClose();
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {!notification.isRead && (
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onMarkAsRead(notification._id);
              handleClose();
            }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} fontSize="small" color="success" />
            Đánh dấu là đã đọc
          </MenuItem>
        )}
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(notification._id);
            handleClose();
          }}
        >
          <DeleteForeverIcon sx={{ mr: 1 }} fontSize="small" color="error" />
          Xoá thông báo
        </MenuItem>
      </Menu>
    </Stack>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
