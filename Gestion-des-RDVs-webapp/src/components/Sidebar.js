/* eslint-disable import/no-anonymous-default-export */

import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar, faList, faTimes, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Dropdown } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import Idara from "../assets/img/idara.png";
import { Routes } from "../routes";
import AuthContext from "../context/AuthProvider";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);
  const { auth } = React.useContext(AuthContext);

  // const CollapsableNavItem = (props) => {
  //   const { eventKey, title, icon, children = null } = props;
  //   const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

  //   return (
  //     <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
  //       <Accordion.Item eventKey={eventKey}>
  //         <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
  //           <span>
  //             <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
  //             <span className="sidebar-text">{title}</span>
  //           </span>
  //         </Accordion.Button>
  //         <Accordion.Body className="multi-level">
  //           <Nav className="flex-column">
  //             {children}
  //           </Nav>
  //         </Accordion.Body>
  //       </Accordion.Item>
  //     </Accordion>
  //   );
  // };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
 
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
            <img src={Idara} alt="Logo" style={{ height: '75px', width: '75px',marginLeft:"32%" }} />

            {auth.role === 'SUPER_ADMIN' && (
            <h5 style={{textAlign:"center",marginTop:"5%"}}>Espace SuperAdmin</h5>)}

            {auth.role === 'ADMIN' && (
            <h5 style={{textAlign:"center",marginTop:"5%"}}>Espace Admin</h5>)}

            {auth.role === 'AGENT' && (
            <h5 style={{textAlign:"center",marginTop:"5%"}}>Espace Agent</h5>)}

              <Dropdown.Divider className="my-3 border-indigo" />

              {auth.role === 'SUPER_ADMIN' && (
              <NavItem title="Gestion des utilisateurs" icon={faUserCircle} link={Routes.ListUsers.path}/>)}

              {auth.role === 'AGENT' && (
              <NavItem title="RDV d'aujourd'hui" icon={faCalendar} link={Routes.AgentHomepage.path}/>)}
      
              {auth.role === 'ADMIN' && (
                <>
                  <NavItem title="Calendrier" icon={faCalendar} link={Routes.AdminHomepage.path} />
                  <NavItem title="Liste des RDV" icon={faList} link={Routes.ListRdvAdmin.path} />
                </>
              )}
                </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
