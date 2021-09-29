/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.29
 */
import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import SectionContainer from "../components/SectionContainer/SectionContainer";
import { NavLink } from "react-router-dom";

import "./LoginPage.css";

class LoginPage extends Component {
  render() {
    return (
      <MDBContainer className="mt-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <SectionContainer>
              <form>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary">Login</MDBBtn>
                </div>
                <MDBCol md="6"></MDBCol>
                <div className="col-md-12 ">
                  <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or">or</span>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  {/* <p className='text-center'>
                                        <a className='google btn mybtn'>
                                            <i className='fa fa-google-plus'></i>{' '}
                                            Signup using Google
                                        </a>
                                    </p> */}
                  <MDBBtn className="btn btn-gplus">
                    <i className="fab fa-google-plus-g pr-1"></i> Google +
                  </MDBBtn>
                </div>
                <div className="form-group">
                  <p className="text-center">
                    Don't have account?{" "}
                    <NavLink to="/register">Sign up here</NavLink>
                  </p>
                </div>
              </form>
            </SectionContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default LoginPage;
