import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "@/hooks/useStore";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { accountSelector } from "@/features/account";
import { Comment } from "@/types";
import CommentItem from "./CommentItem";
import { createComment } from "@/services/commentService";
import { toast } from "react-toastify";

interface CommentProps {
  comments: Comment[];
  lessonId: string;
  refetch: () => void;
}

export default function Comments({
  comments,
  refetch,
  lessonId,
}: CommentProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const currentUser = useAppSelector(accountSelector).user;

  const loading = false; // Simulate loading state

  // States
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Add a new comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await createComment({
        lessonId: lessonId,
        content: commentText,
        parentId: null,
      });

      if (res.statusCode === 201) {
        toast.success("Bình luận thành công!");
        refetch();
      } else {
        toast.error("Đã có lỗi xảy ra.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra.");
    }

    setCommentText("");
  };

  // Add a reply to a comment
  const handleAddReply = async (parentId: string) => {
    if (!replyText.trim()) return;

    try {
      const res = await createComment({
        lessonId: lessonId,
        content: replyText,
        parentId: parentId,
      });

      if (res.statusCode === 201) {
        toast.success("Bình luận thành công!");
        refetch();
      } else {
        toast.error("Đã có lỗi xảy ra.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra.");
    }

    setReplyText("");
    setReplyingTo(null);
  };

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: vi,
    });
  };

  // Count total comments (including children/replies)
  const countAllComments = (comments: Comment[]): number => {
    return comments?.reduce((total, comment) => {
      return total + 1 + countAllComments(comment?.children || []);
    }, 0);
  };

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Thảo luận ({countAllComments(comments)})
      </Typography>

      {/* Add new comment */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            src={currentUser?.avatarUrl}
            alt={currentUser?.name || "User"}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Thêm bình luận của bạn..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: isDark ? alpha("#fff", 0.05) : alpha("#000", 0.03),
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                disableElevation
                endIcon={<SendIcon />}
                onClick={handleAddComment}
                disabled={!commentText.trim()}
              >
                Bình luận
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* List of comments */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="text.secondary">Đang tải bình luận...</Typography>
        </Box>
      ) : comments.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            bgcolor: isDark ? alpha("#fff", 0.03) : alpha("#000", 0.02),
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              isDark={isDark}
              replyingTo={replyingTo}
              replyText={replyText}
              currentUser={currentUser}
              onSetReplyingTo={setReplyingTo}
              onSetReplyText={setReplyText}
              onAddReply={handleAddReply}
              formatRelativeTime={formatRelativeTime}
              level={1}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
