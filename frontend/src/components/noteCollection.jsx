import Card from './noteCard';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Body({ Loaded, setLoaded, editNote }) {

    const [dbData, setdbData] = useState(null);
    const [name , changeName] = useState("User");
    const [isUser , updateIsUser] = useState(false);

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
    useEffect(() => {
        getData();
    }, [Loaded , isUser])

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
                        <span className="all">ALL</span>
                        <span>PENDING</span>
                        <span>LATEST</span>
                        <span>HIDDEN</span>
                    </div>
                    <hr />
                </div>
                <div className="flex gap-3">
                    <button type="button" className="bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded-3xl">DELETE</button>
                    <button type="button" className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 rounded-3xl">HIDE</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-start-w-[1000px]  mt-10 max-w-[60rem] w-full gap-5 mx-auto mx-6">
                {
                    dbData?.data.map((item, index) => <Card {...item} key={index} setLoaded={setLoaded} editNote={editNote} />)
                }
            </div>
        </div>
    )
}