import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { LoggedContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import ShortenedAlready from "../components/ShortenedAlready";
import Footer from "../components/Footer";
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

export default function AddService() {
  const loggedcontexto = useContext(LoggedContext)
  const [disableForm, setDisableForm] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [phone, setPhone] = useState('')
  const [CEL, setCEL] = useState('')
  const [disableCEL, setDisableCEL] = useState(true)
  const [description, setDescription] = useState('')
  const [preview, setPreview] = useState('')
  const [picture, setPicture] = useState('')


  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  async function sendSignUpForm(ev) {
    ev.preventDefault();
    setDisableForm(true)
    const loginInfo = {title: title};

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/urls/shorten`, loginInfo, {headers: {Authorization: `Bearer ${token}`}});
      setTitle('')
    } catch (err) {
      console.log(err); 
      if (err.response.status === 409) return alert(`O url ${URL} já foi encurtado por outro usuário`) 
      if (err.response.status === 401) return alert(`Você precisa estar logado para poder fazer essa ação!`)    
    } finally{
      setDisableForm(false)
    }
  }
  function handleCheckbox(x){
    console.log(x.target.checked)
    setDisableCEL(x.target.checked)
  }
  function mascaraReal(x){
    let number= x.target.value;
    number = number.match(/\d/g)?.join("")
    const formatPrice = parseFloat(number/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    setPrice(number)
    x.target.value = formatPrice
  }
  function celMascara(cel) {

    let celFormat = cel.target.value.replace(/\D/g, "");
    setPhone(celFormat)
    celFormat = celFormat.replace(/^(\d\d)(\d)/g, "($1)$2");
    celFormat = celFormat.replace(/(\d{5})(\d)/, "$1-$2");
    setCEL(celFormat);
  } 
  useEffect(() => {
    if (picture[0]){
      const objectUrl = URL.createObjectURL(picture[0])
      setPreview(objectUrl)
    }
    setDisableForm('ok')
    axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {headers: {Authorization: `bearer ${token}`}})
    .then(res => {
      setPhone(res.data.phone)
      let celFormat = res.data.phone.replace(/^(\d\d)(\d)/g, "($1)$2");
      celFormat = celFormat.replace(/(\d{5})(\d)/, "$1-$2");
      setCEL(celFormat)
      setDisableForm('')

    })  
    .catch(console.log)
    },[disableCEL, picture])

  return (
    <PageArea>
      <Header home={'home'}/>
      <SCForm onSubmit={(ev) => sendSignUpForm(ev)}>
          <InputCadastro
            onChange={(x) => setTitle(x.target.value)}
            type="text"
            id="title"
            placeholder="* Nome do serviço"
            required
            value={title}
            disabled={disableForm}
          ></InputCadastro>
          <InputCadastro
            onChange={(x) => mascaraReal(x)}
            type="text"
            id="price"
            placeholder="* Preço do serviço"
            required
            disabled={disableForm}
          ></InputCadastro>
          <DescriptionInput
            onChange={(x) => setDescription(x.target.value)}
            type="text"
            id="description"
            placeholder="* Descrição do serviço
Máx: 400 caracteres "

            required
            value={description}
            disabled={disableForm}
            maxLength={400}
          ></DescriptionInput>
          <CounterBox>{description.length}/400</CounterBox>
          <InputCadastro
            onChange={(x) => celMascara(x)}
            type="text"
            id="CEL"
            placeholder="* Celular"
            required
            value={CEL}
            disabled={disableForm || disableCEL}
          ></InputCadastro>
          <CheckboxLabel checked={disableCEL}>
            <CheckboxInput
              onClick={(x) => handleCheckbox(x)}
              type="checkbox"
              id="checkbox"
              defaultChecked='true'
              required
              disabled={disableForm}
            ></CheckboxInput>
          {disableCEL ? 'Usar o número do meu cadastro' : 'Usar outro número de contato'}

          </CheckboxLabel>
          
          <PictureLabel htmlFor="picture">
            <PictureInput
              onChange={(x) => x.target.files[0] ? setPicture(x.target.files) : ''}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="picture"
              placeholder="Foto de perfil"
              disabled={disableForm}
            ></PictureInput>
            <SCdiv >
            {picture ? <SCimage src={preview} /> : <SCdiv> Foto principal </SCdiv>}
            </SCdiv>
          </PictureLabel>
          <SendBtn type="submit" disabled={disableForm} >{ disableForm ? pontinhos : 'Criar serviço' }</SendBtn>
      
          
      
      </SCForm>
     <Footer page={'add service'}/>
    </PageArea>
  );
}
const SCdiv = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  margin-top: -5px;
  align-items: center;
  justify-content: center;
`;

const PictureInput = styled.input`
  display: none;
`;
const SCimage = styled.img`
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const PictureLabel = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed #ff3131;
  background: #FFF;
  box-shadow: 0px 4px 24px 0px #ff313194;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  overflow:hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ff3131;
  &:active{
    background-color: #ff313194;
    color: white;
  }

`
const CheckboxLabel = styled.label`
  width: 45%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 12px;
  margin-top: -2vh;
  background-color: ${x => x.checked ? '#ffd900' : '#ffffff40'};
  color: ${x => x.checked ? 'black' : '#ffffff'};
`
const CheckboxInput = styled.input`
  display: none;
`
const DescriptionInput = styled.textarea`
  width: 57%;
  height: 200px;
  border-radius: 12px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  background: #FFF;
  box-shadow: 0px 4px 24px 0px #ffd90090;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 3%;
  padding-top: 10px;
  resize: none;
  color: #ff3131;
  &::placeholder {
    color: #9C9C9C;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:disabled{
    opacity: 30%;
  }
`
const CounterBox = styled.span`
font-size: 15px;
color: black;
margin-top: -3vh;
text-align: end;
align-self: end;
margin-right: 21%;
`
const SCForm = styled.form`
  width: 100vw;
  height: auto;
  display: flex;
  margin-top: 35vh;
  margin-bottom: 1vh;
  flex-direction: column;
  align-items: center;
  gap: 4vh;
  
`
const InputCadastro = styled.input`
  width: 57%;
  height: 60px;
  border-radius: 12px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  background: #FFF;
  box-shadow: 0px 4px 24px 0px #ffd90090;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 3%;
  color: #ff3131;
  &::placeholder {
    color: #9C9C9C;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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

const PageArea = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: linear-gradient( to bottom, white, #ff3131);
  margin-bottom: 10vh;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Roboto";
  overflow-y: scroll;
`;
