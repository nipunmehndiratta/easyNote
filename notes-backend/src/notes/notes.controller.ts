import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NoteDto } from './dto/noteDto';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Get()
  async index(@Request() req) {
    return await this.service.findAll(req.user.userId);
  }

  @Post()
  async create(@Request() req, @Body() Note: NoteDto) {
    return await this.service.create(req.user.userId, Note);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() NoteDto: NoteDto) {
    return await this.service.update(id, NoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
