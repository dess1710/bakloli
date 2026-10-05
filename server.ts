import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory OTP storage
interface ActiveOtpSession {
  otp: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}

let activeOtpSession: ActiveOtpSession | null = null;

// Email sender function
async function sendOtpEmail(targetEmail: string, otpCode: string): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `"Birthday Gatekeeper" <no-reply@romanticbirthday.local>`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fdf2f8; margin: 0; padding: 24px; color: #374151; }
        .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(219, 39, 119, 0.12); border: 1px solid #fce7f3; }
        .header { background: linear-gradient(135deg, #f43f5e 0%, #db2777 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { margin: 8px 0 0 0; opacity: 0.92; font-size: 14px; }
        .body { padding: 32px 28px; text-align: center; }
        .body p { font-size: 15px; line-height: 1.6; color: #4b5563; margin-top: 0; }
        .otp-box { display: inline-block; margin: 24px auto; padding: 18px 36px; background: #fdf2f8; border: 2px dashed #f472b6; border-radius: 16px; }
        .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #db2777; margin: 0; }
        .footer { background: #faf5ff; padding: 20px 24px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3e8ff; }
        .heart { color: #f43f5e; font-size: 18px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="heart">💖 🎂 ✨</div>
          <h1>Secret Birthday Gate Unlock</h1>
          <p>Someone answered the secret question correctly!</p>
        </div>
        <div class="body">
          <p>Here is your exclusive 6-digit One-Time Passcode (OTP) to reveal the romantic birthday surprise:</p>
          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
          </div>
          <p style="font-size: 13px; color: #6b7280;">This code is valid for 15 minutes and can only be used once. Please keep this code private to protect the surprise!</p>
        </div>
        <div class="footer">
          Made with love &bull; Happy Birthday Celebration
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    if (smtpUser && smtpPass) {
      const transporterConfig: any = smtpHost
        ? {
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : {
            service: 'gmail',
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          };

      const transporter = nodemailer.createTransport(transporterConfig);

      const info = await transporter.sendMail({
        from: smtpFrom || (smtpHost ? undefined : smtpUser),
        to: targetEmail,
        subject: "✨ Your Secret Birthday Gate OTP Unlock Code",
        text: `Your unlock OTP for the birthday surprise is: ${otpCode}. It expires in 15 minutes.`,
        html: emailHtml,
      });

      console.log(`[NODEMAILER] Email sent successfully to ${targetEmail} (Message ID: ${info.messageId})`);
      return true;
    } else {
      console.log(`\n======================================================`);
      console.log(`[NODEMAILER GATE DISPATCH]`);
      console.log(`Target Recipient : ${targetEmail}`);
      console.log(`Generated OTP    : ${otpCode}`);
      console.log(`Notice: Custom SMTP credentials not provided in .env.`);
      console.log(`======================================================\n`);

      // Attempt test ethereal account as graceful fallback
      try {
        const testAccount = await nodemailer.createTestAccount();
        const testTransporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        const testInfo = await testTransporter.sendMail({
          from: `"Romantic Gatekeeper" <gate@ethereal.email>`,
          to: targetEmail,
          subject: "✨ Your Secret Birthday Gate OTP Unlock Code",
          text: `Your unlock OTP is: ${otpCode}`,
          html: emailHtml,
        });
        console.log(`[NODEMAILER TEST] Preview URL: ${nodemailer.getTestMessageUrl(testInfo)}`);
      } catch (err) {
        // Fallback test error is non-fatal
      }
      return true;
    }
  } catch (error) {
    console.error('[NODEMAILER ERROR] Failed to send email:', error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Dev helper to check status and active OTP for testing
  app.get('/api/dev-otp', (_req: Request, res: Response) => {
    if (activeOtpSession) {
      return res.json({
        active: true,
        expiresInSeconds: Math.max(0, Math.round((activeOtpSession.expiresAt - Date.now()) / 1000)),
        devOtp: activeOtpSession.otp,
        targetEmail: process.env.TARGET_EMAIL || 'dess7934@gmail.com',
        hasSmtpConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
      });
    }
    return res.json({
      active: false,
      devOtp: null,
      targetEmail: process.env.TARGET_EMAIL || 'dess7934@gmail.com',
      hasSmtpConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
    });
  });

  // Screen 1: Secret Question Verification Endpoint
  app.post('/api/verify-question', async (req: Request, res: Response) => {
    try {
      const { answer } = req.body || {};
      const expectedAnswer = (process.env.SECRET_ANSWER || 'chess').trim().toLowerCase();
      const providedAnswer = (answer || '').toString().trim().toLowerCase();

      if (!providedAnswer || providedAnswer !== expectedAnswer) {
        return res.status(401).json({
          success: false,
          message: "Incorrect answer. Think about my favorite strategic pastime!",
        });
      }

      // Generate random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const now = Date.now();

      // Store in memory (15 min validity)
      activeOtpSession = {
        otp,
        createdAt: now,
        expiresAt: now + 15 * 60 * 1000,
        attempts: 0,
      };

      const targetEmail = process.env.TARGET_EMAIL || 'dess7934@gmail.com';

      // Send email via Nodemailer asynchronously without delaying client transition
      sendOtpEmail(targetEmail, otp).catch((err) => {
        console.error('[EMAIL BACKGROUND ERROR]:', err);
      });

      // SECURITY RULE: NEVER expose the OTP or secret answer in the response
      return res.status(200).json({
        success: true,
        message: "Question verified successfully! The unlock OTP has been dispatched to your email.",
      });
    } catch (err) {
      console.error('[SERVER ERROR /api/verify-question]:', err);
      return res.status(500).json({
        success: false,
        message: "Internal server error during verification.",
      });
    }
  });

  // Screen 2: OTP Verification Endpoint
  app.post('/api/verify-otp', (req: Request, res: Response) => {
    try {
      const { otp } = req.body || {};
      const cleanInput = (otp || '').toString().trim();

      if (!activeOtpSession) {
        return res.status(401).json({
          success: false,
          message: "No active verification session found. Please answer the secret question first.",
        });
      }

      if (Date.now() > activeOtpSession.expiresAt) {
        activeOtpSession = null;
        return res.status(401).json({
          success: false,
          message: "Your OTP code has expired. Please answer the secret question again to get a fresh code.",
        });
      }

      activeOtpSession.attempts += 1;
      if (activeOtpSession.attempts > 5) {
        activeOtpSession = null;
        return res.status(401).json({
          success: false,
          message: "Too many failed attempts. For security, please answer the question again.",
        });
      }

      if (cleanInput === activeOtpSession.otp) {
        // Single use: wipe the active OTP immediately upon successful match
        activeOtpSession = null;
        return res.status(200).json({
          success: true,
          message: "OTP verified successfully. Welcome to your birthday surprise!",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid OTP code. Please double check and try again.",
      });
    } catch (err) {
      console.error('[SERVER ERROR /api/verify-otp]:', err);
      return res.status(500).json({
        success: false,
        message: "Internal server error during OTP verification.",
      });
    }
  });

  // Serve public directory statically
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Dev vs Prod Vite Mounting
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] Full-Stack Romantic Birthday App listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[SERVER FATAL ERROR]:', err);
  process.exit(1);
});
