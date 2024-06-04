import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
        perferendis fugit doloremque consectetur mollitia corporis, nobis quae
        saepe asperiores adipisci illo laborum vitae obcaecati eos et
        voluptates. Odio, similique sequi?
      </Typography> */}

      <IconButton
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {
            opacity: 0.9,
            backgroundColor: 'error.main',
          },
          position: 'fixed',
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

      {/* <NothingSelectedView /> */}

      <NoteView />
    </JournalLayout>
  );
};
