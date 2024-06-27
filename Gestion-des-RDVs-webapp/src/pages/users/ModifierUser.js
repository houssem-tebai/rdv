import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faUser, faIdCard, faEnvelope, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Toast } from '@themesberg/react-bootstrap';
import userService from "../../services/UserService";
import { useHistory, useParams } from "react-router";

function ModifierUser() {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const history = useHistory();
  const { userId } = useParams();

  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const result = await userService.updateUser(userId, data);
      console.log('User updated successfully:', result);
      setShowSuccessToast(true);
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        setShowErrorToast(true);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.findById(userId);
        console.log("USERDATA : ",userData);
        // Object.keys(userData).forEach((key) => {
        //   setValue(key, userData[key]);
        // });
        setValue("cin", userData.cin);
        setValue("nom", userData.nom);
        setValue("prenom", userData.prenom);
        setValue("username", userData.username);
        setValue("email", userData.email);
        setValue("role", userData.role.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const handleDismissSuccessToast = () => {
    setShowSuccessToast(false);
    history.push('/users');
  };

  const handleDismissErrorToast = () => {
    setShowErrorToast(false);
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">Modifier le compte utilisateur</h3>
              </div>
              <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
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
                            <Form.Control
                              {...field}
                              type="text"
                              placeholder="Nom"
                            />
                          )}
                          control={control}
                          name="nom"
                          rules={{ 
                            required: "Le nom est requis",
                            minLength: { value: 3, message: "Nom doit contenir au minimum 3 caractères" }
                          }}
                        />
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
                            <Form.Control
                              {...field}
                              type="text"
                              placeholder="Prenom"
                            />
                          )}
                          control={control}
                          name="prenom"
                          rules={{ 
                            required: "Le prénom est requis",
                            minLength: { value: 3, message: "Prenom doit contenir au minimum 3 caractères" }
                          }}
                        />
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
                            <Form.Control
                              {...field}
                              type="text" 
                              placeholder="Nom d'utilisateur"
                            />
                          )}
                          control={control}
                          name="username"
                          rules={{ 
                            required: "Le nom d'utilisateur est requis",
                            minLength: { value: 3, message: "Username doit contenir au minimum 3 caractères" }
                          }}
                        />
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
                          <Form.Select {...field} aria-label="Rôle">
                            <option value="SUPER_ADMIN">Superadmin</option>
                            <option value="ADMIN">Admin</option>
                            <option value="AGENT">Agent</option>
                          </Form.Select>
                        )}
                        control={control}
                        name="role"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100">
                  Modifier
                </Button>
              </Form>
            </div>
          </Col>
        </Container>
      <Toast
        show={showSuccessToast}
        className="bg-primary text-white my-3"
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          minWidth: '250px',
        }}
        onClose={handleDismissSuccessToast}
      >
        <Toast.Header closeButton={false}>
          <FontAwesomeIcon icon={faCheckCircle} />
          <strong className="me-auto ms-2">Succès</strong>
          <Button variant="close" onClick={handleDismissSuccessToast} />
        </Toast.Header>
        <Toast.Body>
          L'utilisateur a été modifié avec succès.
        </Toast.Body>
      </Toast>
      <Toast
        show={showErrorToast}
        className="bg-danger text-white my-3"
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          minWidth: '250px',
        }}
        onClose={handleDismissErrorToast}
      >
        <Toast.Header closeButton={false}>
          <FontAwesomeIcon icon={faExclamationCircle} />
          <strong className="me-auto ms-2">Erreur</strong>
          <Button variant="close" onClick={handleDismissErrorToast} />
        </Toast.Header>
        <Toast.Body>
          Une erreur s'est produite lors de la modification de l'utilisateur. Veuillez vérifier les coordonnées saisies.
        </Toast.Body>
      </Toast>
      </section>
    </main>
  );
}

export default ModifierUser;
