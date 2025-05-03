import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Message } from "@pages/chatGPT/type";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { chatWithAI } from "@services/chatServices";

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: text,
    };

    let botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      content: "",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setIsLoading(true);

    const conversation = [
      ...messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content,
      })),
      { role: "user", content: text },
    ];

    try {
      const response = await chatWithAI(text);
      botMsg.content = response;
    } catch (error) {
      botMsg.content = "Xin lỗi, có lỗi xảy ra khi kết nối đến AI.";
    } finally {
      setMessages((prev) =>
        prev.map((m) => (m.id === botMsg.id ? botMsg : m))
      );
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 320,
        height: 400,
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="h6">AI hỗ trợ học tập</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} isLoading={isLoading} />
    </Paper>
  );
};

export default ChatBox;
