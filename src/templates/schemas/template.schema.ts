import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  NotificationChannel,
  NotificationProvider,
} from '../../common/enums/notification.enum';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: true })
export class Template {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  eventName: string; // like 'user_signup', 'order_placed'

  @Prop({ required: true, enum: NotificationChannel })
  channel: NotificationChannel;

  @Prop({ required: true, enum: NotificationProvider })
  provider: NotificationProvider;

  @Prop()
  subject?: string; // For email only

  @Prop({ required: true })
  body: string; // message template body (with handlebars variables maybe)
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
