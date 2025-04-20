import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProviderConfig,
  ProviderConfigDocument,
} from './schemas/provider-config.schema';
import { Model } from 'mongoose';
import { CreateProviderConfigDto } from './dto/create-provider-config.dto';

@Injectable()
export class ProviderConfigService {
  constructor(
    @InjectModel(ProviderConfig.name)
    private providerConfigModel: Model<ProviderConfigDocument>,
  ) {}

  async create(
    clientId: string,
    dto: CreateProviderConfigDto,
  ): Promise<ProviderConfig> {
    return await this.providerConfigModel.create({ clientId, ...dto });
  }

  async findByClientAndChannel(
    clientId: string,
    channel: string,
  ): Promise<ProviderConfig[]> {
    return await this.providerConfigModel.find({ clientId, channel }).exec();
  }
}
