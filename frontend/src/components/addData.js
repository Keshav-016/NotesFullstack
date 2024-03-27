import Modal from 'react-modal';
import axios from 'axios';
import { useState } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement(document.getElementById('root'));

export default function AddData({ modalIsOpen, setIsOpen, setLoaded }) {
    async function addNote() {
        setLoaded(true)
        try {
            await axios.post("http://127.0.0.1:5000/notes/add-note",
                {
                    title: newTitle,
                    description: newDescription
                },
                {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiZTIxY2IwNjdiOTFmNTdhNmE0NjQiLCJpYXQiOjE3MTE1NDQzMTQsImV4cCI6MTcxMTU2ODMxNH0.vrB5uYRJaj6nZ897RTdqUbZ8-FhDIl7Io5nSElG8ld8"
                    },
                },)

            setLoaded(false);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    function handleClick(e) {
        e.preventDefault();
        console.log(newTitle, newDescription);
        addNote();
        setNewTitle("");
        setNewDescription("");
        closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <form className='flex flex-col gap-5 w-[20rem]'>
                    <h2 className=' text-xl text-center font-bold mb-5'>Enter the Note</h2>
                    <input onChange={(e) => setNewTitle(e.target.value)} type='text' placeholder='Title' className="border py-2 ps-4 rounded-lg outline-none" />
                    <textarea onChange={(e) => setNewDescription(e.target.value)} rows={5} placeholder='Description' className="border py-2 ps-4 rounded-lg outline-none" />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white rounded-3xl py-3' onClick={handleClick} >Submit</button>
                </form>
            </Modal>
        </div>
    );
}