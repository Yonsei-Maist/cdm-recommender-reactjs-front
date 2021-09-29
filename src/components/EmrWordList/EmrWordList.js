/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.29
 */
import React, { useState, useEffect } from "react";
import { MDBBtn, MDBBadge } from "mdbreact";
import Pagination from "react-js-pagination";
import WordCloudModal from "../WordCloudModal/WordCloudModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmrCdmRelationshipRequest,
  getSimilarWordsRequest,
  setPageNumberOfEmrWordList,
} from "../../actions/wordAction";

/**
 * Renders recommended CDM words list
 *
 * ### Usage
 *
 * ```
 * import EmrWordList from './components/EmrWordList/EmrWordList';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 * @requires react-bootstrap-4-pagination
 * @requires react-redux
 * @param {Function} useSelector the selector function that returns state.cdmWords: { data, isLoading, error }
 *
 * @example
 * return (
 *      <EmrWordList />
 * );
 */
const EmrWordList = () => {
  const PAGE_RANGE_DISPLAYED = 10;
  const NUMBER_OF_SYNONYMS_PER_EMR_WORD = 5;
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [words, setWords] = useState({});
  const [wordCloudModalshow, setWordCloudModalShow] = useState(false);

  const dispatch = useDispatch();
  const defaultsData = {
    recordCountPerPage: 0,
    totalRecordCount: 0,
    wordList: [],
  };
  const {
    data: { recordCountPerPage, totalRecordCount, wordList } = defaultsData,
    isLoading,
    error,
  } = useSelector((state) => state.word.emrCdmRelationship);
  const { pageNumberOfEmrWordList } = useSelector((state) => state.word);

  useEffect(() => {
    dispatch(getEmrCdmRelationshipRequest(pageNumberOfEmrWordList));
    setActivePage(pageNumberOfEmrWordList);
  }, [dispatch, pageNumberOfEmrWordList]);

  useEffect(() => {
    setTotalItemsCount(totalRecordCount);
    setItemsCountPerPage(recordCountPerPage);
  }, [totalRecordCount, recordCountPerPage]);

  const handleWordCloudModalClose = () => setWordCloudModalShow(false);
  const handleWordCloudModalShow = (synonymList) => {
    // To generate synonymList.length unique random numbers and store them to an array
    let arr = [];
    let count = 0;
    while (count < synonymList.length) {
      // random number between 1 and 100
      let randomNumber = Math.floor(Math.random() * 100) + 1;
      if (arr.indexOf(randomNumber) === -1) {
        arr.push({
          text: synonymList[count].word,
          value: randomNumber,
        });
        count++;
      }
    }
    setWords(arr);
    setWordCloudModalShow(true);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch(setPageNumberOfEmrWordList(pageNumber));
  };

  const renderEmrSynonyms = (synonymList) => {
    const out = [];
    const isOverLimit = synonymList.length > NUMBER_OF_SYNONYMS_PER_EMR_WORD;
    const count = isOverLimit
      ? NUMBER_OF_SYNONYMS_PER_EMR_WORD
      : synonymList.length;
    for (var i = 0; i < count; i++) {
      out.push(
        <MDBBadge
          key={i}
          pill
          color="transparent"
          className="p-2 mb-2 mr-2"
          style={{
            minWidth: "10vw",
          }}
          disabled
        >
          <span className="color-primary-dark font-weight-normal">
            {synonymList[i].word}
          </span>
        </MDBBadge>
      );
    }
    if (isOverLimit) {
      out.push(
        <MDBBtn
          key={i}
          color="transparent"
          className="p-0 blue-text text-capitalize"
          style={{
            boxShadow: "none",
          }}
          onClick={() => handleWordCloudModalShow(synonymList)}
        >
          <span className="color-primary-dark">Show All...</span>
        </MDBBtn>
      );
    }

    return out;
  };

  const handleOnClickEmrWord = (emrWordId) => {
    dispatch(getSimilarWordsRequest(emrWordId));
  };

  const renderEmrWordList = (wordList) => {
    const out = [];
    for (let i = 0; i < wordList.length; i++) {
      out.push(
        <div
          key={i}
          className="d-flex flex-row my-4 justify-content-start align-items-center"
        >
          <div className="text-center">
            <MDBBtn
              color="primary"
              style={{ width: "15em" }}
              onClick={() => handleOnClickEmrWord(wordList[i].id)}
            >
              {wordList[i].word}
            </MDBBtn>
          </div>
          <div className="flew-grow-1 px-2">
            {renderEmrSynonyms(wordList[i].synonym.synonymList)}
          </div>
        </div>
      );
    }

    return out;
  };

  return (
    <div className="d-flex flex-grow-1 flex-column">
      <h5 className="pt-2">EMR Word List</h5>
      <hr
        className="mx-1 my-1"
        style={{
          backgroundColor: "black",
          opacity: "0.2",
          height: "0.1em",
        }}
      />

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!isLoading && !error && wordList && wordList.length === 0 && (
        <p>Empty</p>
      )}
      {!isLoading && !error && wordList && wordList.length !== 0 && (
        <>
          <div
            className="flex-grow-1 pl-5"
            style={{
              height: "65vh",
              overflowY: "auto",
              marginBottom: "2em",
            }}
          >
            {renderEmrWordList(wordList)}
          </div>
          <Pagination
            activePage={activePage}
            totalItemsCount={totalItemsCount}
            itemsCountPerPage={itemsCountPerPage}
            pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            innerClass="pagination pg-blue justify-content-center"
          />
          <WordCloudModal
            words={words}
            show={wordCloudModalshow}
            onHide={handleWordCloudModalClose}
          />
        </>
      )}
    </div>
  );
};

export default EmrWordList;
