
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Toast } from 'react-bootstrap';
import RendezvousService from '../services/RendezvousService';
import AuthContext from '../context/AuthProvider';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ChooseModal = ({ show, handleClose, rendezvous, onRefreshData }) => {
  const { auth } = React.useContext(AuthContext);

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [observations, setObservations] = useState('');
  const [atLeastOneCheckboxSelected, setAtLeastOneCheckboxSelected] = useState(false);
  const [additionalObservations, setAdditionalObservations] = useState('');
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);


  useEffect(() => {
    if (showSuccessToast) {
      const timerId = setTimeout(() => {
        handleDismissSuccessToast();
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [showSuccessToast]);

  const handleDismissSuccessToast = () => {
    setShowSuccessToast(false);

  };

  const handleCheckboxChange = (value) => {
    if (selectedCheckbox === value) {
      // If the same checkbox is clicked again, unselect it
      setSelectedCheckbox(null);
    } else {
      // Select the new checkbox and update observations
      setSelectedCheckbox(value);
      setObservations(value);
    }

    // Check if at least one checkbox or text area is selected
    setAtLeastOneCheckboxSelected(!!value || !!additionalObservations);
  };
  const handleTerminer = async () => {
    try {
      // Combine selected checkbox and additional observations
      const combinedObservations = [selectedCheckbox, additionalObservations].filter(Boolean).join(' ').trim();

      // Check if at least one checkbox or text area is selected
      if (!selectedCheckbox && !additionalObservations) {
        // Display an error message or handle the case where no checkbox or text area is selected
        console.error('At least one checkbox or text area must be selected');
        return;
      }

      // Call the endRendezvous service function
      await RendezvousService.endRendezvous(
        rendezvous.idRDV,
        auth.id,
        combinedObservations
      );
      console.log('Rendezvous ended successfully');

      // Close the modal only after successful termination
      handleClose();
      onRefreshData();
      setShowSuccessToast(true);
    } catch (error) {
      console.error('Error ending Rendezvous:', error);
    }
  };


  useEffect(() => {
    if (!show) {
      // Clear states when the modal is closed
      setObservations('');
      setSelectedCheckbox([]);
      setAdditionalObservations('');
      setAtLeastOneCheckboxSelected(false);
    }
  }, [show]);


  return (
    <>
      <Modal show={show} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Détails Citoyen:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {/* Left half: Citoyen details */}
            <Col md={6}>
              <p><strong>Nom Citoyen:</strong> {rendezvous.idCitoyen.nom}</p>
              <p><strong>Prénom Citoyen:</strong> {rendezvous.idCitoyen.prenom}</p>
              <p><strong>Numero Passeport:</strong> {rendezvous.idCitoyen.passeport}</p>
              <p><strong>Pays d'origine:</strong> {rendezvous.idCitoyen.pays}</p>
              <p><strong>Gouvernorat:</strong> {rendezvous.idCitoyen.gouvernerat}</p>
              <p><strong>Ville:</strong> {rendezvous.idCitoyen.ville}</p>
              <p><strong>Code Postal:</strong> {rendezvous.idCitoyen.codePostal}</p>
              <p><strong>Adresse:</strong> {rendezvous.idCitoyen.adresse}</p>
              <p><strong>Type établissement d'études:</strong> {rendezvous.idCitoyen.typeEtab}</p>
              <p><strong>Nom établissement d'études:</strong> {rendezvous.idCitoyen.nomEtab}</p>

            </Col>
            {/* Vertical line */}
            <Col md={1} className="border-right"></Col>
            {/* Right half: Observations and button */}
            <Col md={5}>
              <Form.Group controlId="observations">
                <Form.Label>Observations</Form.Label>

                {/* Checkbox for "Dossier Conclus" */}
                <Form.Check
                  type="checkbox"
                  label="Dossier Conclus"
                  checked={selectedCheckbox === 'Dossier Conclus'}
                  onChange={() => handleCheckboxChange('Dossier Conclus')}
                />

                {/* Checkbox for "Sans représentant légal" */}
                <Form.Check
                  type="checkbox"
                  label="Sans représentant légal"
                  checked={selectedCheckbox === 'Sans représentant légal'}
                  onChange={() => handleCheckboxChange('Sans représentant légal')}
                />

                {/* Checkbox for "Manque de pièces" */}
                <Form.Check
                  type="checkbox"
                  label="Manque de pièces"
                  checked={selectedCheckbox === 'Manque de pièces'}
                  onChange={() => handleCheckboxChange('Manque de pièces')}
                />

<Form.Check
                  type="checkbox"
                  label="Absent"
                  checked={selectedCheckbox === 'Absent'}
                  onChange={() => handleCheckboxChange('Absent')}
                />


                {/* Text area for additional observations */}
                <Form.Label>Autres observations</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={additionalObservations}
                  onChange={(e) => setAdditionalObservations(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleTerminer}
                className="mt-4"
                disabled={!selectedCheckbox && !additionalObservations}
              >
                Terminer Rendez-Vous
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* Add the Toast component outside the modal */}
      <Toast
        show={showSuccessToast}
        className="bg-success text-white my-3"
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          minWidth: '250px',
          zIndex: 9999, 
        }}
        onClose={handleDismissSuccessToast}
      >
        <Toast.Header closeButton={false}>
          <FontAwesomeIcon icon={faCheckCircle} />
          <strong className="me-auto ms-2">Succès</strong>
          <Button variant="close" onClick={handleDismissSuccessToast} />
        </Toast.Header>
        <Toast.Body>
          Rendez-vous terminé avec succès.
        </Toast.Body>
      </Toast>
    </>
  );
};
export default ChooseModal;