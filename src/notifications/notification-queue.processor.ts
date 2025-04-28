import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Processor('notifications-queue')
export class NotificationQueueProcessor {
  constructor(private readonly notificationsService: NotificationsService) {}

  async process(job: Job) {
    const { clientId, dto, notificationId } = job.data;

    console.log('Processing notification job:', notificationId);

    await this.notificationsService.processNotification(
      clientId as string,
      dto as SendNotificationDto,
      notificationId as string,
    );
  }
}
