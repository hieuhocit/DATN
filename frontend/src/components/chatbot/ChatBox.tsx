import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { chatWithAI } from "@/services/chatServices";
import { deleteHistory } from "@/services/aiService";

export interface Message {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatBoxProps {
  lessonId?: string;
  courseId?: string;
  onClose: () => void;
}

const WELCOME_MESSAGE =
  "Xin chào! Tôi là trợ lý AI học tập. Bạn có thể hỏi tôi bất kỳ câu hỏi nào liên quan đến bài học này.";

const ChatBox: React.FC<ChatBoxProps> = ({
  courseId = "",
  lessonId = "",
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Add welcome message on first mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleSend = async (text: string) => {
    // Generate a temporary ID for this message
    const messageId = Date.now().toString();

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { id: messageId, sender: "user", content: text, timestamp: new Date() },
    ]);

    // Add temporary bot message with loading state
    setMessages((prev) => [
      ...prev,
      {
        id: `${messageId}-response`,
        sender: "bot",
        content: "",
        timestamp: new Date(),
        isLoading: true,
      },
    ]);

    setIsLoading(true);

    try {
      const res = await chatWithAI({
        courseId: courseId,
        lessonId: lessonId,
        message: text,
      });

      // Update the temporary message with the actual response
      if (res.statusCode === 200) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === `${messageId}-response`
              ? { ...msg, content: res.data, isLoading: false }
              : msg
          )
        );
      } else {
        // Handle error
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === `${messageId}-response`
              ? {
                  ...msg,
                  content:
                    "Xin lỗi, tôi không thể trả lời ngay bây giờ. Vui lòng thử lại sau.",
                  isLoading: false,
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === `${messageId}-response`
            ? {
                ...msg,
                content: "Đã xảy ra lỗi khi xử lý yêu cầu của bạn.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = async () => {
    await deleteHistory(courseId);
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        content: WELCOME_MESSAGE,
        timestamp: new Date(),
      },
    ]);
  };

  const suggestedQuestions = [
    "Bạn có thể giải thích thêm về khái niệm này?",
    "Làm thế nào để áp dụng kiến thức này?",
    "Hãy đưa ra một vài ví dụ liên quan đến bài học này.",
  ];

  return (
    <Paper
      elevation={4}
      sx={{
        width: 480,
        height: 480,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#6366F1",
          color: "white",
          p: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/4712/4712010.png"
            sx={{ width: 32, height: 32, mr: 1.5 }}
          />
          <Typography variant="subtitle1" fontWeight={500}>
            AI Trợ giúp học tập
          </Typography>
        </Box>
        <Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "white", mr: 0.5 }}
          >
            <MinimizeIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={clearMessages}
            size="small"
            sx={{ color: "white", mr: 0.5 }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Content area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "calc(480px - 66px - 76px)",
        }}
      >
        {/* Messages */}
        <MessageList messages={messages} />

        {/* Suggested questions */}
        {messages.length < 3 && (
          <Box
            sx={{ px: 2, pb: 1.5, display: "flex", flexWrap: "wrap", gap: 1 }}
          >
            {suggestedQuestions.map((q, i) => (
              <Chip
                key={i}
                label={q}
                size="small"
                onClick={() => handleSend(q)}
                sx={{
                  bgcolor: "#F5F7FF",
                  borderColor: "#E0E3FF",
                  color: "#6366F1",
                  "&:hover": { bgcolor: "#E0E3FF" },
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Input area */}
      <Box sx={{ p: 1.5, borderTop: "1px solid #EAECEF" }}>
        <MessageInput onSend={handleSend} isLoading={isLoading} />
      </Box>
    </Paper>
  );
};

export default ChatBox;
