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
      <Image
        src="/icons/cart/close-icon.svg"
        width={10}
        height={10}
        alt="close-icon"
        priority
      />
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
