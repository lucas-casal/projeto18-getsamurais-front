import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/UserContext";
import buscarCookie from "./buscarCookie";
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from "axios";

export default function UserServiceBox(props) {
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [checkbox, handleCheckbox] = useState(props.available)

    function checkboxAvailable(x) {
      handleCheckbox(x)
      axios.patch(`${import.meta.env.VITE_API_URL}/my-services/${props.id}`, {checkbox: x},{headers: {Authorization: `Bearer ${token}`}})
        .then(res =>{
          console.log(res.data)
          props.setCheckbox('foi')
        })
        .catch(console.log)
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
    <UserContainer checkbox={checkbox} >
      <PhotoContainer onClick={() => navigate(`/services/${props.id}`) }>
        <SCimage src={ props.mainPhoto }/>
      </PhotoContainer>
      
      <ServiceBasicInfo onClick={() => navigate(`/services/${props.id}`) }>
        <Title>{props.title}</Title>
        <Price>R${((props.price)?.toString())?.slice(0,-2)},{((props.price)?.toString())?.slice(-2)}</Price>
      </ServiceBasicInfo>

      <CheckboxContainer checkbox={checkbox}>
        <Checkbox defaultChecked={checkbox} onChange={x => checkboxAvailable(x.target.checked)} type="checkbox"/>
      </CheckboxContainer>
    </UserContainer>

  );
}
const CheckboxContainer = styled.label`
  box-sizing: border-box;
  width: 60px;
  height: 90px;
  border-radius: 20px;
  border: 2px solid ${x=> x.checkbox ? '#ffd900' : '#ff3131'};
  margin-right: 5px;
  color: ${x => x.checkbox ? '#ffd900' : '#ff3131'};
  background-color: ${x => x.checkbox ? '#ff3131' : 'white'};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`
const Checkbox = styled.input`
width: 20px;
height: 20px;
`

const Title = styled.h1`
`
const Price = styled.h2`
  align-self: end;
  margin-right: 15px;
`
const ServiceBasicInfo = styled.div`
  width: 50%;
  height: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`
const PhotoContainer = styled.div`
  width: 80px;
  height: 80px;
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
  background-color:  ${x=> x.checkbox ? 'white' : '#a7a7a77b'};
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