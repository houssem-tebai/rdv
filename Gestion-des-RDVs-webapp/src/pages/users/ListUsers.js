import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import {faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableUser from './TableUser';
import userService from '../../services/UserService';
import { useHistory } from 'react-router-dom';

function ListUsers() {
  const [users, setUsers] = useState([]);
  const history=useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        //var fetchedUsersArray = Object.values(allUsers);
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    history.push('/creer-compte');
  };

  return (
    
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          {/* <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /> Utilisateurs</Breadcrumb.Item>
          </Breadcrumb> */}
          <h4>Liste des utilisateurs</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        <Button className="text-white me-2" onClick={handleCreateUser}>
        <FontAwesomeIcon icon={faPlus} className="me-2" />
        <span>Creer un nouveau compte</span>
        </Button>
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

      <TableUser users={users} setUsers={setUsers} />
    </>
  );
}

export default ListUsers;