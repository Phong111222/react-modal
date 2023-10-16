import { Close } from '@icon-park/react';
import styled from 'styled-components';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;

const Title = styled.h4`
  font-size: 24px;
  font-weight: bold;
`;

const CloseIcon = styled(Close)`
  cursor: pointer;
`;

export interface ModalHeaderProps {
  title?: string;
  closeIcon?: boolean;
  onClose: () => void;
}

export default function ({
  onClose,
  title,
  closeIcon = true,
}: ModalHeaderProps) {
  return (
    <ModalHeader>
      <Title>{title || ''}</Title>
      {closeIcon && <CloseIcon onClick={onClose} />}
    </ModalHeader>
  );
}
