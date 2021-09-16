import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from 'src/data-transfer-object/create.event.dto';
import { UpdateEventDto } from 'src/data-transfer-object/update.event.dto';
import { Event } from 'src/model/event.entity';
import { Repository } from 'typeorm';

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ) {}

    @Get()
    async findAll(){
        return await this.repository.find();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id){
        return await this.repository.findOne(id);
    }

    @Post()
    async create(@Body(ValidationPipe) input: CreateEventDto){
        return await this.repository.save({
            ...input,
            when: new Date(input.when)
        });
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id , @Body() input: UpdateEventDto){
        const event = await this.repository.findOne(id);

        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : (await event).when
        });
    }

    @Delete(':id') 
    @HttpCode(204)
    async remove(@Param('id', ParseIntPipe) id){
        const event = await this.repository.findOne(id);
        return await this.repository.remove(event);
    }
}
