import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1,
        borderRadius: 3,
        bgcolor: "#F5F7FF",
        border: "1px solid #E0E3FF",
      }}
    >
      <InputBase
        placeholder="Nhập câu hỏi của bạn..."
        fullWidth
        multiline
        maxRows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        sx={{
          fontSize: "0.95rem",
          color: "#333",
        }}
      />

      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Tooltip title="Gửi tin nhắn">
          <IconButton
            type="submit"
            disabled={isLoading || !text.trim()}
            sx={{
              color: text.trim() ? "#6366F1" : "#A0A0A0",
              "&.Mui-disabled": {
                color: "#CCCCCC",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} thickness={4} color="primary" />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default MessageInput;
