import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
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
  async findAll(): Promise<Exercise[]> {
    return await this.exercisesService.findAll();
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
