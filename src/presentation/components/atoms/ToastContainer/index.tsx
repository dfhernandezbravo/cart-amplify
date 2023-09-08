import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "./styles";

const ToastContainerCustom = () => {
  return (
    <Container>
      <ToastContainer
        closeOnClick={false}
        draggable={false}
        pauseOnHover={false}
        position="bottom-right"
      />
    </Container>
  );
};

export default ToastContainerCustom;
