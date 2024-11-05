import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutsService {
  constructor(@InjectRepository(Workout) private readonly workoutsRepository: Repository<Workout>) { }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    if (await this.workoutsRepository.existsBy({ name: createWorkoutDto.name }))
      throw new ConflictException('Workout name already assigned');

    return await this.workoutsRepository.save(this.workoutsRepository.create(createWorkoutDto));
  }

  async findAll(): Promise<Workout[]> {
    return await this.workoutsRepository.find({ relations: { exercises: { muscles: true } } });
  }

  async findOne(id: string): Promise<Workout> {
    const workout: Workout | null = await this.workoutsRepository.findOne({
      where: { id: id },
      relations: { exercises: { muscles: true } }
    });

    if (!workout) throw new NotFoundException();

    return workout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    const workout: Workout | null = await this.workoutsRepository.findOne({
      where: { id: id },
      relations: { exercises: { muscles: true } }
    });

    if (!workout) throw new NotFoundException();

    return await this.workoutsRepository.save({ ...workout, ...updateWorkoutDto });
  }

  async remove(id: string): Promise<Workout> {
    const workout: Workout | null = await this.workoutsRepository.findOne({ where: { id: id } });

    if (!workout) throw new NotFoundException();

    return await this.workoutsRepository.remove(workout);
  }
}
