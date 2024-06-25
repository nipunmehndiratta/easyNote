import { Document, ObjectId } from 'mongoose';
export interface Note extends Document {
  userId: ObjectId;
  title: string;
  description?: string;
}
