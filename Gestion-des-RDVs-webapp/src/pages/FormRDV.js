import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import CitoyenService from '../services/CitoyenService';
import { Modal } from '@themesberg/react-bootstrap';
import React, { useState, useEffect } from 'react';
import DatesService from "../services/DatesService";
import { isSameDay } from 'date-fns';
import { Controller } from 'react-hook-form';
import { Col, Row, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignature, faPassport, faPhone, faMap, faSchool } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import axios from 'axios';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';
import tun from '../assets/img/tun.jpg';
import logoPolice from '../assets/img/logo_police.png';
import logoTunisie from '../assets/img/logo_tunisie.png';
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;
const Container = styled.div`
  position: relative;
  background-image: url(${tun});
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Make the background image fixed */
  height: 100vh; /* Adjust the height as needed */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 150px 20px 0;  
  overflow: auto;

  @media (max-width: 768px) {
    padding: 250px 10px 0;
    align-items: center;
    justify-content: center;
    
  }

  @media (max-width: 1024px) {
    padding: 100px 15px 0;
    align-items: center;
    justify-content: space-between;
  }

  ${Overlay} {
    /* Add any additional styles if needed */
  }
`;

const Section = styled.section`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
   /* Adjust the padding-top value as needed */
  margin-top: 3%;
  @media (max-width: 768px) {
    padding-top: 200px; /* Adjust the padding-top value for smaller screens */
    margin-top: 60%;
  }

  @media (max-width: 1024px) {
    padding-top: 50px; /* Adjust the padding-top value for medium screens */
  }
`;

