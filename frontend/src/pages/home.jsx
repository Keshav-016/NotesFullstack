import Navbar from '../components/navbar';
import Body from '../components/noteCollection';
import AddData from '../components/addData';
import { useState } from "react";


export default function Home() {
  const [loaded, setloaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cardEdit, setCardEdit] = useState({});

  function openModal() {
    setIsOpen(true);
  }

  function editNote(_id, title, description) {
    setCardEdit({ _id:_id, title:title, description:description });
    openModal();
  }


  return (
    <div>
      <Navbar  openModal={openModal}/>
      <Body Loaded={loaded} setLoaded={setloaded} editNote={editNote}/>
      <AddData modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setLoaded={setloaded} cardEdit={cardEdit}/>
    </div>
  );
}