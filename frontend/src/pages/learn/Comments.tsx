// Comments.tsx
import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Collapse,
  TextField,
  Button,
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Comment {
  id: number;
  userId: number;
  name: string;
  content: string;
  parentId: number | null;
  createdAt: string;
}

interface CommentsProps {
  comments: Comment[];
  onComment: (content: string) => void;
  onReply: (parentId: number, content: string) => void;
  userId: number;
  lessonId: number;
}

const getRelativeTime = (date: string) => {

  const commentDate = new Date(date);

  return commentDate.toLocaleString('vi-VN');
};

const Comment = ({ comment, replies, onReply }: { comment: Comment; replies: Comment[]; onReply: (parentId: number, content: string) => void }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setReplyOpen(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        pl: comment.parentId ? 4 : 0, // Chỉ thụt lề cho bình luận con
      }}
    >
      <Avatar sx={{ width: 32, height: 32 }}>{comment.name[0]}</Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {comment.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getRelativeTime(comment.createdAt)}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setReplyOpen(!replyOpen)}>
            <ReplyIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mt: 0.5 }}>
          {comment.content}
        </Typography>
        <Collapse in={replyOpen}>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Viết trả lời..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            {replyContent.trim() && (
              <Button
                variant="contained"
                size="small"
                onClick={handleReplySubmit}
              >
                Gửi
              </Button>
            )}
          </Box>
        </Collapse>
        {replies.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {replies.length} trả lời
              </Typography>
            </Box>
            <Collapse in={showReplies}>
              {replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  replies={[]}
                  onReply={onReply}
                />
              ))}
            </Collapse>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default function Comments({ comments, onComment, onReply, userId, lessonId }: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [isCommentInputOpen, setIsCommentInputOpen] = useState(false);

  const parentComments = comments.filter((comment) => !comment.parentId);
  const getReplies = (parentId: number) =>
    comments.filter((comment) => comment.parentId === parentId);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment('');
      setIsCommentInputOpen(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {comments.length} bình luận
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsCommentInputOpen(true)}
        >
          Gửi bình luận
        </Button>
      </Box>

      <Collapse in={isCommentInputOpen}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32 }}>{'U'}</Avatar>
          <TextField
            fullWidth
            size="small"
            placeholder="Nhập bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {newComment.trim() && (
            <Button
              variant="contained"
              size="small"
              onClick={handleCommentSubmit}
            >
              Gửi
            </Button>
          )}
        </Box>
      </Collapse>

      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Chưa có bình luận nào. Hãy là người đầu tiên để lại bình luận!
        </Typography>
      ) : (
        parentComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
            onReply={onReply}
          />
        ))
      )}
    </Box>
  );
}