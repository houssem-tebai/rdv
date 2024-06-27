import React, { useState } from 'react';
import { Card, Table, Button, Modal, Badge } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock, faLock, faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the edit icon
import userService from '../../services/UserService';
import { useHistory } from 'react-router';

function TableUser({ users, setUsers }) {
  const [showModal, setShowModal] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);
  const [loading, setLoading] = useState(false);
  const history=useHistory();
  const handleToggleStatus = async () => {
    try {
      setLoading(true);

      const apiEndpoint =
        userToToggle.statut === 'ACTIF'
          ? userService.disableUser
          : userToToggle.statut === 'BLOQUE'
          ? userService.enableUser
          : null;

      if (apiEndpoint) {
        await apiEndpoint(userToToggle.id);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userToToggle.id
              ? { ...user, statut: userToToggle.statut === 'ACTIF' ? 'BLOQUE' : 'ACTIF' }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleShowModal = (user) => {
    setUserToToggle(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setUserToToggle(null);
    setShowModal(false);
  };

  const TableRow = ({ id, cin, nom, prenom, email, username, role, statut }) => {
    let statutVariant;
    let statutText;
    let actionContent;
  
    switch (statut) {
      case 'ACTIF':
        statutVariant = 'success';
        statutText = '';
        actionContent = (
          <>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleShowModal({ id, cin, nom, prenom, email, username, role, statut })}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faLock} />
            </Button>
            <Button
              variant="info"
              size="sm"
              className="ms-2"
              onClick={() => handleEditUser({ id, cin, nom, prenom, email, username, role, statut })}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </>
        );
        break;
      case 'NON_ACTIF':
        statutVariant = 'warning';
        statutText = 'En attente d\'activation du compte';
        actionContent = (
          <>
            <Button
              variant="info"
              size="sm"
              className="ms-2"
              onClick={() => handleEditUser({ id, cin, nom, prenom, email, username, role, statut })}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </>
        );
        break;
      case 'BLOQUE': // Assuming 'BLOQUE' is the correct status for blocked users
        statutVariant = 'danger';
        statutText = '';
        actionContent = (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => handleShowModal({ id, cin, nom, prenom, email, username, role, statut })}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faUnlock} />
            </Button>
            <Button
              variant="info"
              size="sm"
              className="ms-2"
              onClick={() => handleEditUser({ id, cin, nom, prenom, email, username, role, statut })}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </>
        );
        break;
      default:
        statutVariant = 'danger';
        statutText = '';
        actionContent = null;
    }
  
    return (
      <tr key={id}>
        <td>{cin}</td>
        <td>{nom}</td>
        <td>{prenom}</td>
        <td>{email}</td>
        <td>{username}</td>
        <td>{role.name}</td>
        <td>
          <Badge bg={statutVariant} className="p-2">
            {statutText || statut}
          </Badge>
        </td>
        <td>{actionContent}</td>
      </tr>
    );
  };

  const handleEditUser = (user) => {
    // Use React Router to navigate to the ModifierUser component with the user ID as a route parameter
    history.push(`/modifier-user/${user.id}`);
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th>CIN</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Statut</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) ? (
              users.map((user) => <TableRow key={user.id} {...user} />)
            ) : (
              <TableRow {...users} />
            )}
          </tbody>
        </Table>
      </Card.Body>

      <Modal as={Modal.Dialog} centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {userToToggle?.statut === 'ACTIF' ? 'Blocage' : 'Activation'} de l'utilisateur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Etes-vous sûr de vouloir {' '}
            {userToToggle?.statut === 'ACTIF' ? 'bloquer' : 'activer'} l'utilisateur {userToToggle?.username}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button
            variant={userToToggle?.statut === 'ACTIF' ? 'danger' : 'success'}
            onClick={handleToggleStatus}
            disabled={loading}
          >
            {loading ? 'Processing...' : userToToggle?.statut === 'ACTIF' ? 'Bloquer' : 'Activer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
export default TableUser;