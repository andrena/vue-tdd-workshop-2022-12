import nodemailer from "nodemailer";
import { EmailService } from "./EmailService";

export class NodeMailerEmailService implements EmailService {
  private readonly transport = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
  });

  async sendEmail(to: string, subject: string, text: string) {
    await this.transport.sendMail({
      from: '"Test" <test@mail.de>',
      to,
      subject,
      text,
    });
  }
}
