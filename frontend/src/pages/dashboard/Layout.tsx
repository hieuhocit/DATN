// src/layouts/DashboardLayout.tsx
import { Box } from '@mui/material';

import SideBar from '@/components/dashboard/SideBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* <SideBar/> */}
        <SideBar isDark={false} isCollapsed={false} onClose={() => { }} />
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ p: 3 }}><Outlet /></Box>
        </Box>
    </Box>
);

export default DashboardLayout;
