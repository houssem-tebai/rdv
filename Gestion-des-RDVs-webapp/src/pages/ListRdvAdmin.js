import React, { useState, useEffect, useRef } from 'react';
import AuthContext from '../context/AuthProvider';
import { Card, Table, Button } from '@themesberg/react-bootstrap';
import axios from "../api/axios";
import RendezvousService from '../services/RendezvousService';
import Modal from 'react-modal';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import jsPDF from 'jspdf';
import { Redirect } from 'react-router';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
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

function ListRdvAdmin() {
    const { auth } = React.useContext(AuthContext);
    const [RDVs, setRDVs] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedRDVDetails, setSelectedRDVDetails] = useState(null);
    const [idFilter, setIdFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [passeportFilter, setPasseportFilter] = useState('');
    const [etatFilter, setEtatFilter] = useState('');
    const [observationsFilter, setObservationsFilter] = useState('');
    const [nomFilter, setNomFilter] = useState('');
    const [prenomFilter, setPrenomFilter] = useState('');
    const [paysFilter, setPaysFilter] = useState('');


    const tableRef = useRef();
    const handleExportToPdf = () => {
        try {
            const { current: table } = tableRef;
    
            if (!table) {
                console.error('Table element not found.');
                return;
            }
    
            const pdf = new jsPDF('l', 'mm', 'a4');
            const columns = ["ID", "Date RDV", "Passeport", "Nom citoyen", "Prénom citoyen", "Pays d'origine", "Etat", "Observations"];
    
            const rows = filteredRDVs.map((rendezvous) => {
                return [
                    rendezvous.idRDV,
                    rendezvous.dateRDV.join('/'),
                    rendezvous.idCitoyen.passeport,
                    rendezvous.idCitoyen.nom,
                    rendezvous.idCitoyen.prenom,
                    rendezvous.idCitoyen.pays,
                    rendezvous.etat,
                    rendezvous.observations
                ];
            });
    
            pdf.setFontSize(12);
            pdf.text('Liste des rendezvous : ', 15, 15);
            pdf.autoTable({
                startY: 20,
                head: [columns],
                body: rows,
            });
    
            pdf.save('exported_data.pdf');
        } catch (error) {
            console.error('Error exporting to PDF:', error);
        }
    };

    const handleExportToExcell = () => {
        try {
            const columns = ["ID", "Date RDV", "Passeport", "Nom citoyen", "Prénom citoyen", "Pays d'origine", "Etat", "Observations"];
            const data = filteredRDVs.map((rendezvous) => [
                rendezvous.idRDV,
                rendezvous.dateRDV.join('/'),
                rendezvous.idCitoyen.passeport,
                rendezvous.idCitoyen.nom,
                rendezvous.idCitoyen.prenom,
                rendezvous.idCitoyen.pays,
                rendezvous.etat,
                rendezvous.observations
            ]);
    
            const ws = XLSX.utils.aoa_to_sheet([columns, ...data]);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'RDV Sheet');
    
            // Save the workbook as a file
            XLSX.writeFile(wb, 'exported_data.xlsx');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };
    const handleExportToExcel = () => {
        try {
            const columns = ["ID", "Date RDV", "Passeport", "Nom citoyen", "Prénom citoyen", "Pays d'origine", "Etat", "Observations"];
            const data = filteredRDVs.map((rendezvous) => [
                rendezvous.idRDV,
                rendezvous.dateRDV.join('/'),
                rendezvous.idCitoyen.passeport,
                rendezvous.idCitoyen.nom,
                rendezvous.idCitoyen.prenom,
                rendezvous.idCitoyen.pays,
                rendezvous.etat,
                rendezvous.observations
            ]);
    
            const ws = XLSX.utils.aoa_to_sheet([columns, ...data]);
    
            // Set column widths and colors
            const columnStyles = {
                A: { width: 5, fill: { fgColor: { rgb: "FF0000" } } }, // ID
                B: { width: 10, fill: { fgColor: { rgb: "00FF00" } } }, // Date RDV
                C: { width: 15, fill: { fgColor: { rgb: "0000FF" } } }, // Passeport
                D: { width: 20, fill: { fgColor: { rgb: "FFFF00" } } }, // Nom citoyen
                E: { width: 20, fill: { fgColor: { rgb: "FF00FF" } } }, // Prénom citoyen
                F: { width: 15, fill: { fgColor: { rgb: "00FFFF" } } }, // Pays d'origine
                G: { width: 10, fill: { fgColor: { rgb: "FFA500" } } }, // Etat
                H: { width: 30, fill: { fgColor: { rgb: "A52A2A" } } }  // Observations
            };
    
            // Apply styles to columns
            Object.keys(columnStyles).forEach((col) => {
                const colIndex = col.charCodeAt(0) - 'A'.charCodeAt(0);
                
                // Apply column width
                if (!ws["!cols"]) {
                    ws["!cols"] = [];
                }
                ws["!cols"][colIndex] = { wpx: columnStyles[col].width * 10 };
    
                // Apply column fill color
                ws[`${col}1`].s = { fill: columnStyles[col].fill };
                for (let row = 2; row <= data.length + 1; row++) {
                    const cellRef = XLSX.utils.encode_cell({ r: row, c: colIndex });
                    if (!ws[cellRef]) {
                        ws[cellRef] = {};
                    }
                    ws[cellRef].s = { fill: columnStyles[col].fill };
                }
            });
    
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'RDV Sheet');
    
            // Save the workbook as a file
            XLSX.writeFile(wb, 'exported_data.xlsx');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };
    

    const handleDetailsClick = async (rendezvous) => {
        try {
            const response = await RendezvousService.getDetailsForRendezvous(rendezvous.idRDV);
            if (response.status === 200) {
                setIsDetailsModalOpen(true);
                setSelectedRDVDetails(response.data);
            } else {
                console.error('Failed to fetch details:', response.data);
            }
        } catch (error) {
            console.error('Error fetching details:', error.message);
        }
    };

    const closeModal = () => {
        setIsDetailsModalOpen(false);
    };

    const setIsFourthModalOpen = (value) => {
        // Implement the logic to set the state for the fourth modal
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/rendezvous/all');
                setRDVs(response.data);
            } catch (error) {
                console.error('Error fetching rendezvous data:', error);
            }
        };

        fetchData();
    }, []);
    const TableRow = ({ rendezvous }) => (
        <tr key={rendezvous.idRDV}>
            <td>{rendezvous.idRDV}</td>
            <td>{rendezvous.dateRDV.join('/')}</td>
            <td>{rendezvous.idCitoyen.passeport}</td>
            <td>{rendezvous.idCitoyen.nom}</td>
            <td>{rendezvous.idCitoyen.prenom}</td>
            <td>{rendezvous.idCitoyen.pays}</td>
            <td>{rendezvous.etat}</td>
            <td>{rendezvous.observations}</td>
            <td>
                <Button variant="primary" onClick={() => handleDetailsClick(rendezvous)}>
                    Détails
                </Button>
            </td>
        </tr>
    );

    const filteredRDVs = RDVs.filter((rendezvous) => {
        return (
            (rendezvous.idRDV?.toString().includes(idFilter) || idFilter === '') &&
            (rendezvous.dateRDV?.join('/').includes(dateFilter) || dateFilter === '') &&
            (rendezvous.idCitoyen?.passeport?.includes(passeportFilter) || passeportFilter === '') &&
            (rendezvous.etat?.includes(etatFilter) || etatFilter === '') &&
            (rendezvous.observations?.toLowerCase().includes(observationsFilter.toLowerCase()) || observationsFilter === '') &&
            (rendezvous.idCitoyen?.nom?.toLowerCase().includes(nomFilter.toLowerCase()) || nomFilter === '') &&
            (rendezvous.idCitoyen?.prenom.toLowerCase().includes(prenomFilter.toLowerCase()) || prenomFilter === '') &&
            (rendezvous.idCitoyen?.pays.toLowerCase().includes(paysFilter.toLowerCase()) || paysFilter === '')
        );

    });

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
            {/* Filter input fields */}
            <div>
                <h2 classname="mt-10">Tous les rendez-vous</h2>
                <input
                    type="text"
                    placeholder="Filtrer l'id"
                    value={idFilter}
                    onChange={(e) => setIdFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '6%',
                        height: '40px',
                        
                        marginBottom: '8px',
                    }}
                />
                <input
                    type="text"
                    placeholder="Filtrer la date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '8%',
                        height: '40px',
                        marginLeft: '1%',
                        marginBottom: '8px',
                        
                    }}
                />
                <input
                    type="text"
                    placeholder="Filtrer le passeport"
                    value={passeportFilter}
                    onChange={(e) => setPasseportFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '10%',
                        height: '40px',
                        marginLeft: '1%',
                        marginBottom: '8px',
                       
                    }}
                />
                <input
                    type="text"
                    placeholder="Filtrer le nom"
                    value={nomFilter}
                    onChange={(e) => setNomFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '10%',
                        height: '40px',
                        marginLeft: '1%',
                        marginBottom: '8px',
                       
                    }}
                />
                <input
                    type="text"
                    placeholder="Filtrer le prénom"
                    value={prenomFilter}
                    onChange={(e) => setPrenomFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '10%',
                        height: '40px',
                        marginLeft: '1%',
                        marginBottom: '8px',
                        
                    }}
                />
                <input
                    type="text"
                    placeholder="Filtrer le pays"
                    value={paysFilter}
                    onChange={(e) => setPaysFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '10%',
                        height: '40px',
                        marginLeft: '1%',
                        marginBottom: '8px',
                       
                    }}
                />
                <select
                    value={etatFilter}
                    onChange={(e) => setEtatFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '10%',
                        height: '40px',
                        marginLeft: '1%',
                        marginBottom: '8px',
                      
                    }}
                >
                    <option value="">Filtrer l'état</option>
                    <option value="EnAttente">EnAttente</option>
                    <option value="EnCours">EnCours</option>
                    <option value="Terminé">Terminé</option>
                    <option value="Annulé">Annulé</option>

                    {/* Add more options as needed */}
                </select>

                {/* Dropdown for observations filter */}
        
                <input
                    type="text"
                    placeholder="Filtrer observations"
                    value={observationsFilter}
                    onChange={(e) => setObservationsFilter(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '10%',
                        height: '40px',
                        marginLeft: '1%',
                        marginBottom: '8px',
                        
                    }}
                />
                <Button
                    variant="danger"
                    style={{
                        marginLeft:"10px"
                    }}
                    onClick={handleExportToPdf}>
                    <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px'}} />
                   </Button>

                   <Button
                    variant="success"
                    style={{
                        marginLeft:"10px"
                    }}
                    onClick={handleExportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px'}} />
                   </Button>
            </div>

            {/* Table */}
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table ref={tableRef} hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date RDV</th>
                                <th>Passeport</th>
                                <th>Nom citoyen</th>
                                <th>Prénom citoyen</th>
                                <th>Pays d'origine</th>
                                <th>Etat</th>
                                <th>Observations</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRDVs.map((rendezvous) => (
                                <TableRow key={rendezvous.idRDV} rendezvous={rendezvous} />
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

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
                        <h5 className="mb-4" >Details Citoyen</h5>
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
                        <h5 className="mb-4" >Details Rendezvous</h5>
                        <p><strong>Nom de l'agent:</strong> {selectedRDVDetails?.employeDetails.nom}</p>
                        <p><strong>Prénom de l'agent:</strong> {selectedRDVDetails?.employeDetails.prenom}</p>
                        <p><strong>Date Rendezvous:</strong> {formatDateArray(selectedRDVDetails?.rendezvousDetails.dateRDV)}</p>
                        <p><strong>Date saisie:</strong> {selectedRDVDetails?.rendezvousDetails.dateSaisie}</p>
                        <p><strong>Observations:</strong>
                            <div> </div>
                            {selectedRDVDetails?.rendezvousDetails.observations}</p>
                    </Col>
                </Row>
             </Modal>
        </>
        )}
    </>
    );
}

export default ListRdvAdmin;