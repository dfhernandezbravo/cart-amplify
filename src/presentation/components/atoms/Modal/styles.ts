import styled from 'styled-components';

type ModalProps = {
  hasHeader: boolean;
};

export const ModalWrapper = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 9999;

  @media (max-width: 767px) {
    justify-content: ${(props) => (props.hasHeader ? 'start' : 'center')};
  }
`;

export const ModalContent = styled.div<ModalProps>`
  background-color: white;
  padding: 16px;
  border-radius: ${(props) => (props.hasHeader ? '0 0 4px 4px' : '4px')};

  @media (max-width: 720px) {
    width: 100%;
  }

  &.service-modal {
    max-width: 508px;
    max-height: 100%;
    overflow-y: auto;

    @media (max-width: 767px) {
      max-height: calc(100% - 300px);
    }
  }
`;

export const ModalHeader = styled.div<ModalProps>`
  background-color: #fff;
  border-bottom: 1px solid #aaa;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 8px;
  width: 100%;
  max-width: 508px;

  @media (max-width: 767px) {
    border-radius: ${(props) => (props.hasHeader ? '0' : '8px 8px 0 0')};
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
`;

export const CloseButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  cursor: pointer;
  border: none;
  background-color: #fff;
`;