const Logo1 = styled.img`
  height: 15%;
  z-index: 2; 
  margin-top: -40%;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
  margin-right: -1%;

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

function FormRDV() {
  const { register, handleSubmit, watch, setValue, setError, reset, control, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModal2, setShowErrorModal2] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null)



  useEffect(() => {
    // Fetch the list of countries from the API
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data
          .filter((country) => country.name?.common) // Filter out countries with undefined or falsy names
          .map((country) => ({
            label: country.name.common || '',
            value: country.name.common || '',
          }));
        setCountryOptions(countries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);


  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  const fetchUnavailableDates = async () => {
    try {
      const backendDates = await DatesService.fetchUnavailableDates();

      const today = new Date();
      const disabledDates = [];
      for (let i = 0; i < 4; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i); // Add 1 to skip today
        disabledDates.push(nextDay.toISOString());
      }

      const allUnavailableDates = [...backendDates, ...disabledDates];
      setUnavailableDates(allUnavailableDates);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
    }
  };


  const isDateDisabled = (date) => {
    const pickerDate = new Date(date);

    const isDisabled = !unavailableDates.some(unavailableDate =>
      isSameDay(new Date(unavailableDate), pickerDate)
    );



    return isDisabled;
  };



  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setShowErrorModal2(false);

  };

  const handleCaptchaChange = (value) => {
    // This callback will be triggered when the user solves the reCAPTCHA.
    // You can use 'value' to validate the reCAPTCHA on the server.
    setCaptchaValue(value);
  };

  

  const onSubmit = async (data) => {
    try {
      // if (recaptchaRef && recaptchaRef.current) {
      //   const recaptchaToken = recaptchaRef.current.getValue(); // Utilisez getValue pour le reCAPTCHA visible

      //   if (!recaptchaToken) {
      //     // Affichez la deuxième modal d'erreur pour la validation du captcha
      //     setShowErrorModal2(true);
      //     return; // Arrêter la soumission du formulaire
      //   }

        // Si le type d'établissement est "Autre", utilisez la valeur de l'input "autreText"
        const valeurAEEnregistrer = data.typeEtab === 'Autre' ? data.autreText : data.typeEtab;

        // Enregistrez la valeur dans la base de données (ajoutez votre logique d'API ici)
        const apiResponse = await CitoyenService.saveCitoyenAndRendezvous({
          ...data,
          typeEtab: valeurAEEnregistrer, // Utilisez la valeur correcte pour le typeEtab
        });

        if (apiResponse.success) {
          setSuccessMessage(apiResponse.message);
          setShowModal(true);
          reset();
        } else {
          setErrorMessage(apiResponse.message);
          setShowErrorModal(true);
          setError('api', { type: 'manual', message: apiResponse.message });
          reset();
        }

        // Réinitialisez le champ reCAPTCHA
        recaptchaRef.current.reset();
      // } else {
      //   console.error('La référence reCAPTCHA est nulle');
      // }
    } catch (error) {
      console.error('Une Erreur est produite :', error);
    }
  };



  return (
    <main>
      <Container>
        <Overlay></Overlay>
        <Logo1 src={logoPolice} alt="Police Logo" />
        <Section
         //className="d-flex align-items-center justify-content-center my-5 mt-lg-4 mb-lg-5" style={{
        //  zIndex: 3,
        //  paddingTop: '100px', // Add some padding to the top
       // }}
        >


          <Row >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div
                className=" shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-850"
                style={{
                  zIndex: 1000,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >              <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Prendre un rendez-vous</h3>
                  <h3>تحديد الموعد</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mt-2">
                    <Col md={6} className="mb-2">

                      <Form.Group id="nom">
                        <Form.Label>Nom / Lastname / اللقب</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                placeholder="Nom"
                              />
                            )}
                            control={control}
                            name="nom"
                            rules={{
                              required: "Nom est requis",
                              pattern: { value: /^[A-Za-z]+$/i, message: "Le nom doit être composé seulement de charactères" }
                            }}
                          />
                        </InputGroup>
                        {errors.nom && errors.nom.type === 'required' && (
                          <span className="text-danger">{errors.nom.message}</span>
                        )}
                        {errors.nom && errors.nom.type === 'pattern' && (
                          <span className="text-danger">{errors.nom.message}</span>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-2">
                      <Form.Group id="prenom">
                        <Form.Label>Prénom / Name / الاسم</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                placeholder="Prénom"

                              />
                            )}
                            control={control}
                            name="prenom"
                            rules={{
                              required: "Prénom est requis",
                              pattern: { value: /^[A-Za-z]+$/i, message: "Le prénom doit être composé seulement de charactères" }
                            }}
                          />
                        </InputGroup>
                        {errors.prenom && errors.prenom.type === 'required' && (
                          <span className="text-danger">{errors.prenom.message}</span>
                        )}
                        {errors.prenom && errors.prenom.type === 'pattern' && (
                          <span className="text-danger">{errors.prenom.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col md={6} className="mb-2">
                      <Form.Group id="passeport">
                        <Form.Label>Passeport / جواز السفر</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faPassport} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                placeholder="Passeport"
                                maxLength={12} />
                            )}
                            control={control}
                            name="passeport"
                            rules={{
                              required: "Passeport est requis",
                            }}
                          />
                        </InputGroup>
                        {errors.passeport && errors.passeport.type === 'required' && (
                          <span className="text-danger">{errors.passeport.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-2">
                      <Form.Group id="numTel">
                        <Form.Label>Numéro de téléphone / Phone number / رقم الهاتف</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faPhone} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                placeholder="Numéro de téléphone"
                                maxLength="8"
                                pattern="[0-9]*"  // Allow only numeric digits
                              />
                            )}
                            control={control}
                            name="numTel"
                            rules={{
                              required: "Numéro de téléphone est requis",
                              pattern: { value: /\d{8}/, message: "Numéro de téléphone doit contenir exactement 8 chiffres" }
                            }}
                          />
                        </InputGroup>
                        {errors.numTel && errors.numTel.type === 'required' && (
                          <span className="text-danger">{errors.numTel.message}</span>
                        )}
                        {errors.numTel && errors.numTel.type === 'pattern' && (
                          <span className="text-danger">{errors.numTel.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-0">
                    <Col md={6} className="mb-2">
                      <Form.Group id="pays" className="mb-2">
                        <Form.Label >Pays d'origine / Country / البلد الأصلي</Form.Label>

                        <InputGroup>
                          <Select
                            {...register('pays', { required: 'Pays requis' })}
                            options={countryOptions}
                            placeholder="Sélectionnez un pays"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                border: '1px solid #ced4da',
                                borderRadius: '8px',
                                height: '44px',
                                // Adjust the width as needed
                              }),
                            }}
                            onChange={(selectedOption) => {
                              setValue('pays', selectedOption?.value);

                            }}
                          />
                        </InputGroup>
                        {errors.pays && <span className="text-danger">{errors.pays.message}</span>}
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-2">
                      <Form.Group id="gouvernerat" className="mb-2">
                        <Form.Label>Gouvernorat / State / المحافظة</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faSignature} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                placeholder="Gouvernorat"
                                maxLength="30"
                              />
                            )}
                            control={control}
                            name="gouvernerat"
                            rules={{
                              required: "Gouvernorat est requis",
                            }}
                          />
                        </InputGroup>
                        {errors.gouvernerat && errors.gouvernerat.type === 'required' && (
                          <span className="text-danger">{errors.gouvernerat.message}</span>
                        )}
                      </Form.Group>
                    </Col>

                  </Row>
                  <Row className="mt-0">
                    <Col md={6} className="mb-2">

                      <Form.Group id="ville" className="mb-2">
                        <Form.Label>Ville / City / المدينة</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faSignature} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                placeholder="Ville"
                                maxLength="30"
                              />
                            )}
                            control={control}
                            name="ville"
                            rules={{
                              required: "Ville est requise",
                            }}
                          />
                        </InputGroup>
                        {errors.ville && errors.ville.type === 'required' && (
                          <span className="text-danger">{errors.ville.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-2">

                      <Form.Group id="codePostal" className="mb-2">
                        <Form.Label>Code Postal / Postal code / الرقم البريدي </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faMap} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="number"
                                placeholder="Code Postal"
                                maxLength="8"

                              />
                            )}
                            control={control}
                            name="codePostal"
                            rules={{
                              required: "Code Postal est requis",
                            }}
                          />
                        </InputGroup>
                        {errors.codePostal && errors.codePostal.type === 'required' && (
                          <span className="text-danger">{errors.codePostal.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-0">
                    <Form.Group id="adresse" className="mb-2">
                      <Form.Label>Adresse(Tunis) / Address (Tunis) / العنوان بتونس</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Adresse (Tunis)"
                        {...register('adresse', { required: 'Adresse requise' })}
                      />
                      {errors.adresse && <span className="text-danger">{errors.adresse.message}</span>}
                    </Form.Group>
                  </Row>

                  <Row className="mt-0">
                    {/* <Col md={6} className="mb-2">
                    <Form.Group id="typeEtab" className="mb-2">
                      <Form.Label>Type d'établissement d'étude</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Etablissement d'etude"
                        {...register('typeEtab', { required: 'Etablissement requis' })}
                      />
                      {errors.typeEtab && <span className="text-danger">{errors.typeEtab.message}</span>}
                    </Form.Group>
                  </Col> */}

                    <Col md={6} className="mb-2">
                      <Form.Group id="typeEtab" className="mb-2">
                        <Form.Label>Type d'établissement d'étude / Type of study institution / مؤسسة الدراسة</Form.Label>
                        <div>
                          <Form.Check
                            inline
                            label="Publique"
                            type="radio"
                            value="Publique"
                            {...register('typeEtab', { required: 'Sélectionnez une option' })}
                          />
                          <Form.Check
                            inline
                            label="Privé"
                            type="radio"
                            value="Privé"
                            {...register('typeEtab', { required: 'Sélectionnez une option' })}
                          />
                          <Form.Check
                            inline
                            label="Autre"
                            type="radio"
                            value="Autre"
                            {...register('typeEtab', { required: 'Sélectionnez une option' })}
                          />
                          {/* Add more options as needed */}
                        </div>
                        {errors.typeEtab && <span className="text-danger">{errors.typeEtab.message}</span>}
                        {watch('typeEtab') === 'Autre' && (
                          <div className="mt-2">
                            <Form.Label>Veuillez saisir le type de votre etablissement</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('autreText', { required: 'Veuillez saisir un texte' })}
                            />
                            {errors.autreText && <span className="text-danger">{errors.autreText.message}</span>}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-2">
                      <Form.Group id="nomEtab" className="mb-2">
                        <Form.Label>Nom d'établissement / Establishment name / اسم المؤسسة</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faSchool} />
                          </InputGroup.Text>
                          <Controller
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                placeholder="Nom d'établissement"

                              />
                            )}
                            control={control}
                            name="nomEtab"
                            rules={{
                              required: "Nom d'établissement est requis",
                            }}
                          />
                        </InputGroup>
                        {errors.nomEtab && errors.nomEtab.type === 'required' && (
                          <span className="text-danger">{errors.nomEtab.message}</span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>


                  <Row className="mt-0">
                    <Col md={6} className="mb-2">
                      <Form.Group id="dateRDV" className="mb-2">
                        <Form.Label>Date du Rendez-vous / Date of Appointment / تاريخ التعيين </Form.Label>
                        <DatePicker
                          selected={watch('dateRDV') ? new Date(watch('dateRDV')) : null}
                          onChange={(date) => {
                            // Ensure the date is set to local midnight
                            const localMidnightDate = new Date(date);
                            localMidnightDate.setHours(0, 0, 0, 0);

                            // Convert to UTC to match backend logic
                            const utcMidnightDate = new Date(
                              Date.UTC(
                                localMidnightDate.getFullYear(),
                                localMidnightDate.getMonth(),
                                localMidnightDate.getDate(),
                                0,
                                0,
                                0
                              )
                            );
                            setValue('dateRDV', utcMidnightDate, true);
                          }}
                          dateFormat="yyyy-MM-dd"
                          filterDate={isDateDisabled}
                          customInput={<Form.Control />}
                          minDate={new Date()} // Set the minimum date to today
                        />
                        {errors.dateRDV && <span className="text-danger">{errors.dateRDV.message}</span>}
                      </Form.Group>
                    </Col>
                   {/* <Col md={6} className="mb-2">
                      <Form.Group id="captcha" className="mb-2">
                        <Form.Label>Verify that you are human</Form.Label>
                        <div
                          style={{
                            display: 'flex',
                            zIndex: 1000,

                          }}
                        >
                          <ReCAPTCHA
                            ref={recaptchaRef} // Attach the ref to the ReCAPTCHA component
                            sitekey="6LcBHC8pAAAAACzk--E2GKNNlpVkS1u_FJWIDtKY"
                            onChange={handleCaptchaChange}
                            style={{
                              zIndex: 1000, // You can adjust this value based on your needs
                            }}
                          />
                        </div>
                      </Form.Group>
                    </Col> */}
                  </Row>

                  <Button variant="primary" type="submit" className="w-100">
                    Envoyer
                  </Button>
                  {errors.api && <div className="text-danger mt-2">{errors.api.message}</div>}
                </Form>
              </div>
            </Col>

          </Row>
        </Section>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Body className="text-center">
            <p style={{ fontSize: '1.2em' }}>{successMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>



        <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
          <Modal.Body className="text-center">
            <p style={{ fontSize: '1.2em', color: 'red' }}>{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseErrorModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal2} onHide={handleCloseErrorModal}>
          <Modal.Body className="text-center">
            <p style={{ fontSize: '1.2em', color: 'red' }}>{"Captcha requis"}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseErrorModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
        <Logo2 src={logoTunisie} alt="Tunisie Logo" />

      </Container>

    </main>
  );
}

export default FormRDV;