// src/layouts/DashboardLayout.tsx
import { Box } from '@mui/material';

import SideBar from '@/components/dashboard/SideBar';
import { Outlet } from 'react-router-dom';
// Notification
import { ToastContainer, Bounce } from "react-toastify";

const DashboardLayout = () => (
    <>
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* <SideBar/> */}
            <SideBar isDark={false} isCollapsed={false} onClose={() => { }} />
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ p: 3 }}><Outlet /></Box>
            </Box>
        </Box>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
        />
    </>
);

export default DashboardLayout;
