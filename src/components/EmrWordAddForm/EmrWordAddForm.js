import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import Select from "react-select";
import { useSelector } from "react-redux";

const EmrWordAddForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEnableAddButton, setIsEnableAddButton] = useState(false);
  const { selectedEmrWord } = useSelector((state) => state.word);

  useEffect(() => {
    setIsEnableAddButton(
      selectedEmrWord && selectedEmrWord.words && selectedOption
    );
  }, [selectedEmrWord, selectedOption]);

  const options = [
    { label: "cold", value: "cdmId 01" },
    { label: "fever", value: "cdmId 02" },
    { label: "heart", value: "cdmId 03" },
    { label: "pain", value: "cdmId 04" },
  ];

  const handleOnChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };

  const handleOnClickButtonAdd = () => {
    console.log(selectedEmrWord.words, selectedOption);
  };

  return (
    <div className="d-flex flex-grow-1 flex-column h-100 pb-3">
      <h5 className="text-center pt-2">EMR Word Add Form</h5>
      <hr
        className="mx-1 my-1"
        style={{
          backgroundColor: "black",
          opacity: "0.2",
          height: "0.1em",
        }}
      />
      <form>
        <div
          className="grey-text"
          title="Select EMR words to add from text editor."
        >
          <MDBInput
            label="EMR Word"
            outline
            type="text"
            disabled
            value={(selectedEmrWord && selectedEmrWord.words) || ""}
          />
          <Select
            value={selectedOption}
            onChange={handleOnChangeSelect}
            isSearchable={true}
            options={options}
          />
        </div>
        <div
          className="text-center"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, -10%)",
          }}
        >
          <MDBBtn
            color="primary"
            disabled={!isEnableAddButton}
            onClick={handleOnClickButtonAdd}
          >
            Add
          </MDBBtn>
        </div>
      </form>
    </div>
  );
};

export default EmrWordAddForm;
