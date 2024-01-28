import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Parking, ParkingSchema } from './entities/parking.entity';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { ParkingRepository } from './repository/parking.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Parking.name, schema: ParkingSchema }])],
  controllers: [ParkingController],
  providers: [ParkingService, ParkingRepository],
})
export class ParkingModule { }
