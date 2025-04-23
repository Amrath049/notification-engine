import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { NotificationChannel } from '../../common/enums/notification.enum';

export class SendNotificationDto {
  @IsString()
  @IsNotEmpty()
  event: string; // e.g., 'user_signup'

  @IsEnum(NotificationChannel)
  channel: NotificationChannel; // e.g., 'email'

  @IsObject()
  payload: Record<string, any>; // data to replace in template, like { name: 'John', email: 'john@example.com' }
}
