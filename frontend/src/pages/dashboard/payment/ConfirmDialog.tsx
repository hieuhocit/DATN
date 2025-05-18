import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

export default function ConfirmDialog({
  title,
  content,
  confirmText,
  open,
  color,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button
          disabled={isLoading}
          onClick={onConfirm}
          variant="contained"
          color={color}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
