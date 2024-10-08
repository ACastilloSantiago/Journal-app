import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
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
  },
  reducers: {
    // ! CRUD PARA NOTES

    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      // TODO: mensaje
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id !== payload.id) return note;

        return payload;
      });

      state.messageSaved = `${payload.title}, actualizada correctamente!`;
    },
    deleteNoteById: (state, { payload }) => {
      state.active = null;

      state.notes = state.notes.filter((note) => note.id !== payload);
    },
    clearNoteLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    setPhotosToActiveNotes: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNoteLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
