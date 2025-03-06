// Mailer
import nodemailer from 'nodemailer';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Config
import { mailerConfig } from '../configs/mailerConfig.js';

const transporter = nodemailer.createTransport(mailerConfig);

const EmailService = {
  sendResetCode: async (name: string, email: string, code: number) => {
    // Send email with reset code
    await transporter.sendMail({
      // from: process.env.GMAIL_USER,
      from: `EduGenius <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Đặt lại mật khẩu',
      html: `<!DOCTYPE html>
              <html lang="vi">
                <head>
                  <meta charset="UTF-8" />
                  <title>Reset Mật Khẩu</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f2f2f2;
                      padding: 20px;
                      color: #333;
                    }
                    .container {
                      max-width: 600px;
                      margin: auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      padding: 30px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                      color: #007bff;
                    }
                    .code {
                      font-size: 24px;
                      font-weight: bold;
                      color: #d9534f;
                      text-align: center;
                      margin: 20px 0;
                    }
                    .footer {
                      font-size: 12px;
                      color: #777;
                      text-align: center;
                      margin-top: 30px;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h2>Yêu Cầu Đặt Lại Mật Khẩu</h2>
                    <p>Chào <strong>${name}</strong>,</p>
                    <p>
                      Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Vui lòng sử dụng mã dưới đây để tiến hành đặt lại mật khẩu:
                    </p>
                    <div class="code">
                      ${code}
                    </div>
                    <p>
                      Mã này chỉ có hiệu lực trong <strong>15</strong> phút. Nếu bạn không yêu cầu thay đổi mật khẩu, hãy bỏ qua email này.
                    </p>
                    <p>Trân trọng,<br />Đội ngũ hỗ trợ của <strong>EduGenius</strong></p>
                    <div class="footer">
                      Đây là email tự động, vui lòng không trả lời.
                    </div>
                  </div>
                </body>
              </html>
            `,
    });
  },
};

export default EmailService;
