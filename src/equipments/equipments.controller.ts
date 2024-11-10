import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentQuery } from './dto/equipment-query.interface';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { EquipmentsService } from './equipments.service';

@Controller()
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) { }

  @Post()
  async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    return await this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  async findAll(@Query() equipmentQuery: EquipmentQuery): Promise<Equipment[]> {
    return await this.equipmentsService.findAll(equipmentQuery);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Equipment> {
    return await this.equipmentsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    return await this.equipmentsService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Equipment> {
    return await this.equipmentsService.remove(id);
  }
}
