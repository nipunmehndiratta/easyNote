import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NoteDto } from './dto/noteDto';
import { Note, NoteDocument } from './schemas/notes.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly model: Model<NoteDocument>,
  ) {}

  async findAll(userId: string): Promise<Note[]> {
    return await this.model.find({ userId: userId }).exec();
  }

  async create(userId: string, noteDto: NoteDto): Promise<Note> {
    noteDto.userId = userId;
    const newNote = new this.model(noteDto);

    return await newNote.save();
  }

  async delete(id: string): Promise<Note> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async update(id: string, noteDto: NoteDto): Promise<Note> {
    return await this.model
      .findByIdAndUpdate(id, noteDto, { new: true })
      .exec();
  }
}
