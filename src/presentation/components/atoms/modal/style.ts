import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 4px;

  @media (max-width: 720px) {
    width: 100%;
  }
`;
