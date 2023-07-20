import { useEffect } from "react";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { setError } from "@store/error";
import { useAppDispatch } from "@hooks/storeHooks";
import { MinicartErrorProps } from "./types";
import {
  ErrorContainer,
  MainContainer,
  IconAndTextContainer,
  TextContainer,
  Content,
  Title,
} from "./styles";

const MinicartError = (props: MinicartErrorProps) => {
  const { title, content = "Intenta nuevamente" } = props;

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(setError(null));
  };

  // wait 4sec and disappear
  useEffect(() => {
    setTimeout(() => {
      dispatch(setError(null));
    }, 4000);
  }, [dispatch]);

  return (
    <MainContainer>
      <ErrorContainer>
        <IconAndTextContainer>
          <Image
            src={`/icons/cart/warning.svg`}
            alt="warning-icon"
            width={24}
            height={24}
          />
          <TextContainer>
            <Title>{title}</Title>
            <Content>{content}</Content>
          </TextContainer>
        </IconAndTextContainer>
        <GrClose onClick={handleOnClose} />
      </ErrorContainer>
    </MainContainer>
  );
};

export default MinicartError;
