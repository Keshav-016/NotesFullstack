import Card from './noteCard';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Body({ Loaded, setLoaded, editNote }) {

    const [dbData, setdbData] = useState(null);
    const [name , changeName] = useState("User");
    const [isUser , updateIsUser] = useState(false);
    const [selectedMenu , updateSelected] = useState();
    const [selectedCard , updateSelectedCard] = useState([]);
    const allItem=useRef(null);

    async function getData() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData?.token;
        if(token){
            updateIsUser(true);
        }
        storageData?.name?changeName(storageData?.name.toUpperCase()):changeName("USER");
        try {
            const response = await axios.get('http://localhost:5000/notes', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return setdbData(response.data);
        }
        catch (error) {
            console.log(error.message)
            setdbData(null)
        }
    }

    function logout(){
        localStorage.removeItem('data');
        updateIsUser(false);
    }

    function updateColor(e){
        selectedMenu.style.color="black";
        selectedMenu.style.borderColor="transparent";
        updateSelected(e.target);
        e.target.style.color="blue";
        e.target.style.borderColor="blue";
    }
    function selectMany(item){
        updateSelectedCard((prev)=>[item , ...prev]);
        console.log(selectedCard);
    }

    useEffect(() => {
        getData();
    }, [Loaded , isUser])

    useEffect(()=>{
        updateSelected(allItem.current);
    },[allItem])

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
                        <span ref={allItem} className="all" onClick={updateColor}>ALL</span>
                        <span onClick={(e) => updateColor(e)}>PENDING</span>
                        <span onClick={updateColor}>LATEST</span>
                        <span onClick={updateColor}>HIDDEN</span>
                    </div>
                    <hr />
                </div>
                <div className="flex gap-3">
                    <button type="button" className="bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded-3xl">DELETE</button>
                    <button type="button" className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 rounded-3xl">HIDE</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start   mt-10 max-w-[60rem] w-full gap-5 ">
                {
                    dbData?.data.map((item, index) => <Card {...item} key={index} setLoaded={setLoaded} editNote={editNote} selectMany={selectMany}/>)
                }
            </div>
        </div>
    )
}