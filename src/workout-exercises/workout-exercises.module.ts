import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutExercise } from './entities/workout-exercise.entity';
import { WorkoutExercisesController } from './workout-exercises.controller';
import { WorkoutExercisesService } from './workout-exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutExercise])],
  controllers: [WorkoutExercisesController],
  providers: [WorkoutExercisesService]
})
export class WorkoutExercisesModule { }
