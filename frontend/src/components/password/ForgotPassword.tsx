import { Button, TextField, Typography, Link, Paper, useTheme } from "@mui/material";
import { useState } from "react";
import { toast } from 'react-toastify';

interface Props {
    setStep: (step: number) => void;
}

export default function ForgotPassword({ setStep }: Props) {
    const [email, setEmail] = useState('');
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const PATTERNS = {
        EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    };

    const handleSubmit = () => {
        if (!email || email.trim() === '') {
            toast.error('Vui lòng nhập email!');
            return;
        } else if (!PATTERNS.EMAIL.test(email)) {
            toast.error('Email không hợp lệ!');
            return;
        }
        setStep(2); // Chuyển sang bước nhập mã xác nhận
    };

    const textColor = isDarkMode ? '#fff' : '#000';
    const borderColor = isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.23)';


    return (

        <Paper elevation={3} sx={{ padding: 4, width: 400, bgcolor: theme.palette.background.paper }}>
            <Typography variant="h5" align="center" gutterBottom>Quên mật khẩu</Typography>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                Gửi mã xác nhận
            </Button>
            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                <Link href="/login" sx={{ color: textColor }}>← Trở về đăng nhập</Link>
            </Typography>
        </Paper>
    );
}