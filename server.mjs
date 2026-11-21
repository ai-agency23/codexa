
import 'dotenv/config';
import express from 'express';
import { Resend } from 'resend';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '10kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages. Please try again later.'
  }
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CODEXA API' });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const {
      name,
      email,
      type,
      message,
      companyWebsite
    } = req.body || {};

    // Honeypot protection
    if (
      typeof companyWebsite === 'string' &&
      companyWebsite.trim() !== ''
    ) {
      return res.status(200).json({ success: true });
    }

    // Server-side validation
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof type !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      name.trim().length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ||
      email.trim().length > 254 ||
      !type.trim() ||
      !['website', 'prototype', 'automation', 'other'].includes(type.trim()) ||
      message.trim().length < 12 ||
      message.trim().length > 1200
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please check your form details.'
      });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      return res.status(503).json({
        success: false,
        message: 'Email service is not configured.'
      });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'CODEXA <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: `New CODEXA inquiry: ${type.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Service: ${type.trim()}`,
        '',
        'Message:',
        message.trim()
      ].join('\n')
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({
        success: false,
        message: 'Unable to send your message right now.'
      });
    }

    return res.status(200).json({
      success: true,
      id: data?.id
    });

  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred.'
    });
  }
});
// Serve the React frontend
app.use(express.static(distPath));

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// React Router fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.listen(PORT, () => {
  console.log(`CODEXA API running on http://localhost:${PORT}`);
});
