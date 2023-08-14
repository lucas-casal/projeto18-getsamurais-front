import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/UserContext";
import buscarCookie from "./buscarCookie";
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from "axios";


export default function ShortenedAlready(props) {
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
   

  function deleteShorted(){
    const id = props.id
    props.setDisableForm(true)
    if (confirm(`Você quer apagar a URL: ${props.url} ?`)){
      axios.delete(`${import.meta.env.VITE_API_URL}/urls/${id}`, {headers:{Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log(res);
        props.setDisableForm(false)
  
      })
      .catch (err)(
        console.log(err)
        )
    }
  }
  const reader = new FileReader()

  return (
    <UserContainer onClick={() => navigate(`/services/${props.id}`)}>
      <PhotoContainer>
        <SCimage src={ props.mainPhoto }/>
      </PhotoContainer>
      
      <ServiceBasicInfo>
        <Title>{props.title}</Title>
        <Price>R${((props.price)?.toString())?.slice(0,-2)},{((props.price)?.toString())?.slice(-2)}</Price>

      </ServiceBasicInfo>
    </UserContainer>

  );
}
const Title = styled.h1`
  
`
const Price = styled.h2`
  align-self: end;
  margin-right: 15px;
`
const ServiceBasicInfo = styled.div`
  width: 70%;
  height: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`
const PhotoContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SCimage = styled.img`
  height: 90px;

`
const UserContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border: 1px solid #ddbc00;
  padding-left: 10px;
  background-color:  white;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  box-shadow: 0px 4px 15px 0px #ffd90090;

`