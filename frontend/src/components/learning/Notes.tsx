import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Drawer,
  TextField,
  IconButton,
  List,
  ListItem,
  Paper,
  Divider,
  Stack,
  Tooltip,
  useTheme,
  alpha,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";
import { Note } from "@/types";
import { createNote, deleteNote, updateNote } from "@/services/noteService";
import { toast } from "react-toastify";
import cloudinary from "cloudinary-video-player";

interface Props {
  notes: Note[];
  courseId: string;
  lessonId: string;
  playerRef: React.RefObject<cloudinary.VideoPlayer | null>;
  refetch: () => void;
  handleClickJumpToLesson: (lessonId: string, position: number) => void;
}

export default function Notes({
  notes,
  courseId,
  lessonId,
  playerRef,
  refetch,
  handleClickJumpToLesson,
}: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const noteColor = isDark ? "#90caf9" : "#1976d2";

  // States
  const [open, setOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const [filteredValue, setFilteredValue] = useState("course");

  const handleChange = (event: SelectChangeEvent) => {
    setFilteredValue(event.target.value);
  };

  // Toggle drawer
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset states when closing
      setNoteContent("");
      setEditingNote(null);
      setEditContent("");
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Add new note
  const handleAddNote = async () => {
    if (!noteContent.trim() || !lessonId || !courseId) return;

    try {
      const res = await createNote({
        lessonId,
        courseId,
        content: noteContent,
        position: (playerRef.current?.currentTime() as number) || 0,
      });

      if (res.statusCode === 201) {
        toast.success("Thêm ghi chú thành công");
        refetch();
      } else {
        toast.error("Thêm ghi chú thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi thêm ghi chú");
    }

    setNoteContent("");
  };

  // Start editing a note
  const handleStartEdit = (note: Note) => {
    setEditingNote(note._id);
    setEditContent(note.content);
  };

  // Save edited note
  const handleSaveEdit = async (noteId: string) => {
    if (!editContent.trim()) return;

    const noteToEdit = notes.find((note) => note._id === noteId);

    if (!noteToEdit) {
      return;
    }

    try {
      const res = await updateNote(noteId, {
        lessonId: noteToEdit.lessonId,
        courseId: noteToEdit.courseId,
        content: editContent,
        position: noteToEdit.position,
      });

      if (res.statusCode === 200) {
        toast.success("Cập nhật ghi chú thành công");
        refetch();
      } else {
        toast.error("Cập nhật ghi chú thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi cập nhật ghi chú");
    }

    setEditingNote(null);
    setEditContent("");
  };

  // Delete note
  const handleDeleteNote = async (noteId: string) => {
    try {
      const res = await deleteNote(noteId);
      if (res.statusCode === 200) {
        toast.success("Xóa ghi chú thành công");
        refetch();
      } else {
        toast.error("Xóa ghi chú thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi xóa ghi chú");
    }
  };

  // Seek video to note position
  const handleSeekToPosition = (lessonId: string, position: number) => {
    // if (playerRef.current) {
    //   playerRef.current.currentTime = position;
    //   toggleDrawer(false)();
    // }
    handleClickJumpToLesson(lessonId, position);
    toggleDrawer(false)();
  };

  const filteredNotes = notes.filter((note) => {
    if (filteredValue === "course") {
      return true;
    }
    return note.lessonId === lessonId;
  });

  if (open && playerRef.current) {
    playerRef.current.pause();
  }

  return (
    <Box>
      <Button onClick={toggleDrawer(true)} sx={{ textTransform: "none" }}>
        <DescriptionIcon sx={{ color: noteColor, mr: 0.5 }} fontSize="small" />
        <Typography variant="body2" sx={{ color: noteColor }}>
          Ghi chú
        </Typography>
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 350, md: 600 },
            bgcolor: isDark ? "background.paper" : "#fff",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Ghi chú của tôi
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Add new note */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              border: "1px solid",
              borderColor: isDark ? "divider" : "rgba(0,0,0,0.1)",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Thêm ghi chú mới
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TimerIcon
                fontSize="small"
                sx={{ color: "text.secondary", mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Tại vị trí:{" "}
                <strong>
                  {formatTime(
                    (playerRef?.current?.currentTime() as number) || 0
                  )}
                </strong>
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Nhập ghi chú của bạn..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />

            <Button
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              onClick={handleAddNote}
              disabled={!noteContent.trim()}
              sx={{ textTransform: "none" }}
            >
              Thêm ghi chú
            </Button>
          </Paper>

          <Divider />

          {/* Notes list */}
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" sx={{ my: 2 }}>
              {filteredNotes.length} ghi chú
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select value={filteredValue} onChange={handleChange}>
                <MenuItem value={"course"}>Trong khoá học</MenuItem>
                <MenuItem value={"lesson"}>Trong chương hiện tại</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            {filteredNotes.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 4,
                  p: 3,
                  bgcolor: isDark ? alpha("#fff", 0.05) : alpha("#000", 0.03),
                  borderRadius: 2,
                }}
              >
                <DescriptionIcon
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography align="center" color="text.secondary">
                  Bạn chưa có ghi chú nào cho bài học này.
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {filteredNotes.map((note) => (
                  <ListItem
                    key={note._id}
                    disablePadding
                    sx={{
                      mb: 2,
                      display: "block",
                      bgcolor: isDark
                        ? alpha("#fff", 0.03)
                        : alpha("#000", 0.02),
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Tooltip title="Nhấn để tìm đến thời điểm này trong video">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleSeekToPosition(note.lessonId, note.position)
                            }
                            startIcon={<TimerIcon />}
                            sx={{ textTransform: "none", borderRadius: 4 }}
                          >
                            {formatTime(note.position)}
                          </Button>
                        </Tooltip>
                        {note?.lesson?.[0]?.title && (
                          <>
                            <Typography>-</Typography>
                            <Typography fontWeight={600}>
                              {note?.lesson?.[0]?.title}
                            </Typography>
                          </>
                        )}
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleStartEdit(note)}
                          disabled={editingNote === note._id}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteNote(note._id)}
                          disabled={editingNote === note._id}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>

                    {editingNote === note._id ? (
                      <Box sx={{ mt: 1 }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          sx={{ mb: 1 }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          <Button
                            size="small"
                            onClick={() => setEditingNote(null)}
                            sx={{ textTransform: "none" }}
                          >
                            Hủy
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            disableElevation
                            startIcon={<SaveIcon />}
                            onClick={() => handleSaveEdit(note._id)}
                            disabled={!editContent.trim()}
                            sx={{ textTransform: "none" }}
                          >
                            Lưu
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {note.content}
                      </Typography>
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
