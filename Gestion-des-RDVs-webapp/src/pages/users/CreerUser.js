import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUser, faEnvelope, faSignature, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Col,Row, Form, Button, Container, InputGroup, Spinner } from '@themesberg/react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import userService from "../../services/UserService";
import { useState } from "react";
import { useHistory } from "react-router";
import { Modal } from "react-bootstrap";

function CreerUser() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const history=useHistory();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const onSubmit = async (data) => {
    try {
      setShowSpinner(true);
      const result = await userService.saveUser(data);

      // Handle the result (e.g., show success message, redirect, etc.)
      console.log('User added successfully:', result);
      setShowSpinner(false);
      setShowSuccessModal(true);
    } catch (error) {
      // Handle the error (e.g., show error message)
      console.error('Error adding user:', error);
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        setShowErrorModal(true);
        setShowSpinner(false)
      }
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    history.push('/users')
  };

  const handleDismissErrorModal = () => {
    setShowErrorModal(false);
  };
  
  return (
      <main>
         <Modal as={Modal.Dialog} centered show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Succès
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>L'utilisateur a été créé avec succès.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal d'erreur */}
      <Modal show={showErrorModal} onHide={handleDismissErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
            Erreur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Une erreur s'est produite lors de la création de l'utilisateur. Veuillez vérifier les coordonnées saisies.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDismissErrorModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Créer un nouveau compte</h3>
                </div>
                <Form className="mt-4"  onSubmit={handleSubmit(onSubmit)}>
                <Row className="mt-2">
                  <Col md={6} className="mb-2">  
                <Form.Group id="CIN" className="mb-4">
                <Form.Label>CIN</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faIdCard} />
                  </InputGroup.Text>
                  <Controller
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="CIN"
                        maxLength="8"
                      />
                    )}
                    control={control}
                    name="cin"
                    rules={{
                      required: "CIN est requis",
                      pattern: { value: /\d{8}/, message: "CIN doit être composé de 8 chiffres" }
                    }}
                  />
                </InputGroup>
                {errors.cin && errors.cin.type === 'required' && (
                <span className="text-danger">{errors.cin.message}</span>
                )}
                {errors.cin && errors.cin.type === 'pattern' && (
                  <span className="text-danger">{errors.cin.message}</span>
                )}
              </Form.Group>
              </Col>

                  <Col md={6} className="mb-2">
                  <Form.Group id="nom" className="mb-4">
                    <Form.Label>Nom</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSignature} />
                      </InputGroup.Text>
                      <Controller
                        render={({ field }) => (
                          <Form.Control {...field}
                           type="text"
                           placeholder="Nom" />
                        )}
                        control={control}
                        name="nom"
                        rules={{ 
                          required: "Le nom est requis",
                          minLength: { value: 3, message: "Nom doit contenir au minimum 3 caractéres" }
                        }}                      />
                    </InputGroup>
                    {errors.nom && <span className="text-danger">{errors.nom.message}</span>}
                  </Form.Group>
                  </Col>
                  </Row>

                <Row className="mt-2">
                  <Col md={6} className="mb-2">
                  <Form.Group id="prenom" className="mb-4">
                    <Form.Label>Prenom</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Controller
                        render={({ field }) => (
                          <Form.Control {...field}
                          type="text"
                          placeholder="Prenom" />
                        )}
                        control={control}
                        name="prenom"
                        rules={{ 
                          required: "Le prénom est requis",
                          minLength: { value: 3, message: "Prenom doit contenir au minimum 3 caractéres" }
                        }}/>
                    </InputGroup>
                    {errors.prenom && <span className="text-danger">{errors.prenom.message}</span>}
                  </Form.Group>
                  </Col>

                  <Col md={6} className="mb-2">
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Nom d'utilisateur</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Controller
                        render={({ field }) => (
                        <Form.Control {...field}
                        type="text" 
                        placeholder="Nom d'utilisateur" />
                        )}
                        control={control}
                        name="username"
                        rules={{ 
                          required: "Le nom d'utilisateur est requis",
                          minLength: { value: 3, message: "Username doit contenir au minimum 3 caractéres" }
                        }}                       />
                    </InputGroup>
                    {errors.username && <span className="text-danger">{errors.username.message}</span>}
                  </Form.Group>
                  </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={12} className="mb-2">
                  <Form.Group id="email" className="mb-4">
                  <Form.Label>Adresse email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <Controller
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="email"
                          placeholder="example@company.com"
                        />
                      )}
                      control={control}
                      name="email"
                      rules={{
                        required: "L'adresse email est requise",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Adresse email invalide"
                        }
                      }}
                    />
                  </InputGroup>
                  {errors.email && errors.email.type === 'required' && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                  {errors.email && errors.email.type === 'pattern' && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </Form.Group>
                </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={12} className="mb-2">
                  <Form.Group id="role" className="mb-4">
                    <Form.Label>Rôle</Form.Label>
                    <Controller
                      render={({ field }) => (
                        <Form.Select {...field} aria-label="Rôle" defaultValue="superadmin">
                          <option value="superadmin">Superadmin</option>
                          <option value="admin">Admin</option>
                          <option value="agent">Agent</option>
                        </Form.Select>
                      )}
                      control={control}
                      name="role"
                    />
                  </Form.Group>
                  </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="w-100">
                    Créer
                  </Button>
                </Form>
                {showSpinner && <Spinner animation="border" role="status" className="mt-3" style={{marginLeft:'180px'}} />}

              </div>
            </Col>
        </Container>
      </section>
    </main>
  );
}

export default CreerUser;
