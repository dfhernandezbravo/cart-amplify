import { useEffect } from 'react';
import Image from 'next/image';
import {
  ModalContent,
  ModalWrapper,
  ModalHeader,
  Title,
  CloseButton,
} from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  headerTitle?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, onClose, children, className, headerTitle } = props;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('header-footer-open-modal');
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.body.classList.remove('header-footer-open-modal');
      document.removeEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.body.classList.remove('header-footer-open-modal');
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper onClick={onClose} hasHeader={Boolean(headerTitle)}>
      {headerTitle ? (
        <ModalHeader onClick={(e) => e.stopPropagation()} hasHeader={true}>
          <Title>{headerTitle}</Title>
          <CloseButton onClick={onClose}>
            <Image
              src="/icons/general/close-modal.svg"
              width={24}
              height={24}
              alt="close-modal"
            />
          </CloseButton>
        </ModalHeader>
      ) : null}
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        className={className}
        hasHeader={Boolean(headerTitle)}
      >
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
