import { HiPencil } from "react-icons/hi2";
import { ImBin } from "react-icons/im";
import axios from "axios";
export default function Card({ title, description, updatedAt, _id ,setLoaded, editNote}) {
    const newDate = new Date(updatedAt)
    async function deleteNote() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData.token;
        try {
            setLoaded(true);
            await axios.delete(`http://127.0.0.1:5000/notes/delete-note/${_id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setLoaded(false);
        }
        catch(error){
            console.log(error.message);
        }
    }
    return (
        <div className="w-[19rem] flex-shrink-0 mb-5 p-5 border">
            <div className="flex justify-between">
                <span className="bg-blue-500 py-1 px-4 rounded-3xl text-white hover:cursor-pointer">Note</span>
                <div className="flex gap-5">
                    <input type="checkbox" className="mb-1 hover:cursor-pointer" />
                    <HiPencil className="mt-1 cardButtons hover:cursor-pointer" onClick={() => editNote(_id, title, description)}/>
                    <ImBin className="mt-1 cardButtons hover:cursor-pointer" onClick={deleteNote} />
                </div>
            </div>
            <div className="w-full ms-1">
                <h3 className="my-3 font-bold">{title}</h3>
                <p>{description}</p>
                <span className="block w-fit ms-auto mt-12">{`${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`}</span>
            </div>
        </div>
    )
}