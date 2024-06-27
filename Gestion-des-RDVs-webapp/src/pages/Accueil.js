import React from 'react';
import AuthContext from '../context/AuthProvider';
import styled from 'styled-components';
import tun from '../assets/img/tun.jpg';
import logoPolice from '../assets/img/logo_police.png';
import logoTunisie from '../assets/img/logo_tunisie.png';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Import the useHistory hook
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Container = styled.div`
  background-image: url(${tun});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 10px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
  }
  ${Overlay} {
    /* Add any additional styles if needed */
  }
`;



const Logo = styled.img`
  height: 16%;
  z-index: 9999;
  margin-top: -40%;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));

  @media (max-width: 768px) {
    height: 10%;
    margin-top: -80%;
  }

  @media (max-width: 1024px) {
    height: 12%;
    margin-top: -80%;
  }
`;

const Text = styled.div`
  font-size: 2rem;
  color: white;
  text-align: center;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
 

  @media (max-width: 768px) {
    font-size: 1.5rem;
    top: 10%;
   
  }

  @media (max-width: 1024px) {
    font-size: 1.7rem;
    top: 10%;
   
  }
`;

const CenterText = styled.div`
  font-size: 6rem;
  color: white;
  text-align: center;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  position: absolute;
  top: calc(50% + 150px);
  left: 50%;
  transform: translateX(-50%);
`;

function Accueil() {
  const { auth } = React.useContext(AuthContext);
  const history = useHistory(); // Initialize the useHistory hook here

  const handleClick = () => {
    // Redirect to the '/rdv' route
    history.push('/rdv');
  };

  return (
    <Container>
      <Overlay auth={auth}></Overlay>
      <Logo src={logoPolice} alt="Police Logo" />
      <Text>
        الجمهورية التونسية
        <br />
        وزارة الداخلية
        <br />
        الادارة العامة للأمن الوطني
        <br />
        الإدارة العامة لشرطة الحدود والأجانب
      </Text>
      <CenterText>
        بوابة الحصول على موعد
        <br />
        للطلبة الدوليين
      </CenterText>
      <ButtonContainer>
        <Button variant="primary" className="mt-4" onClick={handleClick} >
          Prendre un rendez-vous
        </Button>
      </ButtonContainer>
      <Logo src={logoTunisie} alt="Tunisie Logo" />
    </Container>
  );
}

export default Accueil;
