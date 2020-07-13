import { BadRequestException, Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { SuccessResponse } from '../common/dtos/success-response.dto';
import { UserRole } from './enums';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User Management')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Post()
  @ApiOkResponse({ type: () => SuccessResponse })
  async addUser(@Body() body: UserRegisterDto): Promise<SuccessResponse> {
    await this.usersService.add(body);
    if (body.role === UserRole.Admin) {
      throw new BadRequestException('It is not allowed to register a admin user using this api.');
    }
    // TODO: use vonage api to send phone verification code
    return new SuccessResponse(true);
  }
}
