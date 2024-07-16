import {
  addNewEmptyNote,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from '../../../src/store/journal/journalSlice';
import {
  activeNoteState,
  initialState,
  newNoteState,
  note,
  notes,
  setNotesState,
} from '../../fixtures/journalFixtures';

describe('Pruebas en authJournal', () => {
  test('Debe de regresar el estado inicial y llamarse journal', () => {
    const state = journalSlice.reducer(initialState, {});

    expect(journalSlice.name).toBe('journal');
    expect(state).toEqual(initialState);
  });

  test('Debe de salvar la nota', () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    expect(state).toEqual({ ...initialState, isSaving: true });
  });

  test('debe de añadir nota', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(note));

    expect(state).toEqual(newNoteState);
  });

  test('debe de setear en active la nota', () => {
    const state = journalSlice.reducer(newNoteState, setActiveNote(note));

    expect(state.active).toEqual(note);
    expect(state).toEqual(activeNoteState);
  });

  test('debe de setear las notas en el estado', () => {
    const state = journalSlice.reducer(initialState, setNotes(notes));

    expect(state.notes).toEqual(notes);
    expect(state).toEqual(setNotesState);
  });

  test('debe de setear el saving en true y messageSaved ', () => {
    const state = journalSlice.reducer(initialState, setSaving());

    expect(state).toEqual({
      ...initialState,
      messageSaved: '',
      isSaving: true,
    });
  });

  test('debe de setear el saving en true, message saved con titulo de nota y messageSaved ', () => {
    const newNote = { ...note, title: 'test' };
    const state = journalSlice.reducer(setNotesState, updateNote(newNote));

    expect(state.messageSaved).toContain('test');
    expect(state.isSaving).toBeFalsy();
    expect(state.notes).toContainEqual(newNote);
  });

  test('debe de setear el active en null y eliminar nota', () => {
    const state = journalSlice.reducer(setNotesState, deleteNoteById('123456'));
    expect(state.active).toBe(null);
    expect(state.notes).not.toContainEqual(note);
  });
});
