/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.17
 */
import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';

/**
 * Renders Footer of the page
 *
 * ### Usage
 *
 * ```
 * import Footer from './components/Footer/Footer';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 *
 * @example
 * return (
 *      <Footer />
 * );
 */
const Footer = () => {
    return (
        <MDBContainer className='px-0 my-2'>
            <MDBFooter color='bg-primary' className='font-small'>
                <MDBContainer fluid className='text-center'>
                    &copy; 2020. YWMC MAIST. All Rights Reserved.
                </MDBContainer>
            </MDBFooter>
        </MDBContainer>
    );
};

export default Footer;
