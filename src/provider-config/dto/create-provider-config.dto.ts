import {
  NotificationChannel,
  NotificationProvider,
} from 'src/common/enums/notification.enum';

export class CreateProviderConfigDto {
  channel: NotificationChannel; // email, whatsapp, sms
  provider: NotificationProvider; // nodemailer, interakt, plivo
  credentials: Record<string, any>; // SMTP or API keys etc.
}
