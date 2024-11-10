import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutQuery } from './dto/workout-query.interface';
import { Workout } from './entities/workout.entity';
import { WorkoutsService } from './workouts.service';

@Controller()
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    return await this.workoutsService.create(createWorkoutDto);
  }

  @Get()
  async findAll(@Query() workoutQuery: WorkoutQuery): Promise<Workout[]> {
    return await this.workoutsService.findAll(workoutQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Workout> {
    return await this.workoutsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    return await this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Workout> {
    return await this.workoutsService.remove(id);
  }
}
