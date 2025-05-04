import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Stack,
  Collapse,
  InputAdornment,
  alpha,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import { Comment, User } from "@/types";

interface CommentItemProps {
  comment: Comment;
  isDark: boolean;
  replyingTo: string | null;
  replyText: string;
  currentUser: User | null;
  onSetReplyingTo: (id: string | null) => void;
  onSetReplyText: (text: string) => void;
  onAddReply: (parentId: string) => void;
  formatRelativeTime: (date: string) => string;
  level: number;
  isReply?: boolean;
}

export default function CommentItem({
  comment,
  isDark,
  replyingTo,
  replyText,
  currentUser,
  onSetReplyingTo,
  onSetReplyText,
  onAddReply,
  formatRelativeTime,
  isReply = false,
  level,
}: CommentItemProps) {
  // Get the main user who created the comment
  const mainUser = comment.user[0];

  if (!mainUser) {
    return null;
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: isReply ? 0 : "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        borderRadius: isReply ? 0 : 2,
        bgcolor: "transparent",
      }}
    >
      <CardContent
        sx={{ p: isReply ? 0 : 2, "&:last-child": { pb: isReply ? 0 : 2 } }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            src={mainUser?.avatarUrl}
            alt={mainUser?.name || "User"}
            sx={{ width: isReply ? 32 : 40, height: isReply ? 32 : 40 }}
          />
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {mainUser?.name || "Người dùng"}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {formatRelativeTime(comment.createdAt)}
              </Typography>
            </Box>

            {/* Comment content */}
            <Typography
              variant="body2"
              sx={{ mt: 0.5, whiteSpace: "pre-wrap" }}
            >
              {comment.content}
            </Typography>

            {/* Comment actions */}
            {level < 3 && (
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                <Button
                  startIcon={<ReplyIcon fontSize="small" />}
                  size="small"
                  onClick={() =>
                    onSetReplyingTo(
                      replyingTo === comment._id ? null : comment._id
                    )
                  }
                  sx={{ ml: 1, textTransform: "none" }}
                >
                  Trả lời
                </Button>
              </Box>
            )}
            {/* Reply input */}
            <Collapse in={replyingTo === comment._id}>
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Avatar
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.name || "User"}
                  sx={{ width: 32, height: 32 }}
                />
                <TextField
                  fullWidth
                  size="small"
                  placeholder={`Trả lời ${mainUser?.name}...`}
                  value={replyText}
                  onChange={(e) => onSetReplyText(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => onAddReply(comment._id)}
                          disabled={!replyText.trim()}
                        >
                          <SendIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: isDark
                        ? alpha("#fff", 0.05)
                        : alpha("#000", 0.03),
                    },
                  }}
                />
              </Box>
            </Collapse>

            {/* Replies/Children */}
            {comment.children && comment.children.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  ml: isReply ? 0 : 2,
                  pl: 2,
                  borderLeft: `2px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                  }`,
                }}
              >
                <Stack spacing={2}>
                  {comment.children.map((reply) => (
                    <CommentItem
                      key={reply._id}
                      comment={reply}
                      isDark={isDark}
                      replyingTo={replyingTo}
                      replyText={replyText}
                      currentUser={currentUser}
                      onSetReplyingTo={onSetReplyingTo}
                      onSetReplyText={onSetReplyText}
                      onAddReply={onAddReply}
                      formatRelativeTime={formatRelativeTime}
                      isReply={true}
                      level={level + 1}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
