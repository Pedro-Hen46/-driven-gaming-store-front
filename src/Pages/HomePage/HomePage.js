import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

//============= Imporatando Components ======================//
import Footer from "../../components/Footer/Footer.js";
import Carrossel from "../../components/Carrossel/Carrossel.js";
import GameList from "../../components/GameList/GameList.js";
import Header from "../../components/Header/Header.js";

export default function HomePage() {
  //====================== VARIAVEIS DE ESTADO =================//
  const [dataGame, setDataGame] = useState([]);

  const [cartItens, setCartItens] = useState( () => {
    const cartCache = localStorage.getItem('@cart');
    
    if(cartCache){
      return JSON.parse(cartCache);
    }
    return [];

  });


  //====================== CONEXÃO BACK =================//
  useEffect(() => {
    localStorage.setItem('@cart', JSON.stringify(cartItens));
  }, [cartItens]);


  useEffect(() => {
    const promise = axios.get(
      "https://driven-gaming-store-fullstack.herokuapp.com/product"
    );

    promise.then((response) => {
      setDataGame(response.data);
    });

    promise.catch((response) => {
      console.log(response.data);
    });



  }, []);


  return (
    <ContainerHome>
      <Header />

      <Carrossel />

      <ContainerGameList>
        {dataGame.map((item, index) => (
          <GameList cartItens={cartItens} setCartItens={setCartItens} data={item} key={index} />
        ))}
      </ContainerGameList>

      <Footer />
      
    </ContainerHome>
  );
}

const ContainerGameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ContainerHome = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    
    :last-child {
      margin-bottom: 50px;
    }
    button {
      width: 80%;
      height: 50px;
      background-color: black;
      border: thin solid red;
      border-radius: 10px;
      color: white;
      font-weight: bold;
      font-size: 22px;
    }
  
`;
