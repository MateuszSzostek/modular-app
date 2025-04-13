import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(
    private readonly usersService: UserService,
    @InjectModel('UserAuthDataSchema')
    private readonly jwtService: JwtService,
  ) {
    // Configure the transporter with your SMTP settings
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Replace with your SMTP host
      port: 587, // Replace with your SMTP port (587 for TLS, 465 for SSL, or 25 for non-secure)
      secure: false, // Set to true if using SSL, false for TLS or non-secure
      auth: {
        user: 'your-email@example.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password
      },
    });
  }

  /**
   * Sends an email to the specified recipient.
   * @param to - Recipient email address.
   * @param subject - Subject of the email.
   * @param content - HTML or plain text content of the email.
   */
  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: 'Brighter', // Replace with your "from" email
        to,
        subject,
        html: content, // Email content in HTML format
      });

      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
