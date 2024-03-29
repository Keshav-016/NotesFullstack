import Modal from 'react-modal';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function AddData({ modalIsOpen, setIsOpen, setLoaded, cardEdit }) {
    const navigate = useNavigate();
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editCheck , setEditCheck] = useState(false);
    async function addNote() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData?.token;
        if(!token){
            alert("User not logged in")
            navigate('/login');
            return;
        }
        try {
            setLoaded(true);
            if (!editCheck) {
                await axios.post("http://127.0.0.1:5000/notes/add-note",
                    {
                        title: newTitle,
                        description: newDescription
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    },)

                setLoaded(false);
            }
            else {
                await axios.put(`http://127.0.0.1:5000/notes/update-note/${cardEdit._id}`,
                    {
                        title: newTitle,
                        description: newDescription
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    },)

                setLoaded(false);
                setEditCheck(false);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (Object.keys(cardEdit).length!==0) {
            setNewTitle(cardEdit.title);
            setNewDescription(cardEdit.description);
            setEditCheck(true);
        }
    }, [cardEdit]);

    function handleClick(e) {
        e.preventDefault();
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
                    <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle || ""} type='text' placeholder='Title' className="border py-2 ps-4 rounded-lg outline-none" />
                    <textarea onChange={(e) => setNewDescription(e.target.value)} value={newDescription || ""} rows={5} placeholder='Description' className="border py-2 ps-4 rounded-lg outline-none" />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white rounded-3xl py-3' onClick={handleClick} >Submit</button>
                </form>
            </Modal>
        </div>
    );
}