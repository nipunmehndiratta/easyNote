import { atom } from 'recoil';

interface Note {
    title: string;
    description: string;
    _id: string;
}


export const notesState = atom<Note[]>({
  key: 'notesState',
  default: [],
});