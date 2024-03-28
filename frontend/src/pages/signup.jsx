import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
    const [getEmail, setEmail] = useState();
    const [getPassword, setPassword] = useState();
    const [getName , setName] = useState();


    const navigator=useNavigate();
    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:5000/users/register", {
                name:getName,
                email: getEmail,
                password: getPassword
            });

            navigator('/login');
        }
        catch(error){
            console.log(error.message)
        }
    }
    return (
        <div className="w-full h-screen flex justify-center items-center mx-10">
            <form className=" max-w-[30rem] w-full h-2/3 flex flex-col justify-center gap-8 bg-slate-400 px-12 rounded-lg">
                <h2 className="heading mx-auto mb-5">SignUp</h2>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <button onClick={registerUser} className='bg-blue-500 hover:bg-blue-700 text-white rounded-3xl py-2 w-1/3 mx-auto'>Login</button>
                <span className="mx-auto mt-8">Have an account? <Link to="/login" className=" text-violet-800 underline">Login Here</Link></span>
            </form>
        </div>
    )
}