export const MODAL_STATE = {
  MOUNTED: 'mounted',
  UNMOUNTED: 'unmounted',
  UNMOUNTING: 'unmounting',
} as const;

export type ModalState = typeof MODAL_STATE;

export type ModalStateValue = ModalState[keyof ModalState];
