import { useState } from 'react';
import Image from 'next/image';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Container, Button } from './styles';

interface State extends SnackbarOrigin {
  open: boolean;
  vertical: SnackbarOrigin['vertical'];
  horizontal: SnackbarOrigin['horizontal'];
}

interface Props extends State {
  close: () => void;
  description: string;
}

const SnackBars = ({
  open,
  close,
  description,
  vertical,
  horizontal,
}: Props) => {
  const [state, setState] = useState<State>({
    open: open,
    vertical: vertical,
    horizontal: horizontal,
  });

  const action = (
    <Button onClick={() => close()}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.99974 5.58599L11.9497 0.635986L13.3637 2.04999L8.41374 6.99999L13.3637 11.95L11.9497 13.364L6.99974 8.41399L2.04974 13.364L0.635742 11.95L5.58574 6.99999L0.635742 2.04999L2.04974 0.635986L6.99974 5.58599Z"
          fill="white"
        />
      </svg>
    </Button>
  );

  return (
    <Container>
      <Snackbar
        anchorOrigin={{
          vertical: state.vertical,
          horizontal: state.horizontal,
        }}
        open={open}
        onClose={close}
        message={description}
        autoHideDuration={4000}
        action={action}
      />
    </Container>
  );
};

export default SnackBars;
