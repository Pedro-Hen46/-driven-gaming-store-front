import styled from "styled-components";
import Logo from "../../lib/images/logo-drivengaming.png";

export default function Header() {
  return (
    <ContainerHeader>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 380">
        <path
          fill="#000000"
          fillOpacity="1"
          d="M0,192L60,208C120,224,240,256,360,245.3C480,235,600,181,720,154.7C840,128,960,128,1080,133.3C1200,139,1320,149,1380,154.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      <img src={Logo} alt="logo" />
    </ContainerHeader>
  );
}
const ContainerHeader = styled.div`
  @media (max-width: 830px) {
    width: 100%;
    min-height: 200px;
    margin-bottom: -100px;
    overflow: hidden;
    svg {
      height: 250px;
      position: absolute !important;
      top: 0!important;
      left: 0!important;
    }
  }

  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  ion-icon {
    color: #ffffff;
    font-size: 38px;
    margin-top: 10px;
    margin-left: -20px;
  }

  img {
    object-fit: contain;
    margin-top: 10px;
    width: 80%;
    height: 90px;
    z-index: 1;
  }
  svg {
    z-index: 0!important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

`;
