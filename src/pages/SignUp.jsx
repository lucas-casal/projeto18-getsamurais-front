import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { LoggedContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import buscarCookie from "../components/buscarCookie";
import cep from "cep-promise";
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

export default function Login(props) {
  const loggedcontexto = useContext(LoggedContext)
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCheckPass] = useState('')
  const [CEP, setCEP] = useState('')
  const [CEL, setCEL] = useState('')
  const [complement, setComplement] = useState('')
  const [preview, setPreview] = useState('')
  const [address, setAddress] = useState('')
  const [picture, setPicture] = useState('')
  const [disableForm, setDisableForm] = useState(false)

  useEffect(() => {
    if (picture[0]){
      const objectUrl = URL.createObjectURL(picture[0])
      setPreview(objectUrl)
    }
  },[disableForm, picture])
  
  function cepMascara(cep) {
    let cepFormatado = cep.target.value.replace(/\D/g, "")
    setCEP(cepFormatado)

    cepFormatado = cepFormatado.replace(/^(\d{5})(\d)/, "$1-$2")
    cep.target.value = cepFormatado;
  }

  function checkCEP() {
    cep(CEP)
      .then(res => {
        console.log(res)
      
      })
      .catch(err => console.log(err))
  }

  function celMascara(cel) {

    let celFormat = cel.target.value.replace(/\D/g, "");
    setCEL(celFormat);
    celFormat = celFormat.replace(/^(\d\d)(\d)/g, "($1)$2");
    celFormat = celFormat.replace(/(\d{5})(\d)/, "$1-$2");
    cel.target.value = celFormat;
  } 

  async function sendSignUpForm(ev) {
    ev.preventDefault();
    setDisableForm(true)
    const signUpInfo = { name, email, password, phone: CEL, cep: CEP, address, complement, picture: preview};
    if (password !== confirmPassword) return alert('A senha e a confirmação não estão identicas. Tente novamente!')
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, signUpInfo)
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 409) return alert(`Ops, parece que o e-mail ${email} já está cadastrado`)
      
    } finally{
      setDisableForm(false)
    }
  }
  console.log(preview)
  return (
    <PageArea>
      <Header />
      <SCForm onSubmit={(ev) => sendSignUpForm(ev)}>
        <InputCadastro
          onChange={(x) => setEmail(x.target.value)}
          type="email"
          id="email"
          placeholder="* E-mail"
          required
          disabled={disableForm}
        ></InputCadastro>

        <InputCadastro
          onChange={(x) => setPassword(x.target.value)}
          type="password"
          id="password"
          placeholder="* Senha"
          required
          disabled={disableForm}
        ></InputCadastro>

        <InputCadastro
          onChange={(x) => setCheckPass(x.target.value)}
          type="password"
          id="check-password"
          placeholder="* Confirmar senha"
          required
          disabled={disableForm}
        ></InputCadastro>

        <InputCadastro
          onChange={(x) => setName(x.target.value)}
          type="text"
          id="name"
          placeholder="* Nome"
          required
          disabled={disableForm}
        ></InputCadastro>

        <InputCadastro
          onChange={(x) => celMascara(x)}
          type="text"
          id="CEL"
          placeholder="* Celular"
          required
          disabled={disableForm}
        ></InputCadastro>

        <InputCadastro
          onChange={(x) => cepMascara(x)}
          onBlur={checkCEP}
          type="text"
          id="CEP"
          placeholder="* CEP para execução do serviço"
          required
          disabled={disableForm}
        ></InputCadastro>

        <InputCadastro
          onChange={(x) => setAddress(x.target.value)}
          type="number"
          id="address"
          placeholder="* número do endereço"
          required
          disabled={disableForm}
        ></InputCadastro>

        <InputCadastro
          onChange={(x) => setComplement(x.target.value)}
          type="text"
          id="complement"
          placeholder="* complemento do endereço"
          required
          disabled={disableForm}
        ></InputCadastro>

        <label htmlFor="picture">
        <PictureInput
          onChange={(x) => x.target.files[0] ? setPicture(x.target.files) : ''}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="picture"
          placeholder="Foto de perfil"
          disabled={disableForm}
        ></PictureInput>
        <SCdiv >
        {picture ? <SCimage src={preview} /> : <SCdiv> Foto de perfil </SCdiv>}
        </SCdiv>
        </label>

        <BtnsContainer>
          <SendBtn type="submit" disabled={disableForm} >{ disableForm ? pontinhos : 'Criar conta' }</SendBtn>
          <SignUpLink onClick={() => navigate('/')}>Já tem uma conta? <br/> Faça login!</SignUpLink>
        </BtnsContainer>
      </SCForm>
    </PageArea>
  );
}
const SCimage = styled.img`
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SignUpLink = styled.p`
  text-align: center;
  color: blue;
  text-decoration: underline;
  &:hover {
    color: #a200ff;
    cursor: pointer;
  }
  &:active {
    color: red;
  }
`
const SCForm = styled.form`
  width: 80vw;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  margin-top: 35vh;
  label{
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
  }
`
const SCdiv = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PictureInput = styled.input`
  display: none;
`;

const InputCadastro = styled.input`
  width: 80%;
  height: 60px;
  border-radius: 12px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  background: #FFF;
  box-shadow: 0px 4px 24px 0px #ff313194;
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
  margin-top: 43px;
  background-image: linear-gradient(to top, black, #ff3131);
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
  &:active {
    background-image: linear-gradient(to bottom, black, #ff3131);
  }
`;

const BtnsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 13%;
  justify-content: center;
  align-items: center;
`;
const PageArea = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Roboto";
  overflow-y: scroll;
  
`;
