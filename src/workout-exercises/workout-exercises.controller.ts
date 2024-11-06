import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { WorkoutExercise } from './entities/workout-exercise.entity';
import { WorkoutExercisesService } from './workout-exercises.service';

@Controller()
export class WorkoutExercisesController {
  constructor(private readonly workoutExercisesService: WorkoutExercisesService) { }

  @Post()
  async create(
    @Param('workoutId') workoutId: string,
    @Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto
  ): Promise<WorkoutExercise> {
    return await this.workoutExercisesService.create(workoutId, createWorkoutExerciseDto);
  }

  @Get()
  async findAll(@Param('workoutId') workoutId: string): Promise<WorkoutExercise[]> {
    return await this.workoutExercisesService.findAll(workoutId);
  }

  @Get(':id')
  async findOne(@Param('workoutId') workoutId: string, @Param('id') id: string): Promise<WorkoutExercise> {
    return await this.workoutExercisesService.findOne(workoutId, id);
  }

  @Patch(':id')
  async update(
    @Param('workoutId') workoutId: string,
    @Param('id') id: string,
    @Body() updateWorkoutExerciseDto: UpdateWorkoutExerciseDto
  ): Promise<WorkoutExercise> {
    return await this.workoutExercisesService.update(workoutId, id, updateWorkoutExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('workoutId') workoutId: string, @Param('id') id: string): Promise<WorkoutExercise> {
    return await this.workoutExercisesService.remove(workoutId, id);
  }
}
