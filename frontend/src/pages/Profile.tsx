import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Container,
  Box,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Section from "@/components/common/Section";
import { useTheme } from "@/hooks/useTheme";

interface UserProfile {
  email: string;
  name: string;
  bio: string;
  avatar: string | null;
}

const Profile: React.FC = () => {
  const { themeMode } = useTheme();

  const [profile, setProfile] = useState<UserProfile>({
    email: "user@example.com",
    name: "John Doe",
    bio: "A passionate developer",
    avatar: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setEditedProfile((prev) => ({ ...prev, avatar: objectUrl }));
    }
  };

  return (
    <Section sx={{ mt: "128px", mb: "128px" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: themeMode === "dark" ? "grey.900" : "background.paper",
            border: 1,
            borderColor:
              themeMode === "dark" ? "grey.700" : "grey.200",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: themeMode === "dark" ? "white" : "text.primary",
            }}
          >
            Thông tin cá nhân
          </Typography>

          <Box display="flex" justifyContent="center" mb={3} position="relative">
            <Avatar
              src={isEditing ? editedProfile.avatar : profile.avatar || ""}
              sx={{ width: 120, height: 120 }}
            />
            {isEditing && (
              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: "calc(50% - 60px)", // căn giữa tương đối với avatar
                  bgcolor: themeMode === "light" ? "grey.800" : "white",
                  border: 1,
                  borderColor: "divider",
                  boxShadow: 1,
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <PhotoCamera />
              </IconButton>
            )}
          </Box>

          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              label="Họ tên"
              name="name"
              value={isEditing ? editedProfile.name : profile.name}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
              variant="outlined"
            />
            <TextField
              label="Giới thiệu"
              name="bio"
              value={isEditing ? editedProfile.bio : profile.bio}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
              multiline
              rows={4}
              variant="outlined"
            />

            <Box display="flex" justifyContent="flex-end" gap={1}>
              {isEditing ? (
                <>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Lưu
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Hủy
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              )}
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Section>
  );
};

export default Profile;
