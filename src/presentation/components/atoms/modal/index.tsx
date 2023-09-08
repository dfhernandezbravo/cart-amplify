import React, { useEffect } from 'react';
import { ModalContent, ModalWrapper } from './style';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
