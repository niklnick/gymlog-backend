import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutLogExercise } from './entities/workout-log-exercise.entity';
import { WorkoutLog } from './entities/workout-log.entity';
import { WorkoutLogsController } from './workout-logs.controller';
import { WorkoutLogsService } from './workout-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutLogExercise, WorkoutLog])],
  controllers: [WorkoutLogsController],
  providers: [WorkoutLogsService]
})
export class WorkoutLogsModule { }
