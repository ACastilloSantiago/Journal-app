export const note = {
  title: 'Tarea',
  body: 'caca',
  id:'123456' ,
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
  // active: {
  //   id: 'abc123',
  //   title: '',
  //   body: '',
  //   date: 1234567,
  //   imageUrls: [], // https://foto1.png https://foto2.png
  // },
};
export const setNotesState = {
    isSaving: false,
    messageSaved: '',
    notes,
    active: null,
}
export const newNoteState = {
  isSaving: false,
  messageSaved: '',
  notes: [note],
  active: null,
};

export const activeNoteState = { ...newNoteState, active: note };
