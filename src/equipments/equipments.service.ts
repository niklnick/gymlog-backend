import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentQuery } from './dto/equipment-query.interface';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentsService {
  constructor(@InjectRepository(Equipment) private readonly equipmentsRepository: Repository<Equipment>) { }

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    if (await this.equipmentsRepository.existsBy({ name: createEquipmentDto.name }))
      throw new ConflictException('Equipment name already assigned');

    return await this.equipmentsRepository.save(this.equipmentsRepository.create(createEquipmentDto));
  }

  async findAll(equipmentQuery: EquipmentQuery): Promise<Equipment[]> {
    const query: SelectQueryBuilder<Equipment> = this.equipmentsRepository.createQueryBuilder('equipment');

    if (equipmentQuery.name) query.andWhere('equipment.name = :name', { name: equipmentQuery.name });

    return await query.getMany();
  }

  async findOne(id: string): Promise<Equipment> {
    const equipment: Equipment | null = await this.equipmentsRepository.findOne({
      where: { id: id },
      relations: { exercises: { primaryMuscles: true, secondaryMuscles: true } }
    });

    if (!equipment) throw new NotFoundException();

    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    const equipment: Equipment | null = await this.equipmentsRepository.findOne({ where: { id: id } });

    if (!equipment) throw new NotFoundException();

    return await this.equipmentsRepository.save({ ...equipment, ...updateEquipmentDto });
  }

  async remove(id: string): Promise<Equipment> {
    const equipment: Equipment | null = await this.equipmentsRepository.findOne({ where: { id: id } });

    if (!equipment) throw new NotFoundException();

    return await this.equipmentsRepository.remove(equipment);
  }
}
