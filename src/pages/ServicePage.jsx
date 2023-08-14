import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function ServicePage() {
  const loggedcontexto = useContext(LoggedContext)
  const [service, setService] = useState([])
  const [disableForm, setDisableForm] = useState(false)
  const [URL, setURL] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {id} = useParams()
  
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
    axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
      setService(res.data)
      setDisableForm(false)
    })
    .catch(err =>{
      console.log(err)
    })
  } else{
    navigate('/login')
  }},[disableForm])
console.log(service)

  return (
    <PageArea>
      <Header home={'home'}/>
      <RankingContainer>
      <UserContainer>
        <Topper>
          <PhotoContainer>
          </PhotoContainer>

          <Price>
          R${((service.price)?.toString())?.slice(0,-2)},{((service.price)?.toString())?.slice(-2)}
          </Price>
        </Topper>

        <ServiceBasicInfo>
          <Description>
            <strong>{service.title}</strong> <br/>{service.description}
          </Description>
        </ServiceBasicInfo>

        <Topper>
          <UserInfoContainer side={'left'}>
            <PhotoContainer user={'user'}>

            </PhotoContainer>
            <br/>
            <strong>{service.name}</strong>
          </UserInfoContainer>
          <UserInfoContainer>
            Contatos: 
            <br/>
            {`(${(service.phone)?.toString()?.slice(0, 2)})${(service.phone)?.toString()?.slice(2, 7)}-${(service.phone)?.toString()?.slice(7)}`}
            <br/>
            {service.email}
          </UserInfoContainer>
        </Topper>
      </UserContainer>
      </RankingContainer>
      <Footer />
    </PageArea>
  );
}
const UserInfoContainer = styled.div`
  width: ${x => x.side === 'left' ? '30%': '70%'};
  height: 100%;
  ${x => x.side === 'left'? 'border-right: 1px solid #ffd900' : 'border-left: 1px solid #ffd900'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: scroll;
  text-align: center;
`
const Topper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 26%;
  border-radius: 20px;
  margin-top: 5px;
  border: 2px solid #ffd900;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Price = styled.h2`
  margin-right: 10px;
  font-size: 30px;
`
const Description = styled.p`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;

  strong{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: #ff3131;
  }
`
const ServiceBasicInfo = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 44%;
  border-radius: 20px;
  border: 2px solid #ffd900;
  color: black;
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`
const PhotoContainer = styled.div`
  width: ${x => x.user ? '60px' : '120px'};
  height: ${x => x.user ? '60px' : '120px'};
  border-radius: 10px;
  overflow: hidden;
  margin-left: ${x => x.user ? '0' : '10px'};
  display: flex;
  background-color: red;
  align-items: center;
  justify-content: center;
`
const UserContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 95%;
  border: 1px solid #ddbc00;
  background-color:  white;
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 20px;
  box-shadow: 0px 4px 15px 0px #ffd90090;

`
const RankingContainer = styled.div`
  width: 100vw;
  height: 80vh;
  background-image: radial-gradient(#ffd900, #ff3131);
  position: fixed;
  top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
