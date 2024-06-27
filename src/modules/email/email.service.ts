import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvsConfig } from 'src/infrastructure/config/env';


@Injectable()
export class EmailService {

  async sendEmail(subject: string, text: string): Promise<void> {
    
    const transporter = nodemailer.createTransport({
      host: EnvsConfig.getSMTPHost(), // Your SMTP server host
      port: parseInt(EnvsConfig.getSMTPPort()), // Your SMTP server port
      secure: false,
      auth: {
        user: EnvsConfig.getSMTPUserEmail(),
        pass: EnvsConfig.getSMTPUserPassword(),
      },
    });

    const mailOptions = {
      from: EnvsConfig.getEmailFrom(),
      to: EnvsConfig.getEmailTo(),
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error sending email', HttpStatus.BAD_GATEWAY);
    }
  }
}
