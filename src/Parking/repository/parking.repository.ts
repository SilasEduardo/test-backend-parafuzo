
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parking } from '../entities/parking.entity';

@Injectable()
export class ParkingRepository {
  constructor(@InjectModel(Parking.name) private readonly parkingModel: Model<Parking>) { }

  async create(parkingData: Partial<Parking>): Promise<Parking> {
    const parking = await this.parkingModel.create(parkingData);
    return parking.save();
  }

  async findPlate(plate: string): Promise<Parking[]> {
    const reservations = await this.parkingModel.find({ plate });
    return reservations;
  }


  async findOneByPlate(plate: string): Promise<Parking | null> {
    return this.parkingModel.findOne({ plate }).exec();
  }

  async findOneByReservationNumber(reservationNumber: string): Promise<Parking | null> {
    return this.parkingModel.findOne({ reservationNumber }).exec();
  }

  async findById(id: string) {
    return this.parkingModel.findById(id);
  }

}
