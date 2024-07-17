export const note = {
  title: 'Tarea',
  body: 'caca',
  id: '123456',
  date: '123456789',
  imageUrls: 'https://image.com',
};

export const notes = [
  {
    title: 'Tarea',
    body: 'caca',
    id: '123456',
    date: '123456789',
    imageUrls: 'https://image.com',
  },
  {
    title: 'Tarea',
    body: 'caca',
    id: '12356',
    date: '123456789',
    imageUrls: 'https://image.com',
  },
  {
    title: 'Tarea',
    body: 'caca',
    id: '123',
    date: '123456789',
    imageUrls: 'https://image.com',
  },
  {
    title: 'Tarea',
    body: 'caca',
    id: '1234',
    date: '123456789',
    imageUrls: 'https://image.com',
  },
  {
    title: 'Tarea',
    body: 'caca',
    id: '12345',
    date: '123456789',
    imageUrls: 'https://image.com',
  },
];
export const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};
export const setNotesState = {
  isSaving: false,
  messageSaved: '',
  notes,
  active: null,
};
export const newNoteState = {
  isSaving: false,
  messageSaved: '',
  notes: [note],
  active: null,
};

export const preClearState = {
  isSaving: true,
  messageSaved: 'Si pown',
  notes,
  active: [note],
};

export const photosActiveState = {
  isSaving: true,
  messageSaved: 'Si pown',
  notes,
  active: {
    title: 'Tarea',
    body: 'caca',
    id: '123456',
    date: '123456789',
    imageUrls: ['https://image.com', 'https://image.com', 'https://image.com'],
  },
};

export const activeNoteState = { ...newNoteState, active: note };
