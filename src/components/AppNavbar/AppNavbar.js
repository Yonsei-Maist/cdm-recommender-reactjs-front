/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.29
 */
import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavLink as MDBLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBIcon,
} from "mdbreact";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MDBContainer className="px-0 my-2">
      <MDBNavbar color="bg-primary" dark expand="md" scrolling>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBLink to={"/cdm"}>Home</MDBLink>
            <MDBLink to={"/emr-cdm-relationship"}>
              EMR & CDM Relationship
            </MDBLink>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBLink to={"/login"}>Login</MDBLink>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" className="mr-1" />
                Profile
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem href="#!">My account</MDBDropdownItem>
                <MDBDropdownItem href="#!">Log out</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </MDBContainer>
  );
};

export default AppNavbar;
