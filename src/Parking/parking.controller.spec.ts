import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';


const mockParkingService = {
  enter: jest.fn(),
  exit: jest.fn(),
  pay: jest.fn(),
  getHistory: jest.fn(),
};

describe('ParkingController', () => {
  let controller: ParkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [
        {
          provide: ParkingService,
          useValue: mockParkingService,
        },
      ],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('enter', () => {
    it('should call parkingService.enter with the provided plate', async () => {
      const mockPlate = 'ABC123';

      await controller.enter({ plate: mockPlate });

      expect(mockParkingService.enter).toHaveBeenCalledWith(mockPlate);
    });
  });

  describe('exit', () => {
    it('should call parkingService.exit with the provided id', async () => {
      const mockId = 'someId';

      await controller.exit(mockId);

      expect(mockParkingService.exit).toHaveBeenCalledWith(mockId);
    });
  });

  describe('pay', () => {
    it('should call parkingService.pay with the provided id', async () => {
      const mockId = 'someId';

      await controller.pay(mockId);

      expect(mockParkingService.pay).toHaveBeenCalledWith(mockId);
    });
  });

  describe('getHistory', () => {
    it('should call parkingService.getHistory with the provided plate', async () => {
      const mockPlate = 'ABC123';

      await controller.getHistory(mockPlate);

      expect(mockParkingService.getHistory).toHaveBeenCalledWith(mockPlate);
    });
  });
});
