import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
  NotificationStatus,
} from './schemas/notification.schema';
import { TemplatesService } from 'src/templates/templates.service';
import { Model, Types } from 'mongoose';
import { ProviderConfigService } from 'src/provider-config/provider-config.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly templatesService: TemplatesService,
    private readonly providerConfigService: ProviderConfigService,
    @InjectQueue('notifications-queue')
    private readonly notificationQueue: Queue,
  ) {}

  async sendNotification(
    clientId: string,
    dto: SendNotificationDto,
  ): Promise<{ notificationId: string; status: string }> {
    const { event, channel, payload } = dto;

    // 1. Find template
    const template = await this.templatesService.findByEvent(
      clientId,
      event,
      channel,
      '', // undefined, // we'll choose the first available provider for now
    );
    if (!template) {
      throw new NotFoundException('No template found for this event');
    }

    // 2. Find provider config
    const providerConfig =
      await this.providerConfigService.findByClientAndChannel(
        clientId,
        channel,
      );

    if (!providerConfig) {
      throw new NotFoundException(
        'No provider config found for this client/channel/provider',
      );
    }

    // 3. Create queued notification
    const notification: NotificationDocument =
      await this.notificationModel.create({
        clientId: new Types.ObjectId(clientId),
        event,
        channel,
        provider: template.provider,
        payload,
        status: NotificationStatus.QUEUED,
      });

    // // 4. Prepare message body using template (basic string replace for now)
    // const renderedBody = this.renderTemplate(template.body, payload);
    // const subject = template.subject
    //   ? this.renderTemplate(template.subject, payload)
    //   : undefined;

    // 5. Use provider to send message
    // const provider = this.providerFactory.getProvider(channel, template.provider);
    // await provider.send(renderedBody, subject, payload, providerConfig.credentials);

    // Add job to queue
    await this.notificationQueue.add('send-notification', {
      clientId,
      dto,
      notificationId: notification._id.toString(),
    });

    // For now, simulate sending success
    // await this.notificationModel.updateOne(
    //   { _id: notification._id },
    //   {
    //     $set: {
    //       status: NotificationStatus.SENT,
    //       sentAt: new Date(),
    //     },
    //   },
    // );

    return {
      notificationId: notification?._id?.toString() || '',
      status: NotificationStatus.QUEUED,
    };
  }

  private renderTemplate(template: string, payload: Record<string, any>) {
    let rendered = template;
    for (const key in payload) {
      const value: string = payload[key];
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      rendered = rendered.replace(regex, value);
    }
    return rendered;
  }

  async processNotification(
    clientId: string,
    dto: SendNotificationDto,
    notificationId: string,
  ) {
    // This method will be called from processor
    // Handle template rendering + sending logic here (same as before)
    console.log('Sending Notification for', notificationId);

    // TODO: implement the real sending logic here (using factory pattern later)
    await this.notificationModel.updateOne(
      { _id: notificationId },
      { $set: { status: NotificationStatus.SENT, sentAt: new Date() } },
    );
  }
}
