import { Module } from '@nestjs/common';
import { ProviderConfigService } from './provider-config.service';
import { ProviderConfigController } from './provider-config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProviderConfig,
  ProviderConfigSchema,
} from './schemas/provider-config.schema';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProviderConfig.name, schema: ProviderConfigSchema },
    ]),
    ClientsModule,
  ],
  providers: [ProviderConfigService],
  controllers: [ProviderConfigController],
  exports: [ProviderConfigService],
})
export class ProviderConfigModule {}
