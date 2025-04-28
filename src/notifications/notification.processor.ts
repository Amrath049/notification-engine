import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
// import { NotificationsService } from './notifications.service'; // or wherever you have
import { NotificationStatus } from './schemas/notification.schema';
import { ProviderFactory } from './providers/provider.factory';
import { TemplatesService } from 'src/templates/templates.service';
import { ProviderConfigService } from 'src/provider-config/provider-config.service';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { Model } from 'mongoose';

@Processor('notifications-queue')
export class NotificationProcessor {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly templatesService: TemplatesService,
    private readonly providerConfigService: ProviderConfigService,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async process(job: Job) {
    const { clientId, dto, notificationId } = job.data;
    const { event, channel, payload } = dto;

    try {
      // 1. Find Template
      const template = await this.templatesService.findByEvent(
        clientId as string,
        event as string,
        channel as string,
        '',
      );
      if (!template) {
        throw new Error('Template not found');
      }

      // 2. Find Provider Config
      const providerConfig: any =
        await this.providerConfigService.findByClientAndChannel(
          clientId as string,
          channel as string,
        );
      if (!providerConfig) {
        throw new Error('Provider Config not found');
      }

      // 3. Render Template
      const renderedBody = this.renderTemplate(template.body, payload);
      const subject = template.subject
        ? this.renderTemplate(template.subject, payload)
        : undefined;

      // 4. Get Provider
      const provider = this.providerFactory.getProvider(
        channel as string,
        template.provider,
      );

      // 5. Send Notification
      await provider.send(
        renderedBody,
        subject,
        payload,
        providerConfig.credentials,
      );

      // 6. Update status to SENT
      await this.notificationModel.updateOne(
        { _id: notificationId },
        {
          $set: {
            status: NotificationStatus.SENT,
            sentAt: new Date(),
          },
        },
      );
    } catch (error) {
      console.error('Failed to send notification', error);

      // Update status to FAILED
      await this.notificationModel.updateOne(
        { _id: notificationId },
        {
          $set: {
            status: NotificationStatus.FAILED,
            failedAt: new Date(),
            failureReason: error.message || 'Unknown error',
          },
        },
      );
    }
  }

  private renderTemplate(template: string, payload: any): string {
    let rendered = template;
    for (const key in payload) {
      rendered = rendered.replace(
        new RegExp(`{{${key}}}`, 'g'),
        payload[key] as string,
      );
    }
    return rendered;
  }
}
