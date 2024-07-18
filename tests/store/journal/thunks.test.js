import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';

describe('Pruebas en thunks de journal', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('startNewNote debe de crear una nueva nota en blanco', async () => {
    const uid = 'TEST-UID';

    getState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        imageUrls: [],
        id: expect.any(String),
        date: expect.any(Number),
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        imageUrls: [],
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    // Borrar de Firebase

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

    const docs = await getDocs(collectionRef);

    // console.log(docs);
    const deletePromise = [];
    docs.forEach((doc) => deletePromise.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromise);
  });
});
