import { useRef} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {SweetAlertError} from '../components/sweetAlert'
export default function Login() {
    const navigator=useNavigate();
    const getEmail = useRef();
    const getPassword = useRef()

    async function getToken(e) {
        e.preventDefault();
        try {
            const response = await axios.post("https://notesfullstack-7wtx.onrender.com/users/login", {
                email: getEmail.current.value,
                password: getPassword.current.value
            });

            localStorage.setItem('data' , JSON.stringify({token:response.data.data.token , name:response.data.data.name}));
            navigator('/');
        }
        catch(error){
            const message = error.response.data.message
            SweetAlertError(message);
        }
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="max-w-full sm:max-w-[30rem] w-full h-full sm:h-2/3 flex flex-col justify-center gap-8 bg-slate-400 px-12 sm:rounded-lg">
                <h2 className="heading mx-auto mb-5">Login</h2>
                <input type="email" placeholder="email" ref={getEmail} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <input type="password" placeholder="password" ref={getPassword} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <button onClick={getToken} className='bg-blue-500 hover:bg-blue-700 text-white rounded-3xl py-2 w-1/3 mx-auto'>Login</button>
                <span className="mx-auto mt-8">Don't have an account? <Link to="/signup" className=" text-violet-800 underline">Register Here</Link></span>
            </form>
        </div>
    )
}