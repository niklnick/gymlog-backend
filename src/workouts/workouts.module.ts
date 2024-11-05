import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutExercise } from './entities/workout-exercise.entity';
import { Workout } from './entities/workout.entity';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, WorkoutExercise])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService]
})
export class WorkoutsModule { }
