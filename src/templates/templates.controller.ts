import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { ClientId } from 'src/auth/decorators/client-id.decorator';
import { CreateTemplateDto } from './dto/create-template.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  async create(@ClientId() clientId: string, @Body() dto: CreateTemplateDto) {
    const template = await this.templatesService.create(clientId, dto);
    return { message: 'Template saved', template };
  }
}
