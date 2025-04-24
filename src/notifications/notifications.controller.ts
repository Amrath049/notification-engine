import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { AuthGuard } from '@nestjs/passport';
import { ClientId } from 'src/auth/decorators/client-id.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Post()
  async sendNotification(
    @ClientId() clientId: string,
    @Req() req: Request,
    @Body() dto: SendNotificationDto,
  ) {
    return this.notificationsService.sendNotification(clientId, dto);
  }
}
