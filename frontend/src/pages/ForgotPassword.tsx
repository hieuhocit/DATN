/* eslint-disable @typescript-eslint/no-explicit-any */
import EmailSent from "@/components/password/EmailSent";
import ForgotPassword from "@/components/password/ForgotPassword";
import ResetPassword from "@/components/password/ResetPassword";
import Section from "@/components/common/Section";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  resetPassword,
  sendCodeToEmail,
  verifyCode,
} from "@/services/passwordService";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // Bước hiện tại (1: Nhập email, 2: Nhập mã xác nhận, 3: Đặt lại mật khẩu)
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [resetToken, setResetToken] = useState<string>(""); // Token để đặt lại mật khẩu (nếu cần)

  const navigate = useNavigate();

  const PATTERNS = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    VERIFICATION_CODE: /^\d{6}$/,
  };

  const handleSubmitEmail = async () => {
    if (!email || email.trim() === "") {
      toast.error("Vui lòng nhập email!");
      return;
    } else if (!PATTERNS.EMAIL.test(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    try {
      const res = (await sendCodeToEmail(email)) as any;

      console.log("Email res", res);

      if (res.statusCode === 200) {
        toast.success(res.message);
        setStep(2); // Chuyển sang bước nhập mã xác nhận
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Đã xảy ra lỗi khi gửi mã xác nhận!");
    }
  };

  const handleSubmitCode = async () => {
    if (!code || code.trim() === "") {
      toast.error("Vui lòng nhập mã xác nhận!");
      return;
    } else if (!PATTERNS.VERIFICATION_CODE.test(code)) {
      toast.error("Mã xác nhận phải là 6 chữ số!");
      return;
    }

    try {
      const res = (await verifyCode(email, +code)) as any;

      console.log("Code res", res);

      if (res.statusCode === 200) {
        setResetToken(res.data?.resetToken);
        toast.success(res.message);
        setStep(3); // Chuyển sang bước đặt lại mật khẩu
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Đã xảy ra lỗi khi xác thực mã xác nhận!");
    }
  };

  const handleResetPassword = async (newPassword: string) => {
    try {
      const res = (await resetPassword(resetToken, newPassword)) as any;

      if (res.statusCode === 200) {
        toast.success("Đặt lại mật khẩu thành công!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Đã xảy ra lỗi khi đặt lại mật khẩu!");
    }
  };

  return (
    <Section
      sx={{
        mt: "128px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1,
      }}
    >
      {step === 1 && (
        <ForgotPassword
          email={email}
          onChange={(email: string) => setEmail(email)}
          onSubmit={handleSubmitEmail}
        />
      )}
      {step === 2 && (
        <EmailSent
          code={code}
          onChange={(code) => setCode(code)}
          onSubmit={handleSubmitCode}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <ResetPassword
          onSubmit={(newPassword) => handleResetPassword(newPassword)}
        />
      )}
    </Section>
  );
}
