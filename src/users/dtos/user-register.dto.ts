import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

import { UserRole } from '../enums';

export class UserRegisterDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  personalId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  address1: string;

  @ApiProperty()
  address2: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  state: string;
}
