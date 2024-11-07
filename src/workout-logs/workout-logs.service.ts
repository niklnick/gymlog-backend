import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';
import { UpdateWorkoutLogDto } from './dto/update-workout-log.dto';
import { WorkoutLog } from './entities/workout-log.entity';

@Injectable()
export class WorkoutLogsService {
  constructor(@InjectRepository(WorkoutLog) private readonly workoutLogRepository: Repository<WorkoutLog>) { }

  async create(createWorkoutLogDto: CreateWorkoutLogDto): Promise<WorkoutLog> {
    return await this.workoutLogRepository.save(this.workoutLogRepository.create(createWorkoutLogDto));
  }

  async findAll(): Promise<WorkoutLog[]> {
    return await this.workoutLogRepository.find({ relations: { workout: true, workoutLogExercises: true } });
  }

  async findOne(id: string): Promise<WorkoutLog> {
    const workoutLog: WorkoutLog | null = await this.workoutLogRepository.findOne({
      where: { id: id },
      relations: { workout: true, workoutLogExercises: true }
    });

    if (!workoutLog) throw new NotFoundException();

    return workoutLog;
  }

  async update(id: string, updateWorkoutLogDto: UpdateWorkoutLogDto): Promise<WorkoutLog> {
    const workoutLog: WorkoutLog | null = await this.workoutLogRepository.findOne({
      where: { id: id },
      relations: { workout: true, workoutLogExercises: true }
    });

    if (!workoutLog) throw new NotFoundException();

    return await this.workoutLogRepository.save({ ...workoutLog, ...updateWorkoutLogDto });
  }

  async remove(id: string): Promise<WorkoutLog> {
    const workoutLog: WorkoutLog | null = await this.workoutLogRepository.findOne({
      where: { id: id },
      relations: { workout: true, workoutLogExercises: true }
    });

    if (!workoutLog) throw new NotFoundException();

    return await this.workoutLogRepository.remove(workoutLog);
  }
}
