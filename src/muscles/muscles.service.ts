import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { Muscle } from './entities/muscle.entity';

@Injectable()
export class MusclesService {
  constructor(@InjectRepository(Muscle) private readonly musclesRepository: Repository<Muscle>) { }

  async create(createMuscleDto: CreateMuscleDto): Promise<Muscle> {
    if (await this.musclesRepository.existsBy({ name: createMuscleDto.name }))
      throw new ConflictException('Muscle name already assigned');

    return await this.musclesRepository.save(this.musclesRepository.create(createMuscleDto));
  }

  async findAll(): Promise<Muscle[]> {
    return await this.musclesRepository.find({ relations: { exercises: true } });
  }

  async findOne(id: string): Promise<Muscle> {
    const muscle: Muscle | null = await this.musclesRepository.findOne({
      where: { id: id },
      relations: { exercises: true }
    });

    if (!muscle) throw new NotFoundException();

    return muscle;
  }

  async update(id: string, updateMuscleDto: UpdateMuscleDto): Promise<Muscle> {
    const muscle: Muscle | null = await this.musclesRepository.findOne({
      where: { id: id },
      relations: { exercises: true }
    });

    if (!muscle) throw new NotFoundException();

    return await this.musclesRepository.save({ ...muscle, ...updateMuscleDto });
  }

  async remove(id: string): Promise<Muscle> {
    const muscle: Muscle | null = await this.musclesRepository.findOne({
      where: { id: id },
      relations: { exercises: true }
    });

    if (!muscle) throw new NotFoundException();

    return await this.musclesRepository.remove(muscle);
  }
}
