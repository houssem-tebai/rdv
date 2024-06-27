import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Image, Button, Container } from '@themesberg/react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import NotFoundImage from "../assets/img/illustrations/404.svg";

const NotFound = () => {
  const history = useHistory();
  const { auth } = useContext(AuthContext);

  const handleHomeButtonClick = () => {
    // Check the user's role and redirect accordingly
    if (auth.role === 'ADMIN') {
      history.push('/admin');
    } else if (auth.role === 'AGENT') {
      history.push('/agent');
    } else if (auth.role === 'SUPER_ADMIN') {
      history.push('/users');
    } else {
      // Handle other roles or provide a default behavior
      history.push('/login');
    }
  };
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
              <div>
                <Card.Link as={Link} >
                  <Image src={NotFoundImage} className="img-fluid w-75" />
                </Card.Link>
                <h1 className="text-primary mt-5">
                  Page not <span className="fw-bolder">found</span>
                </h1>
                <p className="lead my-4">
                  Oops! On dirait que vous avez suivi un mauvais lien. Si vous pensez qu'il s'agit d'un problème chez nous, veuillez nous le dire.
                </p>
                <Button as={Link} variant="primary" className="animate-hover" onClick={handleHomeButtonClick}>
                  <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  Home
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default NotFound;
