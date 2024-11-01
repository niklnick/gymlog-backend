import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { Muscle } from './entities/muscle.entity';
import { MusclesService } from './muscles.service';

@Controller()
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) { }

  @Post()
  async create(@Body() createMuscleDto: CreateMuscleDto): Promise<Muscle> {
    return await this.musclesService.create(createMuscleDto);
  }

  @Get()
  async findAll(): Promise<Muscle[]> {
    return await this.musclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Muscle> {
    return await this.musclesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMuscleDto: UpdateMuscleDto): Promise<Muscle> {
    return await this.musclesService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Muscle> {
    return await this.musclesService.remove(id);
  }
}
