import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Document, Model } from 'mongoose';
import { Parking } from '../entities/parking.entity';
import { ParkingRepository } from './parking.repository';

const mockModel: Partial<Model<Document>> = {
  create: jest.fn().mockResolvedValue({ save: jest.fn() }),
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockReturnValue({ exec: jest.fn() }),
  findById: jest.fn().mockReturnValue({ exec: jest.fn() }),
};

describe('ParkingRepository', () => {
  let repository: ParkingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingRepository,
        {
          provide: getModelToken(Parking.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<ParkingRepository>(ParkingRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should call model.create with the provided data', async () => {
      const mockParkingData = { plate: 'ABC123' };
      await repository.create(mockParkingData);
      expect(mockModel.create).toHaveBeenCalledWith(mockParkingData);
    });
  });

  describe('findPlate', () => {
    it('should call model.find with the provided plate', async () => {
      const mockPlate = 'ABC123';
      await repository.findPlate(mockPlate);
      expect(mockModel.find).toHaveBeenCalledWith({ plate: mockPlate });
    });
  });

  describe('findOneByPlate', () => {
    it('should call model.findone with the provided plate', async () => {
      const mockPlate = 'ABC123';
      await repository.findOneByPlate(mockPlate);
      expect(mockModel.findOne).toHaveBeenCalledWith({ plate: mockPlate });
    });
  });


  describe('findOneByReservationNumber', () => {
    it('should call model.findOne with the provided reservation number', async () => {
      const mockReservationNumber = '123456';
      await repository.findOneByReservationNumber(mockReservationNumber);
      expect(mockModel.findOne).toHaveBeenCalledWith({ reservationNumber: mockReservationNumber });
    })
  });

  describe('findById', () => {
    it('should call model.findById with the provided reservation ID', async () => {
      const mockId = '65b6ba68191238ec01725d0e';
      await repository.findById(mockId)
      expect(mockModel.findById).toHaveBeenCalledWith(mockId);
    })
  });

});
