import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/UserContext";
import buscarCookie from "./buscarCookie";
export default function RankingUser(props) {
    
  return (
    <UserContainer id={props.id}>{props.position}. {props.name} - {props.links} links - {props.views.toLocaleString('de-DE')} visualizações</UserContainer>
  );
}
const UserContainer = styled.h1`
    box-sizing: border-box;
    width: 100%;
    padding-left: 40px;
    background-color: ${x => x.id === parseInt(buscarCookie('id')) ? "rgba(120, 177, 89)" : 'white'};
    color:  ${x => x.id === parseInt(buscarCookie('id')) ? "rgb(255, 255, 255)" : 'black'};
    font-family: 'Lexend Deca', sans-serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
`