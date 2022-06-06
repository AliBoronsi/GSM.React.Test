import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UnitProfile } from './profile/unit.profile';
import { UnitController } from './unit.controller';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  controllers: [UnitController],
  providers: [UnitService, UnitProfile]
})
export class UnitModule {}
