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
  console.log(text) 
  console.log(props.nickname)
  function mudarNomeFantasia(x){
    const novoNome = x.target.value
    if (novoNome === props.nickname || novoNome === props.url) return console.log('não mudou')
    console.log(novoNome)
    axios.patch(`${import.meta.env.VITE_API_URL}/urls/${props.id}`, {newNick: novoNome},{headers:{Authorization: `Bearer ${token}`}})
    .then(res => {
      console.log(res)
      props.setDisableForm(true)
    })
    .catch(console.log)
  }
  
  function goToLink(x){
    /*axios.get(`${import.meta.env.VITE_API_URL}/urls/open/${x}`)
    .then((res) => {
      console.log(res.data.slice(18))*/
      if(confirm(`Você está será redirecionado para fora dessa aplicação`)) {
        window.location.href=`${import.meta.env.VITE_API_URL}/urls/open/${x}`;
      }
    /*})
    .catch(err => {
      console.log(err)
    })*/
  }  

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

  return (
    <UserContainer >
      <SCurl
      defaultValue={props.nickname ? props.nickname : props.url}
      onBeforeInput={x => setText(x.target.value)}
      onBlur={mudarNomeFantasia}
      required
      />

      <SCshorted onClick={() => goToLink(props.shortUrl)}>
        {props.shortUrl}
      </SCshorted> 
      
      <SCviews>
        Quantidade de visitantes: {props.views}
      </SCviews>

      <DeleteContainer onClick={deleteShorted}>
        <BsFillTrash3Fill size={35}/>
      </DeleteContainer>
    </UserContainer>

  );
}
const DeleteContainer = styled.button`
  height: 100%;
  width: 9vw;
  background-color: white;
  color: red;
  border-radius: 0 12px 12px 0; 
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    background-color: red;
    color: white;
    cursor: pointer;
    &:active{
      border: 1px solid black;
    }
  }
`
const SCurl = styled.input`
  border: 1px solid #80cc74;
  box-sizing: border-box;
  background-color: #80CC74;
  height: 100%;
  width: 25vw;
  min-width: 200px;
  font-size: 14px;
  overflow-x: scroll;
  text-align: left;
  color:  white;
  font-family: 'Lexend Deca', sans-serif;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
`
const SCshorted = styled.p`
  width: 10vw; 
  min-width:  100px;
  text-align: left;
  font-size: 14px;
  &:hover{
    cursor:pointer;
    color: green;
    &:active{
      color: black;
    }
  }
`
const SCviews = styled.p`
  width: 15vw;
  min-width: 100px;
  font-size: 14px;
  margin-right: -50px;
  text-align: center;
`
const UserContainer = styled.h1`
    box-sizing: border-box;
    width: 100%;
    min-width: 950px;
    height: 62px;
    padding-left: 10px;
    background-color: #80CC74;
    color:  white;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    box-shadow: 0px 4px 24px 0px #78b159c1;

`