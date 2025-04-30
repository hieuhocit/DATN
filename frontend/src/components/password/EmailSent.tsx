import { Box, Button, Typography, Paper, useTheme, TextField } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


interface Props {
    setStep: (step: number) => void;
}


export default function EmailSent({ setStep }: Props) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [code, setCode] = useState('');

    const PATTERNS = {
        VERIFICATION_CODE: /^\d{6}$/,
    };

    const handleSubmit = () => {
        if (!code || code.trim() === '') {
            toast.error('Vui lòng nhập mã xác nhận!');
            return;
        } else if (!PATTERNS.VERIFICATION_CODE.test(code)) {
            toast.error('Mã xác nhận phải là 6 chữ số!');
            return;
        }
        setStep(3); // Chuyển sang bước đặt lại mật khẩu
    };

    const textColor = isDarkMode ? '#fff' : '#000';
    const borderColor = isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.23)';

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ bgcolor: 'default' }}>
            <Paper elevation={3} sx={{ padding: 4, width: 400, bgcolor: theme.palette.background.paper }}>
                <Typography variant="h5" gutterBottom>📩 Kiểm tra email của bạn!</Typography>
                <Typography variant="body1" gutterBottom>
                    Chúng tôi đã gửi mã đặt lại mật khẩu đến email của bạn.
                </Typography>

                <TextField
                    label="Mã xác nhận"
                    fullWidth
                    margin="normal"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    InputLabelProps={{
                        sx: {
                            color: textColor,
                            '&.Mui-focused': {
                                color: textColor
                            }
                        }
                    }}
                    InputProps={{
                        sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: borderColor,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: textColor,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: textColor,
                            },
                            color: textColor,
                        }
                    }}
                />
                <Button variant="text" onClick={() => setStep(1)}>
                    Gửi lại mã xác nhận
                </Button>
                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                    Xác nhận mã
                </Button>
                <Button variant="text" fullWidth onClick={() => navigate('/login')}>
                    Quay về đăng nhập
                </Button>
            </Paper>
            <Outlet />
        </Box>
    );
}