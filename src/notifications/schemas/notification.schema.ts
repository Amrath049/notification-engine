import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  NotificationChannel,
  NotificationProvider,
} from '../../common/enums/notification.enum';

export type NotificationDocument = Notification & Document;

export enum NotificationStatus {
  QUEUED = 'queued',
  SENT = 'sent',
  FAILED = 'failed',
  DELIVERED = 'delivered',
}

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  event: string;

  @Prop({ required: true, enum: NotificationChannel })
  channel: NotificationChannel;

  @Prop({ required: true, enum: NotificationProvider })
  provider: NotificationProvider;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({
    type: String,
    enum: NotificationStatus,
    default: NotificationStatus.QUEUED,
  })
  status: NotificationStatus;

  @Prop({ type: String }) // Optional error info if any
  error?: string;

  @Prop({ type: Date })
  sentAt?: Date;

  @Prop({ type: Date })
  deliveredAt?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
