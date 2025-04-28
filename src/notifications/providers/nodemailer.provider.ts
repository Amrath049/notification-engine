import { AbstractProvider } from './abstract.provider';
import * as nodemailer from 'nodemailer';

export class NodemailerProvider implements AbstractProvider {
  async send(
    body: string,
    subject: string | undefined,
    payload: any,
    credentials: any,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: credentials.service, // e.g., 'gmail'
      auth: {
        user: credentials.user,
        pass: credentials.pass,
      },
    });

    await transporter.sendMail({
      from: credentials.user,
      to: payload.to, // payload must contain 'to' field
      subject: subject || 'No Subject',
      html: body,
    });
  }
}
