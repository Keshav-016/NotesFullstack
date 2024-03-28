import Home from "./pages/home";
import Login from "./pages/login";
import { Route , Routes } from "react-router-dom";

import './App.css';
import SignUp from "./pages/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
