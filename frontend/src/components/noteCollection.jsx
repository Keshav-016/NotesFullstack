import Card from './noteCard';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { SweetAlert, SweetAlertError } from './sweetAlert';

export default function Body({ Loaded, setLoaded, editNote, searchedNote }) {

    const navigate = useNavigate();
    const [dbData, setdbData] = useState(null);
    const [name, changeName] = useState("User");
    const [isUser, updateIsUser] = useState(false);
    const [selectedMenu, updateSelected] = useState();
    const [selectedCard, updateSelectedCard] = useState([]);
    const [url, updateUrl] = useState('http://localhost:5000/notes/show-visible');
    const [isChange, updateisChange] = useState(false);
    const allItem = useRef(null);

    async function getData() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData?.token;
        if (token) {
            updateIsUser(true);
        }
        storageData?.name ? changeName(storageData?.name.split(' ')[0].toUpperCase()) : changeName("USER");
        try {
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return setdbData(response.data);
        }
        catch (error) {
            const message = error.response.data.message
            console.log(message);
            setdbData(null)
        }
    }
    
    async function deleteMany() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData?.token;
        if (selectedCard.length === 0) {
            SweetAlertError("No items selected")
            return;
        }
        else if (token) {
            updateIsUser(true);
        }
        else {
            alert("Login first!!!");
            navigate('/login');
        }
        try {
            await axios.delete('http://localhost:5000/notes/delete-many',
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        itemIds: selectedCard
                    }
                },)
            SweetAlert("Successfully deleted many notes")
            updateSelectedCard([]);
            updateisChange(true);
        }
        catch (error) {
            const message = error.response.data.message
            SweetAlertError(message);
            setdbData(null)
        }
    }

    async function hideNote() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData?.token;
        if (selectedCard.length === 0) {
            SweetAlertError("No items selected")
            return;
        }
        else if (token) {
            updateIsUser(true);
        }
        else {
            alert("Login first!!!");
            navigate('/login');
        }
        try {
            await axios.post('http://localhost:5000/notes/hideNote',
                {
                    itemIds: selectedCard
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                },)
            updateSelectedCard([]);
            updateisChange(true);
        }
        catch (error) {
            const message = error.response.data.message
            SweetAlertError(message);
            setdbData(null)
        }
    }

    function logout() {
        localStorage.removeItem('data');
        updateIsUser(false);
        SweetAlert("Successfully loggedOut")
    }

    function changeUrl(e) {
        selectedMenu.style.color = "black";
        selectedMenu.style.borderColor = "transparent";
        updateSelected(e.target);
        e.target.style.color = "blue";
        e.target.style.borderColor = "blue";
        if (e.target.innerText === "ALL") {
            updateUrl("http://localhost:5000/notes");
        }
        else if (e.target.innerText === "LATEST") {
            updateUrl("http://localhost:5000/notes/latest-notes");
        }
        else if (e.target.innerText === "HIDDEN") {
            updateUrl("http://localhost:5000/notes/show-hidden");
        }
        else {
            updateUrl("http://localhost:5000/notes/show-visible");
        }
    }

    function selectMany(item) {
        updateSelectedCard((prev) => [item, ...prev]);
    }
    function uncheckCard(item) {
        updateSelectedCard(() => selectedCard.filter((element) => element !== item))
    }

    useEffect(() => {
        updateSelected(allItem.current);
    }, [allItem])

    useEffect(() => {
        if (searchedNote!=="") {
            updateUrl(`http://localhost:5000/notes/get-note/?title=${searchedNote}`);
        }
        else{
            updateUrl('http://localhost:5000/notes/show-visible');
        }
    }, [searchedNote]);

    useEffect(() => {
        getData();
        updateisChange(false);
    }, [Loaded, isUser, isChange, url])

    return (
        <div className="max-w-[60rem] w-full mx-auto">
            <div className='flex gap-3 mx-6'>
                <h1 className="my-5 text-2xl font-bold">{`${name}'S Notes`}</h1>
                {!isUser && <Link to="/login" className='my-auto'><button type="button" className="bg-blue-500 text-white hover:bg-blue-700 h-fit py-1 px-4 rounded-3xl">LOGIN</button></Link>}
                {isUser && <button type="button" className="my-auto bg-red-500 text-white hover:bg-red-700 h-fit py-1 px-4 rounded-3xl" onClick={logout}>LOGOUT</button>}
            </div>
            <div className="flex flex-wrap-reverse gap-5 justify-between mx-6">
                <div>
                    <div className="flex gap-5 menu">
                        <span onClick={changeUrl}>ALL</span>
                        <span ref={allItem} onClick={changeUrl} className="visible">VISIBLE</span>
                        <span onClick={changeUrl}>LATEST</span>
                        <span onClick={changeUrl}>HIDDEN</span>
                    </div>
                    <hr />
                </div>
                <div className="flex gap-3 ">
                    <button type="button" className="bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded-3xl" onClick={deleteMany}>DELETE</button>
                    <button type="button" className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 rounded-3xl" onClick={hideNote}>HIDE</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start   mt-10 max-w-[60rem] w-full gap-5 ">
                {
                    dbData?.data?.length > 0 ? dbData.data.map((item, index) => <Card {...item} key={`${item.title}-index`} setLoaded={setLoaded} editNote={editNote} selectMany={selectMany} uncheckCard={uncheckCard} updateisChange={updateisChange} />) : <h2 className='md:ms-6'>NOTHING TO SHOW</h2>
                }
            </div>
        </div>
    )
}