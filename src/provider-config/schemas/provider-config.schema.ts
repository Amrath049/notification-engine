import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import {
  NotificationChannel,
  NotificationProvider,
} from 'src/common/enums/notification.enum';

export type ProviderConfigDocument = ProviderConfig & Document;

@Schema({ timestamps: true })
export class ProviderConfig {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ required: true, enum: NotificationChannel })
  channel: NotificationChannel;

  @Prop({ required: true, enum: NotificationProvider })
  provider: NotificationProvider;

  @Prop({ type: Object, required: true }) // Flexible structure
  credentials: Record<string, any>;
}

export const ProviderConfigSchema =
  SchemaFactory.createForClass(ProviderConfig);
