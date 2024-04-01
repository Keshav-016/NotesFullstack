import { HiPencil } from "react-icons/hi2";
import { ImBin } from "react-icons/im";
import {SweetAlert , SweetAlertError}  from "./sweetAlert";
import axios from "axios";
export default function Card({ title, description, updatedAt, _id , isVisible ,setLoaded, editNote , selectMany , uncheckCard , updateisChange}) {
    const updatedDate = updatedAt.substring(0, 10);
    const updatedTime = updatedAt.substring(11, 19);

    async function deleteNote() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData.token;
        try {
            updateisChange(true);
            await axios.delete(`http://127.0.0.1:5000/notes/delete-note/${_id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            SweetAlert(`Successfully deleted note with title : ${title}`)
            updateisChange(false);
        }
        catch(error){
            const message = error.response.data.message
            SweetAlertError(message);
        }
    }

    async function toggleVisiblity() {
        const storageData = JSON.parse(localStorage.getItem('data'));
        const token = storageData?.token;

        try {
            setLoaded(true);
            await axios.get(`http://localhost:5000/notes/toggle-visiblity/?id=${_id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                },)
            setLoaded(false);
        }
        catch (error) {
            const message = error.response.data.message
            SweetAlertError(message);
        }
    }

    function selectNote(e){
        if(e.target.checked){
            selectMany(_id);
        }
        else{
            uncheckCard(_id);
        }
    }

    return (
        <div className="w-[19rem] flex-shrink-0 mb-5 p-5 border">
            <div className="flex justify-between">
                <span className={"py-1 px-4 rounded-3xl text-white hover:cursor-pointer " + (isVisible?'bg-blue-500':'bg-gray-400')} onClick={toggleVisiblity}>{isVisible?'Note':'Hidden'}</span>
                <div className="flex gap-5">
                    <input type="checkbox" className="mb-1 hover:cursor-pointer" onClick={(e)=>selectNote(e)}/>
                    <HiPencil className="mt-1 cardButtons hover:cursor-pointer" onClick={() => editNote(_id, title, description)}/>
                    <ImBin className="mt-1 cardButtons hover:cursor-pointer" onClick={deleteNote} />
                </div>
            </div>
            <div className="w-full ms-1">
                <h3 className="my-3 font-bold overflow-x-auto no-scrollbar">{title}</h3>
                <p className="overflow-x-auto no-scrollbar">{description}</p>
                <span className="block w-fit ms-auto mt-12 text-gray-400 italic font-light">{`${updatedDate}  ${updatedTime}-IST`}</span>
            </div>
        </div>
    )
}