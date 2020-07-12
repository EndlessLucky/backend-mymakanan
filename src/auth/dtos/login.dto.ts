import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
