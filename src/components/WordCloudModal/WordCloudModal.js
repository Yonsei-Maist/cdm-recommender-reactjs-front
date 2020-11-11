/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.11.11
 */
import React from 'react';
import { MDBModal, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact';
import ReactWordcloud from 'react-wordcloud';
import PropTypes from 'prop-types';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
/**
 * Renders pop up modal to show word cloud
 *
 * ### Usage
 *
 * ```
 * import WordCloudModal from './components/WordCloudModal/WordCloudModal';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 * @requires 'react-wordcloud'
 * @requires 'prop-types'
 */
const WordCloudModal = ({ show, onHide, words }) => {

    const options = {
        fontSizes: [20, 80],
        scale: "sqrt", // log, linear
        spiral: "rectangular", //archimedean
        rotations: 1,
        rotationAngles: [0],
    };

    return (
        <MDBModal isOpen={show} toggle={onHide} size='lg' centered>
            <MDBModalBody className="vh-75">
                <ReactWordcloud words={words} options={options}/>
            </MDBModalBody>
            <MDBModalFooter className='text-right'>
                <MDBBtn color='primary' onClick={onHide}>
                    Close
                </MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    );
};

WordCloudModal.propTypes = {
    /**
     * boolean variable to toggle hide or show Modal
     */
    show: PropTypes.bool.isRequired,
    /**
     * function handler triggers when close Modal
     */
    onHide: PropTypes.func.isRequired,
};

export default WordCloudModal;
