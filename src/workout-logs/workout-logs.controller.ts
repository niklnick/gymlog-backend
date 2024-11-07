import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';
import { UpdateWorkoutLogDto } from './dto/update-workout-log.dto';
import { WorkoutLog } from './entities/workout-log.entity';
import { WorkoutLogsService } from './workout-logs.service';

@Controller()
export class WorkoutLogsController {
  constructor(private readonly workoutLogsService: WorkoutLogsService) { }

  @Post()
  async create(@Body() createWorkoutLogDto: CreateWorkoutLogDto): Promise<WorkoutLog> {
    return await this.workoutLogsService.create(createWorkoutLogDto);
  }

  @Get()
  async findAll(): Promise<WorkoutLog[]> {
    return await this.workoutLogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WorkoutLog> {
    return await this.workoutLogsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkoutLogDto: UpdateWorkoutLogDto): Promise<WorkoutLog> {
    return await this.workoutLogsService.update(id, updateWorkoutLogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<WorkoutLog> {
    return await this.workoutLogsService.remove(id);
  }
}
