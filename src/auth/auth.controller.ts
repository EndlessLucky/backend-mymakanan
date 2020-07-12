import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { TokenResponseDto } from './dtos/token-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @ApiOkResponse()
  @Post('login')
  async login(@Request() req, @Body() body: LoginDto): Promise<TokenResponseDto> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
