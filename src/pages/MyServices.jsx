import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { LoggedContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import ShortenedAlready from "../components/ShortenedAlready";
import Footer from "../components/Footer";
import UserServiceBox from "../components/UserServiceBox";
const pontinhos = 
<ThreeDots 
height="20" 
width="100%" 
radius="9"
color="black" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />

export default function MyServices() {
  const loggedcontexto = useContext(LoggedContext)
  const [shortArray, setShortArray] = useState([])
  const [disableForm, setDisableForm] = useState(false)
  const [URL, setURL] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [checkbox, setCheckbox] = useState('')
  
  async function sendSignUpForm(ev) {
    ev.preventDefault();
    setDisableForm(true)
    const loginInfo = {url: URL};

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/urls/shorten`, loginInfo, {headers: {Authorization: `Bearer ${token}`}});
      setURL('')
    } catch (err) {
      console.log(err); 
      if (err.response.status === 409) return alert(`O url ${URL} já foi encurtado por outro usuário`) 
      if (err.response.status === 401) return alert(`Você precisa estar logado para poder fazer essa ação!`)    
    } finally{
      setDisableForm(false)
    }
  }

  useEffect(() => {
    if (token){
    axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
      console.log(res)
      setShortArray(res.data.servicesOffered)
      setDisableForm(false)
      setCheckbox('')
    })
    .catch(err =>{
      console.log(err)
    })
  } else{
    navigate('/login')
  }},[checkbox, disableForm])
console.log(shortArray)

  return (
    <PageArea>
      <Header home={'my services'}/>
      <RankingContainer>
        {shortArray.map(x => {
          return <UserServiceBox setCheckbox={setCheckbox} available={x.available} setDisableForm={setDisableForm} title={x.title} key={x.id} id={x.id} price={x.price} mainPhoto={x.mainPhoto} />
        })}
      </RankingContainer>
      <Footer page={'my services'}/>
    </PageArea>
  );
}
const SCForm = styled.form`
  width: 100vw;
  height: 60px;

  display: flex;
  position: fixed;
  top: 32vh;
  flex-direction: row;
  padding-left: 20vw;
  align-items: center;
  gap: 8vw;

`
const InputCadastro = styled.input`
  width: 57%;
  height: 60px;
  border-radius: 12px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  background: #FFF;
  box-shadow: 0px 4px 24px 0px rgba(120, 177, 89, 0.80);
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 3%;
  &::placeholder {
    color: #9C9C9C;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &:disabled{
    opacity: 30%;
  }
`;
const SendBtn = styled.button`
  width: 182px;
  height: 60px;
  border-radius: 12px;
  background: #5D9040;
  color: #FFF;
  text-align: center;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:disabled{
    opacity: 30%;
  }
`;

const RankingContainer = styled.div`
  width: 100vw;
  height: 80vh;
  background-image: linear-gradient(to bottom, white, #ff3131);
  position: fixed;
  top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
`
const Title = styled.h1`
  font-family: 'Lexend Deca', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
  position: fixed;
  top: 27vh;
`
const Text = styled.h2`
  font-family: 'Lexend Deca', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
  position: fixed;
  top: 80vh;
`
const SCimage = styled.img`
  width: 56px;

`
const PageArea = styled.div`
  width: 100vw;
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Roboto";
`;
