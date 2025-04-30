import EmailSent from "@/components/password/EmailSent";
import ForgotPassword from "@/components/password/ForgotPassword";
import ResetPassword from "@/components/password/ResetPassword";
import Section from "@/components/common/Section";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1); // Bước hiện tại (1: Nhập email, 2: Nhập mã xác nhận, 3: Đặt lại mật khẩu)

    const handleStepChange = (newStep: number) => {
        setStep(newStep);
    };

    return (
        <Section sx={{
            mt: '128px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 1,
        }}>
            {step === 1 && <ForgotPassword setStep={handleStepChange} />}
            {step === 2 && <EmailSent setStep={handleStepChange} />}
            {step === 3 && <ResetPassword setStep={handleStepChange} />}
        </Section>
    );
}