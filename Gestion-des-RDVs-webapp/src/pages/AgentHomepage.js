import RendezvousService from '../services/RendezvousService';
import React, { useState, useEffect } from 'react';
import RdvListTable from './RdvListTable';
import { Breadcrumb, Col, Form, InputGroup, Row , Button} from '@themesberg/react-bootstrap';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChooseModal from './ChooseModal';
import AuthContext from '../context/AuthProvider';
import {  Toast } from 'react-bootstrap';
import { Redirect } from 'react-router';


import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
function AgentHomepage() {

    const { auth } = React.useContext(AuthContext);

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [rendezvousData, setRendezvousData] = useState([]);
    const [selectedRendezvous, setSelectedRendezvous] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const today = new Date();
    const formattedDate = `${today.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })}`;

    const handleDismissSuccessToast = () => {
      setShowSuccessToast(false);
    };
    useEffect(() => {
      if (showSuccessToast ) {
          const timerId = setTimeout(() => {
              handleDismissSuccessToast();
          }, 3000);

          return () => clearTimeout(timerId);
      }
  }, [showSuccessToast]);
   

    const handleRefreshData = async () => {
        try {
          const rendezvous = await RendezvousService.getRendezvousForToday();
          var fetchedRDVArray = Object.values(rendezvous);
          setRendezvousData(fetchedRDVArray);
        } catch (error) {
          console.error('Error fetching updated data:', error);
        }
      };

    useEffect(() => {
        const fetchRDVs = async () => {
            try {
              const rendezvous = await RendezvousService.getRendezvousForToday();
              var fetchedRDVArray = Object.values(rendezvous);
              console.log('Fetched RDVs:', fetchedRDVArray); // Add this line
              setRendezvousData(fetchedRDVArray);
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
        fetchRDVs();
      }, []);

   
      const handleChooseClick = (rendezvous) => {
        // Check if idRDV is available
        if (rendezvous && Number.isInteger(rendezvous.idRDV)) {
          // Set the selected rendezvous and show the modal
          setSelectedRendezvous(rendezvous);
          setShowModal(true);
          setShowSuccessToast(true);
      
          // Call the chooseRendezvous function
          RendezvousService.chooseRendezvous(rendezvous.idRDV, auth.id)
            .then(() => {
              console.log('Rendezvous chosen successfully');
            })
            .catch((error) => {
              console.error('Error choosing Rendezvous:', error);
              // Handle the error, e.g., show an error message to the user
            });
        } else {
          console.error('IDRDV is not available');
          // Handle the case where idRDV is not available
        }
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    


    return (
      <>
        
      {(auth.role === 'ADMIN' || auth.role === 'SUPER_ADMIN') ? (
<Redirect to="/notFound" />        ) : (

        <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} />Accueil</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Liste des rendez-vous pour aujourd'hui le {formattedDate}:</h4>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <RdvListTable RDVs={rendezvousData} onChooseClick={handleChooseClick} />
     {/* Render ChooseModal component */}
     {selectedRendezvous && (
        <ChooseModal
          show={showModal}
          handleClose={handleCloseModal}
          rendezvous={selectedRendezvous}
          onRefreshData={handleRefreshData} 
        />
      )}
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
          Rendez-vous choisis avec succès.
        </Toast.Body>
      </Toast>
      
         </>
         )}
     </>

    );
}

export default AgentHomepage
