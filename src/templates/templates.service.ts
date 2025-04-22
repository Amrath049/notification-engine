import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { Model } from 'mongoose';
import { CreateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name)
    private templateModel: Model<TemplateDocument>,
  ) {}

  async create(clientId: string, dto: CreateTemplateDto): Promise<Template> {
    return this.templateModel.create({ clientId, ...dto });
  }

  async findByEvent(
    clientId: string,
    eventName: string,
    channel: string,
    provider: string,
  ): Promise<Template | null> {
    return this.templateModel.findOne({
      clientId,
      eventName,
      channel,
      provider,
    });
  }
}
