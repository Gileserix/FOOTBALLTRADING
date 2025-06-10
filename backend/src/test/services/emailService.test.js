import nodemailer from 'nodemailer';
import { sendVerificationEmail } from '../../services/emailService.js';

jest.mock('nodemailer');

describe('Email Service', () => {
  let mockTransporter;

  beforeAll(() => {
    // Mock del transportador de nodemailer
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: '12345' }),
    };
    nodemailer.createTransport.mockReturnValue(mockTransporter);
  });

  test('should send an email successfully', async () => {
    const emailData = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    };

    const result = await sendVerificationEmail(emailData);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: process.env.EMAIL_FROM,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
    });
    expect(result.messageId).toBe('12345');
  });

  test('should handle errors when sending an email', async () => {
    mockTransporter.sendMail.mockRejectedValue(new Error('Email sending failed'));

    const emailData = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    };

    await expect(sendVerificationEmail(emailData)).rejects.toThrow('Email sending failed');
  });
});