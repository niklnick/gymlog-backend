import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muscle } from './entities/muscle.entity';
import { MusclesService } from './muscles.service';

describe('MusclesService', () => {
  let musclesService: MusclesService;
  let musclesRepository: Repository<Muscle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusclesService,
        { provide: getRepositoryToken(Muscle), useClass: Repository<Muscle> }
      ]
    }).compile();

    musclesService = module.get<MusclesService>(MusclesService);
    musclesRepository = module.get(getRepositoryToken(Muscle));
  });

  it('should be defined', () => {
    expect(musclesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of muscles', async () => {
      const muscles: Muscle[] = [];

      jest.spyOn(musclesRepository, 'find').mockImplementation(async () => muscles);

      expect(await musclesService.findAll()).toBe(muscles);
    });
  });
});
