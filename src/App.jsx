import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoggedContext } from "./contexts/UserContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddService from "./pages/AddService";
import MyServices from "./pages/MyServices";
import ServicePage from "./pages/ServicePage";


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
            <Route path="/new-service" element={<AddService/>}/>
            <Route path="/my-services" element={<MyServices/>}/>
            <Route path="/services/:id" element={<ServicePage/>}/>
          </Routes>
        </BrowserRouter>
      </LoggedContext.Provider>
    );
}
