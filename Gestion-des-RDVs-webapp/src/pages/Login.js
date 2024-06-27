import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Button,InputGroup } from '@themesberg/react-bootstrap';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import authService from './../services/AuthService';
import tun from '../assets/img/tun.jpg';
import logoPolice from '../assets/img/logo_police.png';
import logoTunisie from '../assets/img/logo_tunisie.png';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  overflow: auto; /* Allow scrolling when the overlay is active */
`;

const Container = styled.div`
  position: relative;
  background-image: url(${tun});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  overflow: auto;
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
const Logo1 = styled.img`
  height: 15%;
  z-index: 2; 
  margin-top: -40%;
  margin-right: -3.2%;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));

  @media (max-width: 768px) {
    height:0%;
    margin-top: -80%;
  }

  @media (max-width: 1024px) {
    height: 0%;
    margin-top: -80%;
  }
`;
const Logo2 = styled.img`
  height: 16%;
  z-index: 2; 
  margin-top: -40%;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));

  @media (max-width: 768px) {
    height: 0%;
    margin-top: -80%;
  }

  @media (max-width: 1024px) {
    height: 0%;
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

function Login () {
  const { auth,setAuth } = React.useContext(AuthContext);
  const history = useHistory();
  const { register, handleSubmit, setError,reset,formState: { errors } } = useForm();

  if (auth && auth.role === "SUPER_ADMIN") {
    return <Redirect to="/users" />
  }else if(auth && auth.role === "AGENT") {
    return <Redirect to="/agent" />
  }else {
  // eslint-disable-next-line no-unused-expressions
  <Redirect to="/admin" />
  }

  
  const onSubmit = async (data, e) => {
    e.preventDefault();
  
    try {
      const user = await authService.login(data.username, data.password);
      setAuth(user);
  
      // Check user roles and status
      if ((user && (user.role === 'ADMIN' || user.role === 'AGENT')) && user.statut === 'NON_ACTIF') {
        history.push('/change-password');
      } else if (user.role === 'AGENT') {
        history.push('/agent');
      } else if (user.role === 'SUPER_ADMIN') {
        history.push('/users');
      }else {
        history.push('/admin')
      }
      console.log('Login successful', user);
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.status === 403) {
        setError('auth', { type: 'manual', message: 'Utilisateur bloqué. Veuillez contacter le support.' });
      } else {
        setError('auth', { type: 'manual', message: 'Nom d\'utilisateur ou mot de passe invalide' });
      }
      setTimeout(() => {
        reset();
      }, 1000);
    }
  };
  

  return (
    <main>
      <Container>
        <Overlay></Overlay>
        <Logo1 src={logoPolice} alt="Police Logo" />
        <Text>
          الجمهورية التونسية
          <br />
          وزارة الداخلية
          <br />
          الإدارة العامة لشرطة الحدود والأجانب
        </Text>
              <div 
                className=" shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-450"
                style={{
                  zIndex: 1000,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  marginLeft: '0%', // Adjust the value as needed

                }}
                >
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Gestion des rendez-vous</h3>
                  <h4 className="mb-0">Se connecter</h4>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Nom d'utilisateur</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Nom d'utilisateur"
                        {...register('username', { required: 'Nom d\'utilisateur requis' })}
                        />
                    </InputGroup>
                    {errors.username && <span className="text-danger">{errors.username.message}</span>}
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label> Mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Mot de passe"
                        {...register('password', { required: 'Mot de passe requis' })}
                      />
                    </InputGroup>
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Se connecter
                  </Button>
                  {errors.auth && <div className="text-danger mt-2">{errors.auth.message}</div>}
                </Form>
              </div>
      <Logo2 src={logoTunisie} alt="Tunisie Logo" />

      </Container>

    </main>
  );
};
export default Login;