import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import ReactDOM from 'react-dom/client';

type ModalItem = {
  id: number;
  modal: typeof Modal;
  open?: boolean;
};

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

  const show = () => {
    setModalList((prev) => [
      ...prev,
      {
        id: new Date().getMilliseconds() + 1,
        modal: Modal,
        open: true,
      },
    ]);
  };

  const destroy = () => {};

  const onCloseModal = (modalId: number) => {
    const newModalList = modalList.filter((ele) => {
      if (ele.id === modalId && ele.open) {
        ele.open = false;
      }

      return ele;
    });
    setModalList(newModalList);
  };

  useEffect(() => {
    const modalListComponents = modalList.map((ele, index) => {
      const ModalElement = ele.modal;

      return (
        <ModalElement
          zIndex={index}
          key={ele.id}
          open={Boolean(ele?.open)}
          onClose={() => onCloseModal(ele.id)}
        />
      );
    });

    root.render(<>{modalListComponents}</>);
  }, [modalList, onCloseModal]);

  return {
    show,
    destroy,
  };
};

export default useModal;
