import { useState } from 'react';
import Modal from './Modal';
import useModal from './hooks/useModal';

function App() {
  const [open, setOpen] = useState(false);

  const { show, destroy } = useModal();

  return (
    <>
      <button onClick={() => setOpen(!open)}>open modal component</button>
      <Modal title='Modal' open={open} onClose={() => setOpen(false)}>
        <button
          onClick={() =>
            show({
              title: 'Modal',
              content: (
                <button
                  onClick={() =>
                    show({
                      title: 'Nested Modal',
                      content: (
                        <div>
                          <p>Next Modal</p>
                          <button onClick={() => destroy()}>destroy</button>
                        </div>
                      ),
                    })
                  }
                >
                  open modal
                </button>
              ),
            })
          }
        >
          show additional component
        </button>
      </Modal>
      <button
        onClick={() =>
          show({
            title: 'Modal',
            content: (
              <button
                onClick={() =>
                  show({
                    title: 'Nested Modal',
                    content: (
                      <div>
                        <p>Next Modal</p>
                        <button onClick={() => destroy()}>destroy</button>
                      </div>
                    ),
                  })
                }
              >
                open modal
              </button>
            ),
          })
        }
      >
        open modal
      </button>
    </>
  );
}

export default App;
