import Navbar from '../components/navbar';
import Body from '../components/noteCollection';
import AddData from '../components/modal';
import { useState } from "react";


export default function Home() {
  const [loaded, setloaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cardEdit, setCardEdit] = useState({});
  const [search , setSearch] = useState();
  
  function searchNote(searchedValue){
    setSearch(searchedValue);
  }

  function openModal() {
    setIsOpen(true);
  }

  function editNote(_id, title, description) {
    setCardEdit({ _id:_id, title:title, description:description });
    openModal();
  }


  return (
    <div>
      <Navbar  openModal={openModal} searchNote={searchNote}/>
      <Body Loaded={loaded} setLoaded={setloaded} editNote={editNote} searchedNote={search}/>
      <AddData modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setLoaded={setloaded} cardEdit={cardEdit}/>
    </div>
  );
}