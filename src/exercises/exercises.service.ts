import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(@InjectRepository(Exercise) private readonly exerciseRepository: Repository<Exercise>) { }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    if (await this.exerciseRepository.existsBy({ name: createExerciseDto.name }))
      throw new ConflictException('Exercise name already assigned');

    return await this.exerciseRepository.save(this.exerciseRepository.create(createExerciseDto));
  }

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseRepository.find();
  }

  async findOne(id: string): Promise<Exercise> {
    const exercise: Exercise | null = await this.exerciseRepository.findOne({ where: { id: id } });

    if (!exercise) throw new NotFoundException();

    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const exercise: Exercise | null = await this.exerciseRepository.findOne({ where: { id: id } });

    if (!exercise) throw new NotFoundException();

    return await this.exerciseRepository.save({ ...exercise, ...updateExerciseDto });
  }

  async remove(id: string): Promise<Exercise> {
    const exercise: Exercise | null = await this.exerciseRepository.findOne({ where: { id: id } });

    if (!exercise) throw new NotFoundException();

    return await this.exerciseRepository.remove(exercise);
  }
}
