import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.interface';
import { CreateItemDto } from './create-item.dto';
import { ValidationPipe } from '../common/validation.pipe';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemService : ItemsService) {}

    @Get()
    async findAll(): Promise <Item[]> {
        return this.itemService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createItemDto: CreateItemDto) {
        this.itemService.create(createItemDto);
    }
}
