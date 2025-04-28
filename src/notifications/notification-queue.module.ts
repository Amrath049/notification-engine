import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsService } from './notifications.service';
import { NotificationQueueProcessor } from './notification-queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications-queue',
    }),
  ],
  providers: [NotificationQueueProcessor, NotificationsService],
  exports: [],
})
export class NotificationQueueModule {}
