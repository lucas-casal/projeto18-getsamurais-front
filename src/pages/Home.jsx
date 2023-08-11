import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { LoggedContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import ShortenedAlready from "../components/ShortenedAlready";
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

export default function Home() {
  const loggedcontexto = useContext(LoggedContext)
  const [shortArray, setShortArray] = useState([])
  const [disableForm, setDisableForm] = useState(false)
  const [URL, setURL] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
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
      setShortArray(res.data.shortenedUrls)
      setDisableForm(false)
    })
    .catch(err =>{
      console.log(err)
    })
  } else{
    navigate('/login')
  }},[disableForm])
console.log(shortArray)

  return (
    <PageArea>
      <Header />
      <SCForm onSubmit={(ev) => sendSignUpForm(ev)}>
          <InputCadastro
            onChange={(x) => setURL(x.target.value)}
            type="url"
            id="url"
            placeholder="Links que cabem no bolso"
            required
            value={URL}
            disabled={disableForm}
          ></InputCadastro>

          <SendBtn type="submit" disabled={disableForm} >{ disableForm ? pontinhos : 'Encurtar link' }</SendBtn>
      </SCForm>
      <RankingContainer>
        {shortArray.map(x => {
          return <ShortenedAlready setDisableForm={setDisableForm} nickname={x.nickname} key={x.id} id={x.id} shortUrl={x.shortUrl} views={x.visitCount} url={x.url} />
        })}
      </RankingContainer>
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
  width: 80vw;
  height: 45vh;
  position: fixed;
  top: 45vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  overflow-y: scroll;
  overflow-x: show;
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
