import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ParkingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  plate: string;
}
