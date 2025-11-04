import { Injectable } from '@nestjs/common';
import { AbstractProvider } from './abstract.provider';
import { NodemailerProvider } from './nodemailer.provider';

@Injectable()
export class ProviderFactory {
  getProvider(channel: string, providerName: string): AbstractProvider {
    if (channel === 'email') {
      if (providerName === 'nodemailer') {
        return new NodemailerProvider();
      }
      //  can add more email providers here later
    }
    // Later, add whatsapp/sms providers

    throw new Error(
      `No provider found for channel ${channel} and provider ${providerName}`,
    );
  }
}
