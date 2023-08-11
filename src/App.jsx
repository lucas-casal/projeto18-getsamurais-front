import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoggedContext } from "./contexts/UserContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Ranking from "./pages/Ranking";
import Home from "./pages/Home";


export default function App() {
  const [logged, setLogged] = useState(false)


  useEffect(() => {
  if (localStorage.getItem('token')){
    setLogged(true)
  }
  }, [localStorage.getItem('token')])
  
    return (
      <LoggedContext.Provider value={{logged, setLogged}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </LoggedContext.Provider>
    );
}
