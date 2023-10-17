export const MAX_DURATION = 400;
export const MODAL_STATE = {
  MOUNTED: 'mounted',
  UNMOUNTED: 'unmounted',
  UNMOUNTING: 'unmounting',
} as const;

export type ModalState = typeof MODAL_STATE;

export type ModalStateValue = ModalState[keyof ModalState];

export const DESTROY_STATE = {
  DESTROYED: 'destroyed',
  DESTROY_ONE: 'destroy-one',
  DESTROY_ALL: 'destroy-all',
  DEFAULT: '',
} as const;

export type DestroyState = typeof DESTROY_STATE;

export type DestroyStateValue = DestroyState[keyof DestroyState];
