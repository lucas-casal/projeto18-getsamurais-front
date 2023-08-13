import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/UserContext";
import logoGif from "../assets/getsamurais-logo.gif";
import logo from "../assets/getsamurais-logo-static.png";
import logoSimple from "../assets/getsamurais-logo-simple.png"
import buscarCookie from "./buscarCookie";
import axios from "axios";
export default function Footer(props) {
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
    <Foot>
        <SignOutBtn onClick={() => navigate('/home')} disabled={props.page === 'home'}>Home</SignOutBtn>
        <SignOutBtn onClick={() => navigate('/my-services')}disabled={props.page === 'my services'}>Meus serviços</SignOutBtn>
        <SignOutBtn onClick={() => navigate('/new-service')}disabled={props.page === 'add service'}>Adicionar serviço</SignOutBtn>

    </Foot>
    </>
  );
}
const SignOutBtn = styled.button`
   height: 100%;
   width: 100%;
   border: 1px solid red;
   font-size: 20px;

      &:active{
    background-color: #ff3131;
    color: white;
    border: 1px solid black;
    border-top: 1px solid #ff3131;
   }
   &:disabled{
    background-color: #ff3131;
    color: white;
    font-weight: bold;
    border-top: 1px solid #ff3131;
   }
`
const ImageLogo = styled.img`
  height: 30vh;

`
const Foot = styled.div`
  height: 10vh;
  width: 100vw;
  position: fixed;
  background-color: white;
  z-index: 10;
  bottom: 0;
  left:0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow-y: hidden;
`;
