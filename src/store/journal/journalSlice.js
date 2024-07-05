import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: true,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'abc123',
    //   title: '',
    //   body: '',
    //   date: 1234567,
    //   imagesUrls: [], // https://foto1.png https://foto2.png
    // },
  },
  reducers: {
    // ! CRUD PARA NOTES

    addNewEntryNote: (state, action) => {
      //   state
    },
    setActiveNote: (state, action) => {
      //   state
    },
    setNotes: (state, action) => {
      //   state
    },
    setSaving: (state, action) => {
      //   state
    },
    updateNote: (state, action) => {
      //   state
    },
    deleteNoteById: (state, action) => {
      //   state
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEntryNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
