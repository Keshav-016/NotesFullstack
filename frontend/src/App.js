import Navbar from './sections/navbar';
import Body from './sections/body';
import AddData from './components/addData';
import { useState } from "react";

import './App.css';

function App() {
  const [loaded, setloaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }


  return (
    <div>
      <Navbar  openModal={openModal}/>
      <Body Loaded={loaded} setLoaded={setloaded} />
      <AddData modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setLoaded={setloaded}/>
    </div>
  );
}

export default App;
