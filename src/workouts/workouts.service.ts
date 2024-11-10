import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutQuery } from './dto/workout-query.interface';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutsService {
  constructor(@InjectRepository(Workout) private readonly workoutsRepository: Repository<Workout>) { }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    if (await this.workoutsRepository.existsBy({ name: createWorkoutDto.name }))
      throw new ConflictException('Workout name already assigned');

    return await this.workoutsRepository.save(this.workoutsRepository.create(createWorkoutDto));
  }

  async findAll(workoutQuery: WorkoutQuery): Promise<Workout[]> {
    const query: SelectQueryBuilder<Workout> = this.workoutsRepository.createQueryBuilder('workout')
      .leftJoinAndSelect('workout.workoutExercises', 'workoutExercise')
      .leftJoinAndSelect('workoutExercise.exercise', 'exercise');

    if (workoutQuery.name) query.andWhere('workout.name = :name', { name: workoutQuery.name });
    if (workoutQuery.exerciseNames && workoutQuery.exerciseNames.length > 0)
      query.andWhere('exercise.name IN (:...exerciseName)', {
        exerciseName: Array.isArray(workoutQuery.exerciseNames)
          ? workoutQuery.exerciseNames : [workoutQuery.exerciseNames]
      });

    return await this.workoutsRepository.find({
      where: {
        id: In((await query.select('workout.id').getMany()).map((workout: Workout) => workout.id))
      },
      relations: { workoutExercises: { exercise: true } },
      order: { workoutExercises: { position: 'ASC' } }
    });
  }

  async findOne(id: string): Promise<Workout> {
    const workout: Workout | null = await this.workoutsRepository.findOne({
      where: { id: id },
      relations: { workoutExercises: { exercise: true } }
    });

    if (!workout) throw new NotFoundException();

    return workout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    const workout: Workout | null = await this.workoutsRepository.findOne({
      where: { id: id },
      relations: { workoutExercises: { exercise: true } }
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
