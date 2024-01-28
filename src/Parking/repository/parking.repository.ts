// src/parking/parking.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parking } from '../entities/parking.entity';

@Injectable()
export class ParkingRepository {
  constructor(@InjectModel(Parking.name) private parkingModel: Model<Parking>) { }

  async create(parkingData: Partial<Parking>): Promise<Parking> {
    const parking = new this.parkingModel(parkingData);
    return parking.save();
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

  async update(parkingId: string, updateData: Partial<Parking>): Promise<Parking | null> {
    return this.parkingModel.findByIdAndUpdate(parkingId, updateData, { new: true }).exec();
  }

  async findPlate(plate: string): Promise<Parking[]> {
    const reservation = await this.parkingModel.find({ plate }).exec();
    return reservation
  }
}
