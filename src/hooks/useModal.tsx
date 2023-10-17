import { ReactNode, useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import ReactDOM from 'react-dom/client';
import { root as defaultRoot } from '../main';
import { DESTROY_STATE, DestroyStateValue, MAX_DURATION } from '../constant';

type ShowProps = {
  title: string;
  content: ReactNode;
};

type ModalItem = {
  id: number;
  modal: typeof Modal;
  open: boolean;
} & Partial<ShowProps>;

const modalId = 'react-modal';

let modalContainer = document.getElementById(modalId);

if (!modalContainer) {
  modalContainer = document.createElement('div');
  modalContainer.id = modalId;
  document.body.append(modalContainer);
}

const root = ReactDOM.createRoot(modalContainer);

const useModal = () => {
  const [modalList, setModalList] = useState<ModalItem[]>([]);
  const [destroyState, setDestroyState] = useState<DestroyStateValue>('');
  const show = (props?: Partial<ShowProps>) => {
    setModalList((prev) => [
      ...prev,
      {
        id: new Date().getMilliseconds() + 1,
        modal: Modal,
        open: true,
        ...props,
      },
    ]);
  };

  const destroy = () => {
    setDestroyState(DESTROY_STATE.DESTROY_ALL);
  };

  const onCloseModal = (modalId: number) => {
    const newModalList = modalList.filter((ele) => {
      if (ele.id === modalId && ele.open) {
        ele.open = false;
      }

      return ele;
    });
    setDestroyState(DESTROY_STATE.DESTROY_ONE);
    setModalList(newModalList);
  };

  useEffect(() => {
    const modalListComponents = modalList.map((ele, index) => {
      const { modal, id, open, content, title } = ele;

      const ModalElement = modal;

      return (
        <ModalElement
          className={`react-modal-element-${id}`}
          title={title}
          children={content}
          zIndex={index}
          key={id}
          open={Boolean(open)}
          onClose={() => onCloseModal(id)}
        />
      );
    });

    root.render(<>{modalListComponents}</>);
  }, [modalList, onCloseModal]);

  useEffect(() => {
    switch (destroyState) {
      case DESTROY_STATE.DESTROY_ALL: {
        setModalList((prev) => prev.map((ele) => ({ ...ele, open: false })));
        setDestroyState(DESTROY_STATE.DESTROYED);
        return;
      }
      case DESTROY_STATE.DESTROY_ONE: {
        setTimeout(() => {
          setModalList((prev) => prev.filter((ele) => ele.open));
          setDestroyState(DESTROY_STATE.DEFAULT);
        }, MAX_DURATION);
        return;
      }
      case DESTROY_STATE.DESTROYED: {
        setTimeout(() => {
          setModalList((prev) => prev.filter((ele) => ele.open));
          setDestroyState(DESTROY_STATE.DEFAULT);
        }, MAX_DURATION);

        return;
      }

      default:
        break;
    }
  }, [destroyState]);

  return {
    show,
    destroy,
  };
};

export default useModal;
