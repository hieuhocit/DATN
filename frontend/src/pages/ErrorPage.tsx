import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ pt: "64px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          py: 8,
        }}
      >
        <SentimentDissatisfiedIcon
          sx={{ fontSize: 120, mb: 4, opacity: 0.8 }}
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: 700,
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 600,
          }}
        >
          Trang không tồn tại
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 500,
            mb: 6,
            fontSize: "1.1rem",
          }}
        >
          Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui
          lòng kiểm tra lại hoặc quay về trang chủ.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Về trang chủ
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Quay lại
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
