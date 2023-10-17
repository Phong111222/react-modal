import styled, { css } from 'styled-components';
import { MAX_DURATION, MODAL_STATE, ModalStateValue } from '../constant';
import { ZoomIn, ZoomOut } from './Animation';

export const ModalContainer = styled.div<{ $state: ModalStateValue }>`
  background: white;
  max-width: 100%;
  max-height: 100%;
  min-width: 500px;
  min-height: 600px;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: flex;
  flex-direction: column;
  ${({ $state: state }) =>
    state === MODAL_STATE.MOUNTED
      ? css`
          animation: ${ZoomIn} ${MAX_DURATION}ms;
        `
      : state === MODAL_STATE.UNMOUNTING
      ? css`
          animation: ${ZoomOut} ${MAX_DURATION}ms;
        `
      : css`
          display: none;
        `}
`;
