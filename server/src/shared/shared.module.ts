import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';
import { baseCrudController } from './base-controller/base.controller';
import { BaseCrudService } from './base-service/base.service';



@Module({
  providers: [BaseCrudService, Repository, ],
  controllers: [baseCrudController]
})
export class SharedModule {}
