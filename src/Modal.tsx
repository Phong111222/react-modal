import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { GlobalStyle } from './styled/GlobalStyle';
import { ModalBackground } from './styled/ModalBackground';
import { ModalContainer } from './styled/ModalContainer';
import ModalHeader, { ModalHeaderProps } from './styled/ModalHeader';
import ModalFooter, { ModalFooterProps } from './styled/ModalFooter';
import { ModalContent } from './styled/ModalContent';
import { createPortal } from 'react-dom';
import { MAX_DURATION, MODAL_STATE, ModalStateValue } from './constant';

interface Props extends ModalHeaderProps, ModalFooterProps {
  header?: ReactNode;
  children?: ReactNode;
  showFooter?: boolean;
  open: boolean;
  zIndex?: number;
  className?: string;
}

const Modal: FC<Props> = ({
  header,
  footer,
  showFooter = false,
  closeIcon = true,
  title,
  children,
  onClose,
  open,
  zIndex,
  className,
}) => {
  const [modalState, setModalState] = useState<ModalStateValue>('unmounted');

  const containerRef = useRef<Element>();

  const _onClose = () => {
    setModalState(MODAL_STATE.UNMOUNTED);
  };

  useEffect(() => {
    containerRef.current = document.body;
  }, []);

  useEffect(() => {
    if (modalState === MODAL_STATE.UNMOUNTED && !open) {
      return;
    }

    if (open) {
      setModalState(MODAL_STATE.MOUNTED);
      return;
    }

    if (modalState === MODAL_STATE.UNMOUNTING && !open) {
      setTimeout(() => {
        _onClose();
      }, MAX_DURATION);

      return;
    }

    setModalState(MODAL_STATE.UNMOUNTING);
  }, [modalState, open]);

  return (
    <>
      <GlobalStyle />
      {modalState !== MODAL_STATE.UNMOUNTED &&
        createPortal(
          <ModalBackground
            $zIndex={zIndex}
            $state={modalState}
            className={className}
          >
            <ModalContainer $state={modalState}>
              {header || (
                <ModalHeader
                  closeIcon={closeIcon}
                  onClose={() => onClose?.()}
                  title={title}
                />
              )}
              <ModalContent>{children}</ModalContent>
              {showFooter && <ModalFooter footer={footer} />}
            </ModalContainer>
          </ModalBackground>,
          containerRef.current as Element
        )}
    </>
  );
};

export default Modal;
