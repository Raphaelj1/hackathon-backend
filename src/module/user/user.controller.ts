import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @Roles(['ADMIN'])
  @ResponseMessage('Fetch all users')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
