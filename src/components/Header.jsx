import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/UserContext";
import logoGif from "../assets/getsamurais-logo.gif";
import logo from "../assets/getsamurais-logo-static.png";
import logoSimple from "../assets/getsamurais-logo-simple.png"
import buscarCookie from "./buscarCookie";
import axios from "axios";
export default function Header(props) {
  const [GIF, setGIF] = useState('ok')
  const {logged, setLogged} = useContext(LoggedContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token')
  
  useEffect( () => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
      setUser(res.data)
    })
    .catch(console.log)
    setTimeout(() => {
      setGIF('')
    }, 5000)
    }, [token])

    function signOut(){
      localStorage.clear()

      setLogged(false)      
      navigate('/')
    }
  return (
    <>
    <Head home={props.home}>
        <ImageLogo src={props.home === 'home' ? logoSimple : (props.home === 'my services' ? user.picture : (GIF ? logoGif : logo))} />
        {props.home? <SignOutBtn onClick={() => signOut()}>Sair</SignOutBtn> : ''}
    </Head>
    </>
  );
}
const SignOutBtn = styled.button`
   border: 1px dashed red;
   border-radius: 10px;
   &:active{
    background-color: red;
    color: white;
    border: 1px solid black;
   }
`
const ImageLogo = styled.img`
  height: 30vh;
  max-width: 50vw;


`
const Head = styled.div`
  height: ${x => x.home ? '10vh' : '30vh'};
  width: 100vw;
  position: fixed;
  background-color: white;
  z-index: 10;
  top: 0;
  left:0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow-y: hidden;
`;
