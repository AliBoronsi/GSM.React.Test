import { Controller, Get } from '@nestjs/common';
import { BaseCrudService } from '../base-service/base.service';

@Controller('base-controller')
export class baseCrudController<T> {
    constructor(private baseCrudService: BaseCrudService<T>) {
    }

    @Get("getAll")
    public getAll(): Promise<T[]> {
        return this.baseCrudService.getAll();
    }
}
