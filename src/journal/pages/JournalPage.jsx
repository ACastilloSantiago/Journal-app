import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { startNewNote } from '../../store/journal';
import { useDispatch, useSelector } from 'react-redux';

export const JournalPage = () => {
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  const { isSaving, active } = useSelector((state) => state.journal);
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
        perferendis fugit doloremque consectetur mollitia corporis, nobis quae
        saepe asperiores adipisci illo laborum vitae obcaecati eos et
        voluptates. Odio, similique sequi?
      </Typography> */}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {
            opacity: 0.9,
            backgroundColor: 'error.main',
          },
          position: 'fixed',
          zIndex: 1,
          bottom: 50,
          right: 50,
        }}
      >
        <AddOutlined
          sx={{
            fontSize: 30,
          }}
        />
      </IconButton>

      {!!active ? <NoteView /> : <NothingSelectedView />}
    </JournalLayout>
  );
};
