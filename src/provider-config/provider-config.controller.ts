import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProviderConfigService } from './provider-config.service';
import { ClientId } from 'src/auth/decorators/client-id.decorator';
import { CreateProviderConfigDto } from './dto/create-provider-config.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('provider-config')
export class ProviderConfigController {
  constructor(private readonly providerConfigService: ProviderConfigService) {}

  @Post()
  async create(
    @ClientId() clientId: string,
    @Body() dto: CreateProviderConfigDto,
  ) {
    const config = await this.providerConfigService.create(clientId, dto);
    return { message: 'Provider config saved', config };
  }
}
