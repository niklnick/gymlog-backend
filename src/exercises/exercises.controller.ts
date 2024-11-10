import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseQuery } from './dto/exercise-query.interface';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { ExercisesService } from './exercises.service';

@Controller()
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return await this.exercisesService.create(createExerciseDto);
  }

  @Get()
  async findAll(@Query() exerciseQuery: ExerciseQuery): Promise<Exercise[]> {
    return await this.exercisesService.findAll(exerciseQuery);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Exercise> {
    return await this.exercisesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    return await this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Exercise> {
    return await this.exercisesService.remove(id);
  }
}
