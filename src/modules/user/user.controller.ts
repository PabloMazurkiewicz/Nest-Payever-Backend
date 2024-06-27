import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ReqresApiService } from 'src/database/reqresdb/reqres.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { HttpResponse } from 'src/infrastructure/http/response';
import { MongoUserIdDto } from './dtos/mongoUserId.dto';
import { UserDto } from './dtos/user.dto';
import { ReqResDbUserIdDto } from './dtos/reqresDbUserId.dto';
import { EmailService } from '../email/email.service';


@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reqresService: ReqresApiService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly emailService: EmailService,
  ) {}


  @Post('users')
  async createUser(@Body() user: UserDto) {
    const createdUser = await this.userService.createUser(user);
  
    this.rabbitMQService.sendEvent(
      'Exchange',
      'RoutingKey',
      `Message sent from user: ${createdUser.email}`,
    );

    await this.emailService.sendEmail('Payever Backend Test', 'Email sent from Payever Service');
    console.log("mail sent!!!");
    
    return HttpResponse.success('User created successfully!!!', createdUser);
  }

  @Get('user/:userId/avatar')
  async getBase64UserAvatar(@Param() params: MongoUserIdDto) {
    const avatar = await this.userService.getBase64UserAvatar(params.userId);
    return HttpResponse.success(
      'Base64Code returned successfully!!!',
      avatar,
    );
  }

  @Delete('user/:userId/avatar')
  async deleteAvatar(@Param() params: MongoUserIdDto) {
    await this.userService.deleteAvatar(params.userId);
    return HttpResponse.success('User Avatar has been deleted!!!');
  }

  @Get('user/:userId')
  async getUser(@Param() params: ReqResDbUserIdDto) {
    const user = await this.reqresService.getUserById(params.userId);
    return HttpResponse.success('User Data returned successfully!!!', user);
  }
}
