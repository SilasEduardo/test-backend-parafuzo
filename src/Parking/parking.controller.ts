import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ParkingDto } from './dtos/Parking.dto';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) { }

  @Post()
  async enter(@Body() parkingDto: ParkingDto) {
    return this.parkingService.enter(parkingDto.plate);
  }

  @Put(':id/out')
  async exit(@Param('id') id: string) {
    return this.parkingService.exit(id);
  }

  @Put(':id/pay')
  async pay(@Param('id') id: string) {
    return this.parkingService.pay(id);
  }

  @Get(':plate')
  async getHistory(@Param('plate') plate: string) {
    return this.parkingService.getHistory(plate);
  }

}
