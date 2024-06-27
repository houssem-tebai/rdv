import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Modal } from '@themesberg/react-bootstrap';
import authService from '../services/AuthService'; // Import your authService
import AuthContext from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const { register, handleSubmit, setError, formState: { errors }, watch } = useForm();
  const newPassword = watch('newPassword', '');
  const { auth,setAuth } = React.useContext(AuthContext);
  const history = useHistory();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const onSubmit = async (data) => {
    if (data.username === auth.username) {
      console.log("Username after API call:", data.username === auth.username);
      try {
        const response = await authService.changePassword({
          username: data.username,
          newPassword: data.newPassword,
        });

        setShowSuccessModal(true);
        localStorage.clear();
        setAuth({});
        console.log('Password changed successfully:', response);
      } catch (error) {
        console.error('Error changing password:', error.message);
      }
    } else {
      console.error('Invalid username for password change');
      setError('username', { type: 'manual', message: 'Invalid username for password change' });
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    history.push('/login')


  };

  return (
    <main>
       {/* Success Modal */}
       <Modal as={Modal.Dialog} centered show={showSuccessModal} onHide={handleSuccessModalClose}>
          <Modal.Body className="p-4">
            <div className="text-center">
              <FontAwesomeIcon icon={faUnlockAlt} className="mb-3" size="2x" />
              <h5 className="mb-0">Mot de passe changé avec succés</h5>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button variant="primary" onClick={handleSuccessModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Changer votre mot de passe</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Taper votre nom d'utilisateur</Form.Label>
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
                  <Form.Group id="newPassword" className="mb-4">
                    <Form.Label>Taper votre nouveau mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Mot de passe"
                        {...register('newPassword', { required: 'Mot de passe requis' })}
                      />
                    </InputGroup>
                    {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirmer votre nouveau mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        {...register('confirmPassword', {
                          required: 'Confirmer le mot de passe requis',
                          validate: (value) => value === newPassword || 'Les mots de passe ne correspondent pas',
                        })}
                      />
                    </InputGroup>
                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Changer le mot de passe
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default ChangePassword;
