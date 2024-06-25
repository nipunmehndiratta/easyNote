import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ type: ObjectId, required: true })
  userId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
