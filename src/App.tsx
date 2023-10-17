import { useState } from 'react';
import Modal from './Modal';
import useModal from './hooks/useModal';

function App() {
  const [open, setOpen] = useState(false);

  const { show } = useModal();

  return (
    <>
      <button onClick={() => setOpen(!open)}>open modal component</button>
      <Modal title="Modal" open={open} onClose={() => setOpen(false)} />
      <button onClick={show}>open modal</button>
    </>
  );
}

export default App;
