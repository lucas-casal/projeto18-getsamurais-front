import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/UserContext";
import logoGif from "../assets/getsamurais-logo.gif";
import logo from "../assets/getsamurais-logo-static.png"
import buscarCookie from "./buscarCookie";
import axios from "axios";
export default function Header() {
  const [GIF, setGIF] = useState('ok')
  const {logged, setLogged} = useContext(LoggedContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const token = localStorage.getItem('token')
  
  useEffect( () => {
    setTimeout(() => {
      setGIF('')
    }, 5000)
    }, [token])

    function signOut(){
      localStorage.clear()
      document.cookie=`id=`
      document.cookie=`name=`
      setLogged(false)      
      navigate('/login')
    }
  return (
    <>
    <Head>
        <ImageLogo src={GIF ? logoGif : logo} />
    </Head>
    </>
  );
}

const ImageLogo = styled.img`
  height: 30vh;

`
const Head = styled.div`
  height: 30vh;
  width: 100vw;
  position: fixed;
  background-color: white;
  z-index: 10;
  top: 0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;

`;
