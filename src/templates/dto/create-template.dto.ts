import {
  NotificationChannel,
  NotificationProvider,
} from '../../common/enums/notification.enum';

export class CreateTemplateDto {
  eventName: string;
  channel: NotificationChannel;
  provider: NotificationProvider;
  subject?: string;
  body: string;
}
