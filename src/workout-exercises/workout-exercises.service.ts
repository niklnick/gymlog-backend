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
    const workoutExercise: WorkoutExercise = this.workoutExercisesRepository.create({
      ...createWorkoutExerciseDto,
      workout: { id: workoutId }
    });

    return await this.workoutExercisesRepository.save(workoutExercise);
  }

  async findAll(workoutId: string): Promise<WorkoutExercise[]> {
    return await this.workoutExercisesRepository.find({
      where: { workout: { id: workoutId } },
      relations: { exercise: true }
    });
  }

  async findOne(workoutId: string, id: string): Promise<WorkoutExercise> {
    const workoutExercise: WorkoutExercise | null = await this.workoutExercisesRepository.findOne({
      where: { id: id, workout: { id: workoutId } },
      relations: { exercise: true }
    });

    if (!workoutExercise) throw new NotFoundException();

    return workoutExercise;
  }

  async update(workoutId: string, id: string, updateWorkoutExerciseDto: UpdateWorkoutExerciseDto): Promise<WorkoutExercise> {
    const workoutExercise: WorkoutExercise | null = await this.workoutExercisesRepository.findOne({
      where: { id: id, workout: { id: workoutId } },
      relations: { exercise: true }
    });

    if (!workoutExercise) throw new NotFoundException();

    return await this.workoutExercisesRepository.save({ ...workoutExercise, ...updateWorkoutExerciseDto });
  }

  async remove(workoutId: string, id: string): Promise<WorkoutExercise> {
    const workoutExercise: WorkoutExercise | null = await this.workoutExercisesRepository.findOne({
      where: { id: id, workout: { id: workoutId } }
    });

    if (!workoutExercise) throw new NotFoundException();

    return await this.workoutExercisesRepository.remove(workoutExercise);
  }
}
