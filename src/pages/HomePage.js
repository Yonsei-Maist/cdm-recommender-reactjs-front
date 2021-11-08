/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.29
 */
import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBInput,
  MDBAlert,
} from "mdbreact";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import CdmWordList from "../components/CdmWordList/CdmWordList";
import LoadDataModal from "../components/LoadDataModal/LoadDataModal";
import EditorWithMarkedWordFeature from "../components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature";
import EmrWordAddForm from "../components/EmrWordAddForm/EmrWordAddForm";
import {
  getDocListRequest,
  getDocDetailsRequest,
  setSaveDocRequest,
} from "../actions/docAction";

/**
 * Renders HomePagelication Component
 *
 * ### Usage
 *
 * ```
 * import HomePage from './HomePage';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 * @requires react-redux
 * @requires '../components/CdmWordList/CdmWordList'
 * @requires '../components/LoadDataModal/LoadDataModal'
 * @requires '../components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature'
 * @requires '../actions/docAction'
 * @param {Function} useDispatch the dispatch function that triggers an action
 * @param {Function} useSelector the selector function that returns state.userData.inputText
 * @param {Function} useState react useState hook for states: show
 */
const HomePage = () => {
  const [loadDataModalshow, setLoadDataModalShow] = useState(false);
  const [saveModalShow, setSaveModalShow] = useState(false);
  //this hook allows us to access the dispatch function
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);
  const saveDoc = useSelector((state) => state.doc.saveDoc);
  const { isEnableWordAddMode, selectedEmrWord } = useSelector(
    (state) => state.word
  );

  useEffect(() => {
    if (saveDoc.error) {
      formik.setErrors({ server: `Something's wrong: ${saveDoc.error}` });
    } else {
      if (saveDoc.data && saveDoc.data.result === "success") {
        // Close modal
        toggleModalSave();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveDoc]);

  const toggleModalSave = () => {
    setSaveModalShow(!saveModalShow);
    // reset formik errors
    formik.setErrors({});
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required.";
    }
    if (content && content.arr_words.length === 0) {
      errors.content = "There is no content to be saved.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validate,
    onSubmit: (values) => {
      //TODO: replace userId with userId login from redux state
      const userId = "doctor1";
      const title = values.title;
      dispatch(
        setSaveDocRequest({
          userId,
          title,
          content,
        })
      );
    },
  });

  const submitSaveHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    formik.handleSubmit(event.target.values);
  };

  /**
   * @method
   * @memberof HomePage
   */
  const handleLoadDataModalClose = () => setLoadDataModalShow(false);
  /**
   * @method
   * @memberof HomePage
   */
  const handleLoadDataModalShow = () => setLoadDataModalShow(true);
  /**
   * @method
   * @memberof HomePage
   */
  const handleOnDoubleClickLoadDataItem = (docId) => {
    dispatch(getDocDetailsRequest(docId));
    handleLoadDataModalClose();
  };

  /**
   * @method
   * @memberof HomePage
   */
  const handleOnClickLoadButton = () => {
    dispatch(getDocListRequest());
    handleLoadDataModalShow();
  };

  return (
    <>
      <MDBContainer className="my-4 d-flex flex-column px-0">
        <div className="flex-grow-1 d-flex flex-row flex-wrap">
          <div className="flex-grow-1 d-flex flex-column px-0">
            <h3 className="text-center mb-lg-n4">CDM Recommender System</h3>
            <div className="d-flex flex-row justify-content-between my-2">
              <MDBBtn color="primary" onClick={handleOnClickLoadButton}>
                Load
              </MDBBtn>
              <MDBBtn color="primary" onClick={toggleModalSave}>
                Save
              </MDBBtn>
              <MDBModal isOpen={saveModalShow} toggle={toggleModalSave}>
                <MDBModalHeader
                  className="text-center"
                  titleClass="w-100 font-weight-bold"
                  toggle={toggleModalSave}
                >
                  Save Data
                </MDBModalHeader>
                <MDBModalBody>
                  <form
                    className="mx-3 grey-text needs-validation"
                    onSubmit={submitSaveHandler}
                    noValidate
                  >
                    {formik.errors.title ? (
                      <MDBAlert color="danger">{formik.errors.title}</MDBAlert>
                    ) : null}
                    {formik.errors.content ? (
                      <MDBAlert color="danger">
                        {formik.errors.content}
                      </MDBAlert>
                    ) : null}
                    {formik.errors.server ? (
                      <MDBAlert color="danger">{formik.errors.server}</MDBAlert>
                    ) : null}
                    <MDBInput
                      label="Enter the title for your save data"
                      icon="tag"
                      type="text"
                      name="title"
                      className={formik.errors.title ? "invalid" : ""}
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      required
                    />
                    <div className="text-center">
                      <MDBBtn color="primary" type="submit">
                        Save
                      </MDBBtn>
                    </div>
                  </form>
                </MDBModalBody>
              </MDBModal>
            </div>
            <div
              className="flex-grow-1 d-flex flex-column mx-0 overflow-auto border border-primary rounded"
              style={{
                minHeight: "40vh",
                maxHeight: "90vh",
                minWidth: "100%",
                maxWidth: "fit-content",
              }}
            >
              <EditorWithMarkedWordFeature />
            </div>
          </div>
          <MDBCard
            className="flex-grow-1 flex-md-grow-0 ml-md-2 mt-3 mt-lg-0 px-3"
            style={{ minHeight: "30vh", minWidth: "25vw" }}
          >
            {!isEnableWordAddMode && <CdmWordList />}
            {isEnableWordAddMode && <EmrWordAddForm />}
          </MDBCard>
        </div>
      </MDBContainer>

      <LoadDataModal
        show={loadDataModalshow}
        onHide={handleLoadDataModalClose}
        handleOnDoubleCLick={handleOnDoubleClickLoadDataItem}
      />
    </>
  );
};

export default HomePage;
