import { useState } from "react";
import { Box, Fade, IconButton, Badge } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ChatBox from "./ChatBox";

interface ChatWidgetProps {
  lessonId: string;
  courseId: string;
}

export default function ChatWidget({ lessonId, courseId }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            bottom: 70,
            right: 0,
            visibility: open ? "visible" : "hidden",
            transition: "transform 0.3s ease",
          }}
        >
          <ChatBox
            onClose={() => setOpen(false)}
            courseId={courseId}
            lessonId={lessonId}
          />
        </Box>
      </Fade>

      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
        sx={{
          bgcolor: open ? "#6366F1" : "#ffffff",
          color: open ? "#ffffff" : "#6366F1",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          p: 1.2,
          width: 56,
          height: 56,
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: open ? "#4F46E5" : "#F5F5F5",
            transform: "translateY(-4px)",
          },
        }}
      >
        <Badge color="error">
          {open ? (
            <CloseIcon fontSize="medium" />
          ) : (
            <ChatBubbleOutlineIcon fontSize="medium" />
          )}
        </Badge>
      </IconButton>
    </Box>
  );
}
