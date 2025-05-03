import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Message } from "@pages/chatGPT/type";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        px: 1,
        py: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {messages.map((msg) => (
        <Box
          key={msg.id}
          alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
          sx={{
            bgcolor: msg.sender === "user" ? theme.palette.primary.main : "grey.300",
            color: msg.sender === "user" 
              ? theme.palette.mode === "light" ? "black" : "white" // Chữ đen ở light mode, trắng ở dark mode
              : "black",
            borderRadius: 2,
            px: 1.5,
            py: 1,
            maxWidth: "80%",
            wordBreak: "break-word", // Ngắt chữ nếu quá dài
          }}
        >
          <Typography variant="body2">{msg.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;