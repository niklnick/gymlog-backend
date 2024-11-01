import { Test, TestingModule } from '@nestjs/testing';
import { Muscle } from './entities/muscle.entity';
import { MusclesController } from './muscles.controller';
import { MusclesService } from './muscles.service';

describe('MusclesController', () => {
  let musclesController: MusclesController;
  let musclesService: MusclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusclesController],
      providers: [MusclesService]
    }).compile();

    musclesController = module.get<MusclesController>(MusclesController);
    musclesService = module.get<MusclesService>(MusclesService);
  });

  it('should be defined', () => {
    expect(musclesController).toBeDefined();
    expect(musclesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of muscles', async () => {
      const muscles: Muscle[] = [];

      jest.spyOn(musclesService, 'findAll').mockImplementation(async () => muscles);

      expect(await musclesController.findAll()).toBe(muscles);
    });
  });
});
