import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseQuery } from './dto/exercise-query.interface';
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

  async findAll(exerciseQuery: ExerciseQuery): Promise<Exercise[]> {
    const query: SelectQueryBuilder<Exercise> = this.exerciseRepository.createQueryBuilder('exercise')
      .leftJoinAndSelect('exercise.muscles', 'muscle');

    if (exerciseQuery.name)
      query.andWhere('exercise.name ILIKE :name', { name: `%${exerciseQuery.name}%` });
    if (exerciseQuery.muscleNames && exerciseQuery.muscleNames.length > 0)
      query.andWhere('muscle.name IN (:...muscleNames)', {
        muscleNames: Array.isArray(exerciseQuery.muscleNames)
          ? exerciseQuery.muscleNames : [exerciseQuery.muscleNames]
      });

    return await this.exerciseRepository.find({
      where: {
        id: In((await query.select('exercise.id').getMany()).map((exercise: Exercise) => exercise.id))
      },
      relations: { muscles: true }
    });
  }

  async findOne(id: string): Promise<Exercise> {
    const exercise: Exercise | null = await this.exerciseRepository.findOne({
      where: { id: id },
      relations: { muscles: true }
    });

    if (!exercise) throw new NotFoundException();

    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const exercise: Exercise | null = await this.exerciseRepository.findOne({
      where: { id: id },
      relations: { muscles: true }
    });

    if (!exercise) throw new NotFoundException();

    return await this.exerciseRepository.save({ ...exercise, ...updateExerciseDto });
  }

  async remove(id: string): Promise<Exercise> {
    const exercise: Exercise | null = await this.exerciseRepository.findOne({
      where: { id: id },
      relations: { muscles: true }
    });

    if (!exercise) throw new NotFoundException();

    return await this.exerciseRepository.remove(exercise);
  }
}
