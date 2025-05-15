import React, { useRef, useEffect } from "react";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { Message } from "./ChatBox";
import { useAppSelector } from "@/hooks/useStore";
import { userSelector } from "@/features/account";
import ReactMarkdown from "react-markdown";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(userSelector);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {messages.map((message, index) => (
        <Box
          key={message.id || index}
          sx={{
            display: "flex",
            flexDirection: message.sender === "user" ? "row-reverse" : "row",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          {message.sender === "bot" && (
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/4712/4712010.png"
              alt="AI"
              sx={{ width: 36, height: 36 }}
            />
          )}

          <Box
            sx={{
              maxWidth: "75%",
              p: 1.5,
              borderRadius: 2,
              bgcolor: message.sender === "user" ? "#6366F1" : "#F5F7FF",
              color: message.sender === "user" ? "white" : "text.primary",
              position: "relative",
            }}
          >
            {message.isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <>
                <Typography
                  component="div"
                  variant="body2"
                  sx={{
                    wordBreak: "break-word",
                    "& p": { my: 0.5 },
                    "& code": {
                      bgcolor:
                        message.sender === "user"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      p: 0.5,
                      borderRadius: 1,
                    },
                  }}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 0.5,
                    textAlign: "right",
                    opacity: 0.7,
                  }}
                >
                  {formatTime(message.timestamp)}
                </Typography>
              </>
            )}
          </Box>

          {message.sender === "user" && (
            <Avatar
              src={user?.avatarUrl}
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#E0E7FF",
                color: "#6366F1",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;
