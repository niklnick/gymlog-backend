import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { WorkoutExercise } from './entities/workout-exercise.entity';

@Injectable()
export class WorkoutExercisesService {
  constructor(@InjectRepository(WorkoutExercise) private readonly workoutExercisesRepository: Repository<WorkoutExercise>) { }

  async create(workoutId: string, createWorkoutExerciseDto: CreateWorkoutExerciseDto): Promise<WorkoutExercise> {
    return await this.workoutExercisesRepository.save(this.workoutExercisesRepository.create({
      workoutId: workoutId,
      ...createWorkoutExerciseDto
    }));
  }

  async findAll(workoutId: string): Promise<WorkoutExercise[]> {
    return await this.workoutExercisesRepository.find({
      where: { workoutId: workoutId },
      relations: { exercise: true }
    });
  }

  async findOne(workoutId: string, exerciseId: string): Promise<WorkoutExercise> {
    const workoutExercise: WorkoutExercise | null = await this.workoutExercisesRepository.findOne({
      where: { workoutId: workoutId, exerciseId: exerciseId },
      relations: { exercise: true }
    });

    if (!workoutExercise) throw new NotFoundException();

    return workoutExercise;
  }

  async update(workoutId: string, exerciseId: string, updateWorkoutExerciseDto: UpdateWorkoutExerciseDto): Promise<WorkoutExercise> {
    const workoutExercise: WorkoutExercise | null = await this.workoutExercisesRepository.findOne({
      where: { workoutId: workoutId, exerciseId: exerciseId },
      relations: { exercise: true }
    });

    if (!workoutExercise) throw new NotFoundException();

    return await this.workoutExercisesRepository.save({ ...workoutExercise, ...updateWorkoutExerciseDto });
  }

  async remove(workoutId: string, exerciseId: string): Promise<WorkoutExercise> {
    const workoutExercise: WorkoutExercise | null = await this.workoutExercisesRepository.findOne({
      where: { workoutId: workoutId, exerciseId: exerciseId },
    });

    if (!workoutExercise) throw new NotFoundException();

    return await this.workoutExercisesRepository.remove(workoutExercise);
  }
}
