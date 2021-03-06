import styled from "styled-components";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetails() {
  const { idProductSelected } = useParams();
  const navigate = useNavigate();

  const [gameDetails, setGameDetails] = useState([]);

  const [cartItens, setCartItens] = useState(() => {
    const cartCache = localStorage.getItem("@cart");

    if (cartCache) {
      return JSON.parse(cartCache);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("@cart", JSON.stringify(cartItens));
  }, [cartItens]);

  useEffect(() => {
    const promise = axios.get(
      "https://driven-gaming-store-fullstack.herokuapp.com/product"
    );

    promise.then((response) => {
      response.data.forEach((item) => {
        if (item._id === idProductSelected) {
          setGameDetails(item);
        }
      });
    });
    promise.catch((error) => {
      console.log(error.message);
    });
  }, [idProductSelected]);

  function addItemOnCart() {
    const newItem = {
      id: idProductSelected,
      qtd: 1,
    };
    const itemExists = cartItens.find(
      (item) => String(item.id) === idProductSelected
    );

    if (itemExists) {
      const cartUpdated = cartItens.map((item) => {
        if (item.id === idProductSelected) {
          return {
            ...item,
            qtd: item.qtd + 1,
          };
        }
        return item;
      });
      setCartItens(cartUpdated);
    } else {
      setCartItens((state) => [...state, newItem]);
      console.log(cartItens);
    }
    window.alert("Item adicionado no carrinho");
  }

  return (
    <ContainerProduct>
      {gameDetails.length === 0 ? (
        ""
      ) : (
        <>
          <DemonstrationImages>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280">
              <path
                fill="#000000"
                fillOpacity="1"
                d="M0,192L60,208C120,224,240,256,360,245.3C480,235,600,181,720,154.7C840,128,960,128,1080,133.3C1200,139,1320,149,1380,154.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              ></path>
            </svg>

            {gameDetails.images.map((item, index) => {
              return <img key={index} src={item} alt={gameDetails.titulo} />;
            })}
          </DemonstrationImages>

          <ProductInfo>
            <h1>???? {gameDetails.titulo}</h1>
            <tt>{gameDetails.categoria}</tt>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={gameDetails.video}
                width="98%"
                height="98%"
              />
            </div>
            <tt>{gameDetails.descricao}</tt>

            <GameCompatibility>
              {gameDetails.console.map((item, index) => (
                <ion-icon name={item} key={index}></ion-icon>
              ))}
            </GameCompatibility>

            <GameNormalPrice>
              <h3>DE R$ {gameDetails.preco.replace(".", ",")}</h3>
            </GameNormalPrice>

            <span>POR APENAS:</span>

            <GamePrice>
              <ion-icon name="cart"></ion-icon>
              <h2>R$ {gameDetails.desconto.replace(".", ",")}</h2>
            </GamePrice>

            <button onClick={() => addItemOnCart()}>COMPRAR</button>
          </ProductInfo>
        </>
      )}

      <BackArrow onClick={() => navigate("/")}>
        <ion-icon name="arrow-back"></ion-icon>
      </BackArrow>
    </ContainerProduct>
  );
}
const BackArrow = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  left: 15px;
  top: 15px;
  z-index: 1;

  ion-icon {
    font-size: 38px;
    color: #ffffff;
  }

  transition: all 0.4s;
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 20px rgba(48, 222, 255, 0.5);
  }
`;

const GameNormalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;

  h3 {
    font-family: "Montserrat";
    font-size: 18px;
    font-weight: 300;
    text-decoration: line-through;
  }
`;

const GamePrice = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  h2 {
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 48px;
    color: #30deff;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
  ion-icon {
    font-size: 60px;
    color: #30deff;
    margin-right: 20px;
  }
`;

const GameCompatibility = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;

  ion-icon {
    font-size: 36px;
  }
`;

const DemonstrationImages = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  overflow: auto;

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
  img {
    margin-top: 20px;
    margin-left: 5%;
    object-fit: cover;
    width: auto;
    max-width: 550px;

    border-radius: 5%;
    z-index: 1;

    box-shadow: 0px 0px 35px rgba(48, 222, 255, 0.5);
  }
`;

const ProductInfo = styled.div`
  z-index: 1;
  width: 90%;
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 26px;
    text-transform: uppercase;
  }
  tt {
    font-family: "Montserrat";
    font-weight: 300;
    font-size: 16px;
  }
  button {
    margin-top: 20px;
    height: 80px;
    width: 100%;
    border-radius: 10px;
    border: thin solid #30deff;
    background-color: #30deff;

    font-family: "Montserrat";
    letter-spacing: 4px;
    font-weight: 700;
    font-size: 26px;
    text-transform: uppercase;

    animation: animate 2s linear infinite;
    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 30px rgba(48, 222, 255, 0.4);
    }
  }
  @keyframes animate {
    0% {
      box-shadow: 0px 0px 30px rgba(48, 222, 255, 0);
      font-size: 26px;
    }
    50% {
      box-shadow: 0px 0px 30px rgba(48, 222, 255, 0.7);
      font-size: 30px;
    }
    100% {
      box-shadow: 0px 0px 30px rgba(48, 222, 255, 0);
      font-size: 26px;
    }
  }
  .player-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
    width: 100%;
    max-width: 38rem;
    min-width: 24.9rem;

    height: 40%;
    max-height: 26rem;
    min-height: 16rem;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 20px rgba(48, 222, 255, 0.5);
    }

    /* padding-top: 56.25%; //Player ratio: 100 / (1280 / 720) */
  }

  .react-player {
    position: absolute;
  }
`;

const ContainerProduct = styled.div`
  width: 100%;
  height: auto;
  background-color: #f0f1f3;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  span {
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 3px;
    margin-bottom: 10px;
  }
`;
