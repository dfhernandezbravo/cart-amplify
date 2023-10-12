import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './styles';

const ToastContainerCustom = () => {
  return (
    <Container>
      <ToastContainer
        hideProgressBar
        closeOnClick={false}
        draggable={false}
        pauseOnHover={false}
        position="top-right"
      />
    </Container>
  );
};

export default ToastContainerCustom;
