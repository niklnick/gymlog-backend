import { Module } from '@nestjs/common';
import { MusclesService } from './muscles.service';
import { MusclesController } from './muscles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Muscle } from './entities/muscle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Muscle])],
  controllers: [MusclesController],
  providers: [MusclesService]
})
export class MusclesModule { }
