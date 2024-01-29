import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ParkingDto } from './dtos/Parking.dto';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) { }

  @Post()
  @HttpCode(201)
  async enter(@Body() parkingDto: ParkingDto) {
    return this.parkingService.enter(parkingDto.plate);

  }

  @Put(':id/out')
  @HttpCode(200)
  async exit(@Param('id') id: string) {
    return this.parkingService.exit(id);
  }

  @Put(':id/pay')
  @HttpCode(200)
  async pay(@Param('id') id: string) {
    return this.parkingService.pay(id);
  }

  @Get(':plate')
  @HttpCode(200)
  async getHistory(@Param('plate') plate: string) {
    return this.parkingService.getHistory(plate);
  }

}
