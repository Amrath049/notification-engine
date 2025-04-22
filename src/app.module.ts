import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProviderConfigModule } from './provider-config/provider-config.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/notification_engine'),
    ClientsModule,
    AuthModule,
    ProviderConfigModule,
    TemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
