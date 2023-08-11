import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { LoggedContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import buscarCookie from "../components/buscarCookie"
import RankingUser from "../components/RankingUser";
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

export default function Ranking() {
  const {logged} = useContext(LoggedContext)
  const [arrayRanking, setArrayRanking] = useState([])
  const [toggle, setToggle] = useState()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/ranking`)
    .then(res => {
      console.log(res)
      setArrayRanking(res.data)
    })
    .catch(err =>{
      console.log(err)
    })

  },[])



  return (
    <PageArea>
      <Header />
      <Title>
        <SCimage src={''}/>
        Ranking
      </Title>
      <RankingContainer>
        {arrayRanking.map(x => {
          console.log(x.visitCount)
          return <RankingUser key={x.id} id={x.id} position={arrayRanking.indexOf(x) + 1} name={x.name} views={x.visitCount} links={x.linksCount} />
        })}
      </RankingContainer>

      {logged ? '': <Text>Crie sua conta para usar nosso serviço!</Text>}
    </PageArea>
  );
}
const RankingContainer = styled.div`
  width: 80vw;
  height: 35vh;
  position: fixed;
  top: 42vh;
  border-radius: 24px 24px 0px 0px;
  border: 1px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;

  box-shadow: 0px 4px 24px 0px rgba(120, 177, 89, 0.80);
  border: 1px solid rgba(120, 177, 89, 0.25);
  overflow-y: scroll;
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
