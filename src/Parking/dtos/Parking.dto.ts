import { IsNotEmpty, IsString } from 'class-validator';

export class ParkingDto {
  @IsString()
  @IsNotEmpty()
  plate: string;
}
