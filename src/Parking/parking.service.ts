import { ConflictException, Injectable } from '@nestjs/common';
import { AppError } from '../shared/Error/AppError';
import calculateTimeDifference from '../shared/util/calculateTime';
import { ParkingRepository } from './repository/parking.repository';

@Injectable()
export class ParkingService {
  constructor(
    private readonly parkingRepository: ParkingRepository
  ) { }

  private async generateReservationNumber(): Promise<string> {

    const randomNumber = Math.floor(Math.random() * 1000);
    const timestamp = new Date().getTime();
    const potentialReservationNumber = `RES-${timestamp}-${randomNumber}`;

    const existingReservation = await this.parkingRepository.findOneByReservationNumber(potentialReservationNumber)

    if (existingReservation) {
      return this.generateReservationNumber();
    }

    return potentialReservationNumber
  }



  async enter(plate: string): Promise<string> {


    const plateRegex = /^[A-Z]{3}-\d{4}$/;
    if (!plateRegex.test(plate)) {
      throw new ConflictException('Formato de placa inválido. Use o formato AAA-9999.');
    }

    const existingParking = await this.parkingRepository.findOneByPlate(plate)
    if (existingParking) {
      throw new AppError('Já existe um registro para esta placa.', 401)
    }

    const reservation = {
      plate,
      entryTime: new Date(),
      reservationNumber: await this.generateReservationNumber(),
      paid: false
    }

    await this.parkingRepository.create(reservation)

    return reservation.reservationNumber
  }

  async exit(id: string) {

    const parking = await this.parkingRepository.findById(id)

    if (!parking) {
      throw new AppError('Registro de estacionamento não encontrado.', 404);
    }

    if (!parking.paid) {
      throw new AppError('Saída não permitida sem pagamento.', 402);
    }

    parking.left = true;
    parking.exitTime = new Date()
    await parking.save();
  }



  async pay(id: string) {
    const parking = await this.parkingRepository.findById(id)

    if (!parking) {
      throw new AppError('Registro de estacionamento não encontrado.', 404);
    }

    if (parking.paid) {
      throw new AppError('Este estacionamento já foi pago.', 401);
    }

    console.log(parking.paid)
    parking.paid = true;
    await parking.save();
  }

  async getHistory(plate: string) {

    const history = await this.parkingRepository.findPlate(plate)

    if (!history.length) {
      throw new AppError('Placa não encontrada.', 404)
    }

    const formattedHistory = history.map((entry) => ({
      id: entry._id.toString(),
      time: calculateTimeDifference(entry.entryTime, entry.exitTime),
      paid: entry.paid,
      left: entry.exitTime !== null,
    }));

    return formattedHistory;
  }
}
