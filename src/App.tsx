import { useState } from 'react';
import Modal from './Modal';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>open modal</button>
      <Modal title="Modal" open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default App;
