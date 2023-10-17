import styled, { css } from 'styled-components';
import { MAX_DURATION, MODAL_STATE, ModalStateValue } from '../constant';
import { FadeIn, FadeOut } from './Animation';

export const ModalBackground = styled.div<{
  $zIndex?: number;
  $state: ModalStateValue;
}>`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: ${(props) => props.$zIndex};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $state: state }) =>
    state === MODAL_STATE.MOUNTED
      ? css`
          animation: ${FadeIn} linear ${MAX_DURATION}ms;
        `
      : state === MODAL_STATE.UNMOUNTING
      ? css`
          animation: ${FadeOut} linear ${MAX_DURATION}ms;
        `
      : css`
          display: none;
        `}
`;
