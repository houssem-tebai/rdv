import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr'; // Import French locale
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Toast } from '@themesberg/react-bootstrap';
import DatesService from '../services/DatesService';
import RendezvousService from '../services/RendezvousService';
import { Card, Table } from '@themesberg/react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import AuthContext from '../context/AuthProvider';
import { Redirect } from 'react-router';


moment.locale('fr');

const localizer = momentLocalizer(moment);
const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
    },
};
const customModalStyles2 = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '320px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
    },

};
const customModalStyles3 = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '600px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
    },

};

function AdminHomepage() {
    const { auth } = React.useContext(AuthContext);

    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
    const [isFourthModalOpen, setIsFourthModalOpen] = useState(false);
    const [is5ModalOpen, setIs5ModalOpen] = useState(false);

    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showErrorToast2, setShowErrorToast2] = useState(false);
    const [maxRDV, setMaxRDV] = useState('');
    const [maxRDVG, setMaxRDVG] = useState(''); // Declare maxRDV in the state

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [existingMaxRDV, setExistingMaxRDV] = useState(null);
    const [existingMaxRDVForDates, setExistingMaxRDVForDates] = useState({});
    const [selectedRDVs, setSelectedRDVs] = useState([]);
    const [existingMaxRDVG, setExistingMaxRDVG] = useState({});

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedRDVDetails, setSelectedRDVDetails] = useState(null);


    useEffect(() => {
        const fetchExistingDateInfo = async () => {
            try {
                const existingDateInfo = await DatesService.getExistingDateInfo(selectedDate);
                if (existingDateInfo.success) {
                    // Set existing max RDV data for the selected date
                    setExistingMaxRDVForDates((prevData) => ({
                        ...prevData,
                        [selectedDate?.toISOString().split('T')[0]]: existingDateInfo.data.maxRDV,
                    }));
                }
            } catch (error) {
                console.error('Error fetching existing date info:', error.message);
            }
        };

        fetchExistingDateInfo();
    }, [selectedDate]);

    useEffect(() => {
        const fetchMaxRDVG = async () => {
            try {
                const MaxRDVG = await DatesService.getMaxRDVG();
                // Check if the response status is successful (e.g., 200)
                if (MaxRDVG.status === 200) {
                    setExistingMaxRDVG((prevData) => ({
                        ...prevData,
                        maxRDVG: MaxRDVG.data.maxRDVG,
                    }));
                } else {
                    console.error('Error fetching existing MaxRDVG:', MaxRDVG.statusText);
                }
            } catch (error) {
                console.error('Error fetching existing MaxRDVG:', error.message);
                console.error('Error response:', error.response); // Log the full Axios response for debugging
            }
        };
    
        fetchMaxRDVG();
    }, [maxRDVG]);

    useEffect(() => {
        if (showSuccessToast || showErrorToast || showErrorToast2) {
            const timerId = setTimeout(() => {
                handleDismissSuccessToast();
                handleDismissErrorToast();
            }, 3000);

            return () => clearTimeout(timerId);
        }
    }, [showSuccessToast][showErrorToast]);

    const handleSelectEvent = (event) => {
        console.log('Selected event:', event);
        // You can perform actions when an event is selected
    };

    const handleSelectSlot = (slotInfo) => {
        console.log('Slot selected:', slotInfo);
        setSelectedDate(slotInfo.start);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDate(null);
        setIsModalOpen(false);
        setIsSecondModalOpen(false);
        setIsThirdModalOpen(false);
        setIsFourthModalOpen(false);
        setIs5ModalOpen(false);
        setIsDetailsModalOpen(false);
        setExistingMaxRDV(null); // Clear existing max RDV
    };

    const handleCreateEvent = () => {
        setIsSecondModalOpen(true);
    };
    const handleUpdatedate = () => {
        setIsThirdModalOpen(true);
    };

    const handleConfirm = async () => {
        const { success, error } = await DatesService.createNewDate(maxRDV, selectedDate);

        if (success) {
            setShowSuccessToast(true);
            setIsSecondModalOpen(false);
            setIsModalOpen(false);
            setMaxRDV('');
        } else {
            // Handle failure (e.g., show an error message)
            console.error('Failed to create date record:', error);
        }
    };

    const handleUpdate = async () => {
        const { success, error } = await DatesService.updateDate(maxRDV, selectedDate);

        if (success) {
            console.log('Update success!');
            setShowSuccessToast(true);
            setIsThirdModalOpen(false);
            setIsModalOpen(false);
            setMaxRDV('');
        } else {
            // Handle failure (e.g., show an error message)
            console.error('Failed to update date record:', error);
        }
    };

    const handleDismissSuccessToast = () => {
        console.log('Dismissing success toast');
        setShowSuccessToast(false);
    };
    const handleConsulterRDV = async () => {
        try {
            const response = await RendezvousService.getRendezvousByDate(selectedDate);

            if (response.status === 200 || response.status === 'OK') {
                console.log('Opening fourth modal...');
                setIsFourthModalOpen(true);
                setSelectedRDVs(response.data);
            } else {
                console.error('Failed to fetch RDVs. Response:', response);
                setShowErrorToast(true);
                setIsModalOpen(false);

            }
        } catch (error) {
            console.error('Error fetching RDVs:', error.message);
            setShowErrorToast(true);
            setIsModalOpen(false);

        }
    };


    const handleDismissErrorToast = () => {
        setShowErrorToast(false);
        setShowErrorToast2(false);
    };

    const handleDetailsClick = async (rendezvous) => {
        try {
            const response = await RendezvousService.getDetailsForTerminatedRendezvous(rendezvous.idRDV);
            if (response.status === 200) {
                setIsDetailsModalOpen(true);
                setSelectedRDVDetails(response.data);
            } else {
                console.error('Failed to fetch details:', response.data);
            }
        } catch (error) {
            console.error('Error fetching details:', error.message);
            setShowErrorToast2(true);
        }
    };
    const handleUpdateMaxRDVG = async () => {
        try {
            const { response, error } = await DatesService.updateMaxRDVG(maxRDVG);

            if (response) {
                console.log('Update success!');
                setShowSuccessToast(true);
                setIs5ModalOpen(false);
                setMaxRDVG('');
                
                
            } else {
                // Handle failure (e.g., show an error message)
                console.error('Failed to update rdvg record:', error);
            }
        } catch (error) {
            console.error('Error updating maxRDVG:', error.message);
        }
    };

    function formatDateArray(dateArray) {
        if (!dateArray) {
            return ''; // or any default value
        }
    
        // Convert the date array to a JavaScript Date object
        const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    
        // Format the date as a string (e.g., "YYYY-MM-DD")
        const formattedDate = dateObject.toISOString().split('T')[0];
    
        return formattedDate;
    }

    return (
        <>
        
        {(auth.role === 'AGENT' || auth.role === 'SUPER_ADMIN') ? (
 <Redirect to="/notFound" />        ) : (
    <>
        <div>


            <Button className="text-white me-2" onClick={() => setIs5ModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                <span>Changer le MaxRDV Global</span>
            </Button>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: 700,
                    marginTop: 40,
                }}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                popup
                culture="fr"
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: existingMaxRDV[event.start] ? 'red' : 'blue', // Set color based on existing max RDV
                    },
                })}
            />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Create Event Modal"
                style={customModalStyles}
            >
                <p>Date: {selectedDate && moment(selectedDate).format('Do MMMM YYYY')}</p>
                {existingMaxRDVForDates[selectedDate?.toISOString().split('T')[0]] !== undefined ? (
                    <div>
                        <p>Max RDV: {existingMaxRDVForDates[selectedDate?.toISOString().split('T')[0]]}</p>
                        <div className="d-flex flex-column align-items-center">
                            <Button variant="primary" onClick={handleUpdatedate} className="mt-4">
                                Mettre a jour MaxRDV
                            </Button>
                            <Button variant="primary" onClick={handleConsulterRDV} className="mt-4">
                                Consulter les RDV
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex flex-column align-items-center">
                        <Button variant="primary" onClick={handleCreateEvent} className="mt-4">
                            Changer MaxRDV
                        </Button>
                        <Button variant="primary" onClick={handleConsulterRDV} className="mt-4">
                            Consulter les RDV
                        </Button>
                    </div>
                )}
            </Modal>

            {/* Second Modal */}
            <Modal
                isOpen={isSecondModalOpen}
                onRequestClose={closeModal}
                contentLabel="Change MaxRDV Modal"
                style={customModalStyles2}
            >
                <h5>Changer le nombre max de rendezvous pour : {selectedDate && moment(selectedDate).format('Do MMMM YYYY')}</h5>
                <div className="d-flex flex-column align-items-center">
                    <label>
                        Max RDV:
                        <input
                            type="number"
                            value={maxRDV}
                            onChange={(e) => setMaxRDV(parseInt(e.target.value, 10))}
                            className="mt-4"
                        />
                    </label>
                    <Button variant="primary" onClick={handleConfirm} className="mt-5">
                        Confirm
                    </Button>
                </div>
            </Modal>
            {/* third Modal */}
            <Modal
                isOpen={isThirdModalOpen}
                onRequestClose={closeModal}
                contentLabel="Change MaxRDV Modal"
                style={customModalStyles2}
            >

                <h5>Mettre a jour le nombre max de rendezvous pour : {selectedDate && moment(selectedDate).format('Do MMMM YYYY')}</h5>
                <div className="d-flex flex-column align-items-center">
                    <label>
                        Max RDV:
                        <input
                            type="number"
                            value={maxRDV}
                            onChange={(e) => setMaxRDV(parseInt(e.target.value, 10))}
                            className="mt-4"
                        />
                    </label>
                    <Button variant="primary" onClick={handleUpdate} className="mt-5">
                        Confirm
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={isFourthModalOpen}
                onRequestClose={closeModal}
                contentLabel="rdvs modal"
                style={customModalStyles3}
            >

                <div>
                    <h5>Liste des rendezvous du {selectedDate && moment(selectedDate).format('Do MMMM YYYY')} </h5>
                    <Card border="light" className="table-wrapper table-responsive shadow-sm">
                        <Card.Body className="pt-0">
                            <Table hover className="user-table align-items-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Passeport</th>
                                        <th>Etat</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedRDVs.map((rendezvous) => (
                                        <tr key={rendezvous.idRDV}>
                                            <td>{rendezvous.idRDV}</td>
                                            <td>{rendezvous.idCitoyen.nom}</td>
                                            <td>{rendezvous.idCitoyen.prenom}</td>
                                            <td>{rendezvous.idCitoyen.passeport}</td>
                                            <td>{rendezvous.etat}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => handleDetailsClick(rendezvous)}>
                                                    Détails
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/*Details modal */}
            <Modal
                isOpen={isDetailsModalOpen}
                onRequestClose={closeModal}
                contentLabel="RDV Details Modal"
                style={customModalStyles3}
            >
                <Row>
                    <Col md={12} className="mb-4">
                        <Button
                            variant="link"
                            className="text-primary"
                            onClick={() => {
                                setIsDetailsModalOpen(false);
                                setIsFourthModalOpen(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                            Retour
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {/* Left half: Citoyen details */}
                    <Col md={6}>
                        <h5 className="mb-4" >Details Citoyen:</h5>
                        <p><strong>Nom Citoyen:</strong> {selectedRDVDetails?.citoyenDetails.nom}</p>
                        <p><strong>Prénom Citoyen:</strong> {selectedRDVDetails?.citoyenDetails.prenom}</p>
                        <p><strong>Numero Passeport:</strong> {selectedRDVDetails?.citoyenDetails.passeport}</p>
                        <p><strong>Pays:</strong> {selectedRDVDetails?.citoyenDetails.pays}</p>
                        <p><strong>Gouvernorat:</strong> {selectedRDVDetails?.citoyenDetails.gouvernerat}</p>
                        <p><strong>Ville:</strong> {selectedRDVDetails?.citoyenDetails.ville}</p>
                        <p><strong>Code Postal:</strong> {selectedRDVDetails?.citoyenDetails.codePostal}</p>
                        <p><strong>Adresse:</strong> {selectedRDVDetails?.citoyenDetails.adresse}</p>
                        <p><strong>Type établissement d'études:</strong> {selectedRDVDetails?.citoyenDetails.typeEtab}</p>
                        <p><strong>Nom établissement d'études:</strong> {selectedRDVDetails?.citoyenDetails.nomEtab}</p>
                    </Col>
                    {/* Vertical line */}
                    <Col md={1} className="border-right"></Col>
                    {/* Right half: Observations and button */}
                    <Col md={5}>
                        <h5 className="mb-4" >Details Rendezvous:</h5>
                        <p><strong>Nom de l'agent:</strong> {selectedRDVDetails?.employeDetails.nom}</p>
                        <p><strong>Prénom de l'agent:</strong> {selectedRDVDetails?.employeDetails.prenom}</p>
                        <p><strong>Date rendez-vous:</strong> {formatDateArray(selectedRDVDetails?.rendezvousDetails.dateRDV)}</p>
                        <p><strong>Date saisie:</strong> {selectedRDVDetails?.rendezvousDetails.dateSaisie}</p>
                        <p><strong>Observations:</strong>
                            <div> </div>
                            {selectedRDVDetails?.rendezvousDetails.observations}</p>
                    </Col>
                </Row>
            </Modal>
            <Modal
                isOpen={is5ModalOpen}
                onRequestClose={closeModal}
                contentLabel="Change MaxRDVG Modal"
                style={customModalStyles2}
            >

                <h5>Mettre a jour le nombre max de rendezvous pour tous les jours</h5>
                <div className="d-flex flex-column align-items-center">
                    <div>
                        <p>Max RDVG Actuel: {existingMaxRDVG.maxRDVG}</p>
                    </div>                    
                    <label>
                        Nouveau Max RDVG:
                        <input
                            type="number"
                            value={maxRDVG}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (!isNaN(value)) {
                                    setMaxRDVG(value);
                                } else {
                                    console.error('Invalid number:', e.target.value);
                                    // Optionally, you can show an error message to the user
                                }
                            }}
                            className="mt-4"
                        />
                    </label>
                    <Button variant="primary" onClick={handleUpdateMaxRDVG} className="mt-5">
                        Confirmer
                    </Button>
                </div>
            </Modal>


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
                <Toast.Body>Max RDV changé avec succès.</Toast.Body>
            </Toast>

            <Toast
                show={showErrorToast}
                className="bg-danger text-white my-3"
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    minWidth: '250px',
                    zIndex: 9999, 
                }}
                onClose={handleDismissErrorToast}
            >
                <Toast.Header closeButton={false}>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <strong className="me-auto ms-2">Erreur</strong>
                    <Button variant="close" onClick={handleDismissErrorToast} />
                </Toast.Header>
                <Toast.Body>
                    Pas de rendezvous dans cette date.
                </Toast.Body>
            </Toast>
            <Toast
                show={showErrorToast2}
                className="bg-danger text-white my-3"
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    minWidth: '250px',
                    zIndex: 9999, 
                }}
                onClose={handleDismissErrorToast}
            >
                <Toast.Header closeButton={false}>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <strong className="me-auto ms-2">Erreur</strong>
                    <Button variant="close" onClick={handleDismissErrorToast} />
                </Toast.Header>
                <Toast.Body>
                    Ce Rendezvous n'est pas encore terminé.
                </Toast.Body>
            </Toast>
        </div>
        </>
        )}
    </>
    );
}

export default AdminHomepage;