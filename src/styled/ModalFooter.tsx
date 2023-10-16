import { ReactNode } from 'react';
import styled from 'styled-components';

const ModalFooter = styled.div`
  margin-top: auto;
  max-height: 20%;
  padding: 10px 15px;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
`;

export interface ModalFooterProps {
  footer?: ReactNode;
}

export default function ({ footer }: ModalFooterProps) {
  return <ModalFooter>{footer}</ModalFooter>;
}
