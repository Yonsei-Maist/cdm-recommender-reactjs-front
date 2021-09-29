/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.17
 */
import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { ReactComponent as Logo } from "../../assets/logo70.svg";

/**
 * Renders Header of the page
 *
 * ### Usage
 *
 * ```
 * import Header from './components/Header/Header';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 * @requires '../../assets/logo70.svg'
 *
 * @example
 * return (
 *      <Header />
 * );
 */
const Header = () => {
  return (
    <MDBContainer className="text-start">
      <MDBRow>
        <MDBCol md={"auto"} className="pr-0">
          <Logo style={{ height: "5rem", width: "5rem" }} />
        </MDBCol>
        <MDBCol className="d-flex justify-content-start align-items-center">
          <h5>Yonsei University, Wonju College of Medicine</h5>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Header;
