import React from 'react';
import { Card, Table, Button } from '@themesberg/react-bootstrap';


const RdvListTable = ({ RDVs, onChooseClick }) => {
    const TableRow = ({ rendezvous }) => (
      <tr key={rendezvous.idRDV}>
        <td>{rendezvous.idRDV}</td>
        <td>{rendezvous.idCitoyen.nom}</td>
        <td>{rendezvous.idCitoyen.prenom}</td>
        <td>{rendezvous.idCitoyen.passeport}</td>
        <td>
          <Button variant="primary" onClick={() => onChooseClick(rendezvous)}>
            Choose
          </Button>
        </td>
      </tr>
    );
  
    return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Passeport</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {RDVs.map((rendezvous) => (
                <TableRow key={rendezvous.idRDV} rendezvous={rendezvous} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };
  

export default RdvListTable;