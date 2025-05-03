import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ChatBox from "./ChatBox";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1300 }}>
      {/* ChatBox hiển thị độc lập với vị trí của nút */}
      {open && (
        <Box sx={{ position: "absolute", bottom: 64, right: 0 }}>
          <ChatBox onClose={() => setOpen(false)} />
        </Box>
      )}
      {/* Nút IconButton cố định kích thước và vị trí */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          bgcolor: "white",
          boxShadow: 2,
          p: 0,
          width: 48,
          height: 48,
          "&:hover": { bgcolor: "grey.200" },
        }}
      >
        <img
          src="https://png.pngtree.com/png-vector/20230316/ourmid/pngtree-admin-and-customer-service-job-vacancies-vector-png-image_6650726.png"
          alt="AI"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default ChatWidget;