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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3160_23701)">
                <path
                  d="M12 10.5867L16.95 5.63672L18.364 7.05072L13.414 12.0007L18.364 16.9507L16.95 18.3647L12 13.4147L7.04999 18.3647L5.63599 16.9507L10.586 12.0007L5.63599 7.05072L7.04999 5.63672L12 10.5867Z"
                  fill="#333333"
                />
              </g>
              <defs>
                <clipPath id="clip0_3160_23701">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
