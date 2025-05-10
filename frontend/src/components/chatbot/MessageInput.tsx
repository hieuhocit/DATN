import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  CircularProgress,
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

  return (
    <Box>
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.5,
        }}
      >
        <InputBase
          placeholder="Nhập tin nhắn..."
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={20} thickness={4} />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Paper>
    </Box>
  );
};

export default MessageInput;
