import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    return potentialReservationNumber;
  }



  async enter(plate: string): Promise<string> {


    const plateRegex = /^[A-Z]{3}-\d{4}$/;
    if (!plateRegex.test(plate)) {
      throw new ConflictException('Formato de placa inválido. Use o formato AAA-9999.');
    }

    const existingParking = await this.parkingRepository.findOneByPlate(plate)
    if (existingParking) {
      throw new ConflictException('Já existe um registro para esta placa.');
    }

    const reservation = {
      plate,
      entryTime: new Date(),
      reservationNumber: await this.generateReservationNumber(),
      paid: false
    }


    await this.parkingRepository.create(reservation)


    return reservation.reservationNumber;
  }

  async exit(id: string) {

    const parking = await this.parkingRepository.findById(id)

    if (!parking) {
      throw new NotFoundException('Registro de estacionamento não encontrado.');
    }

    if (!parking.paid) {
      throw new BadRequestException('Saída não permitida sem pagamento.');
    }

    parking.left = true;
    parking.exitTime = new Date()
    await parking.save();

    return { message: 'Saída registrada com sucesso!.' };
  }



  async pay(id: string) {
    const parking = await this.parkingRepository.findById(id)

    if (!parking) {
      throw new NotFoundException('Registro de estacionamento não encontrado.');
    }

    if (parking.paid) {
      throw new BadRequestException('Este estacionamento já foi pago.');
    }

    parking.paid = true;
    await parking.save();

    return { message: 'Pagamento realizado com sucesso.' };
  }

  async getHistory(plate: string) {

    const history = await this.parkingRepository.findPlate(plate)

    if (!history.length) {
      return { message: 'Placa não encontrada.' };
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
