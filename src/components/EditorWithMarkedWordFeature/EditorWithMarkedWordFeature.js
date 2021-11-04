/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.23
 */
import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import { MarkedWord } from "../../formats/markedWord";
import WordService from "../../api/WordService";
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "../../actions/contentAction";
import _ from "lodash";
import { ClassNames } from "@emotion/react";
import EnabledWordAddModeNotification from "../EnabledWordAddModeNotification/EnabledWordAddModeNotification";

import "quill/dist/quill.core.css";
import {
  getSimilarWordsSuccess,
  setResetChangeEmrWord,
  setIsEnableWordAddMode,
  setSelectedEmrWord,
} from "../../actions/wordAction";

Quill.register(
  {
    "formats/markedWord": MarkedWord,
  },
  true
);

const Delta = Quill.import("delta");

const EditorWithMarkedWordFeature = () => {
  const GET_SIMILAR_WORDS_TIMEOUT_WHEN_LOAD_OR_PAST_CONTENT = 0; // default is `0` (no timeout)
  const [editorHtml, setEditorHtml] = useState("");
  // Quill instance
  const [quillRef, setQuillRef] = useState(null);
  // ReactQuill component
  const [reactQuillRef, setReactQuillRef] = useState(null);

  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);
  const { changeEmrWord, isEnableWordAddMode } = useSelector(
    (state) => state.word
  );
  const resetChangeEmrWord = useSelector(
    (state) => state.word.resetChangeEmrWord
  );

  // change EMR word to CDM word
  useEffect(() => {
    if (quillRef === null) {
      return;
    }

    const { cdmWord, cdmWordsList, markedWord } = changeEmrWord;

    let {
      strText,
      emrWordId,
      emrWordStrText,
      retain: retainIndex,
    } = markedWord;

    // if cdmWordId === strText, do nothing
    if (cdmWord.detail.word === strText) {
      return;
    }

    const deleteLength = strText.length;
    // update markedWord
    markedWord.cdmWordId = cdmWord.cdmWordId;
    markedWord.strText = cdmWord.detail.word;
    markedWord.boolIsChanged = true;
    const verifiedLookupWords = [
      {
        // change back to emr word if cdmWordId === strText
        lookupWord: cdmWord.detail.word,
        emrWordId: emrWordId,
        emrWordStrText: emrWordStrText,
        boolIsChanged: markedWord.boolIsChanged,
        cdmWordId: markedWord.cdmWordId,
      },
    ];
    const newDelta = buildDelta(retainIndex, deleteLength, verifiedLookupWords);
    quillRef.updateContents(newDelta, Quill.sources.API);
    quillRef.setSelection(
      retainIndex + markedWord.strText.length,
      0,
      Quill.sources.API
    );
    // update content from quillRef.getContents()
    dispatch(setContent(buildContentByDelta(quillRef.getContents())));
    // update the cdm list
    const data = {
      emrWordId: emrWordId,
      cdmWordsList: cdmWordsList,
      markedWord,
    };
    dispatch(getSimilarWordsSuccess(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeEmrWord]);

  // reset change EMR word (change CDM word back to EMR word)
  useEffect(() => {
    if (quillRef === null || _.isEmpty(resetChangeEmrWord)) {
      return;
    }
    const { cdmWordsList, markedWord } = resetChangeEmrWord;

    let {
      strText,
      emrWordId,
      emrWordStrText,
      retain: retainIndex,
    } = markedWord;
    const deleteLength = strText.length;
    // update markedWord
    delete markedWord.cdmWordId;
    markedWord.strText = emrWordStrText;
    markedWord.boolIsChanged = false;
    const verifiedLookupWords = [
      {
        // change back to emr word if cdmWordId === strText
        lookupWord: emrWordStrText,
        emrWordId,
        emrWordStrText,
        boolIsChanged: markedWord.boolIsChanged,
      },
    ];
    const newDelta = buildDelta(retainIndex, deleteLength, verifiedLookupWords);
    quillRef.updateContents(newDelta, Quill.sources.API);
    quillRef.setSelection(
      retainIndex + markedWord.strText.length,
      0,
      Quill.sources.API
    );
    // update content from quillRef.getContents()
    dispatch(setContent(buildContentByDelta(quillRef.getContents())));
    // update the cdm list
    const data = {
      emrWordId: emrWordId,
      cdmWordsList: cdmWordsList,
      markedWord,
    };
    dispatch(getSimilarWordsSuccess(data));
    // set resetChangeEmrWord to {}
    dispatch(setResetChangeEmrWord({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetChangeEmrWord]);

  // useEffect on content from redux and quillRef
  useEffect(() => {
    (async () => {
      if (
        quillRef &&
        content &&
        !_.isEqual(buildContentByDelta(quillRef.getContents()), content)
      ) {
        const newDelta = await buildDeltaByContent(content);
        quillRef.setContents(newDelta, Quill.sources.API);
        quillRef.setSelection(quillRef.getText().length, 0, Quill.sources.API);
        // update content from quillRef.getContents()
        dispatch(setContent(buildContentByDelta(quillRef.getContents())));
        // reset the cdm list
        dispatch(getSimilarWordsSuccess({}));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, quillRef]);

  // useEffect on reactQuillRef
  useEffect(() => {
    if (
      reactQuillRef == null ||
      (reactQuillRef != null && typeof reactQuillRef.getEditor !== "function")
    ) {
      return;
    }
    setQuillRef(reactQuillRef.getEditor());
  }, [reactQuillRef]);

  // when load data, we get the saved content from redux.
  // Built delta by content for display the content in the editor
  const buildDeltaByContent = async (content) => {
    const text = quillRef.getText();
    const verifiedLookupWords = await verifyContent(content);
    const newDelta = buildDelta(0, text.length, verifiedLookupWords);

    return newDelta;
  };

  // return content -> to update the content of redux
  const buildContentByDelta = (delta) => {
    if (delta && delta.ops && delta.ops.length !== 0) {
      let cntCdm = 0;
      let cntEmr = 0;
      let arrWords = [];

      delta.ops.forEach((op, index) => {
        if (op.insert) {
          if (op.attributes && op.attributes.markedWord) {
            const { strText, emrWordId, boolIsChanged, cdmWordId } =
              op.attributes.markedWord;
            if (boolIsChanged) {
              cntCdm += 1;
              arrWords.push({
                str_text: strText,
                id_word_emr: emrWordId,
                bool_is_changed: boolIsChanged,
                id_word_cdm: cdmWordId,
              });
            } else {
              cntEmr += 1;
              arrWords.push({
                str_text: strText,
                id_word_emr: emrWordId,
                bool_is_changed: boolIsChanged,
              });
            }
          } else {
            let text = op.insert;
            // if last one, remove the last character (an ↵ of quill) from op.attributes.insert
            if (delta.ops.length === index + 1) {
              text = text.slice(0, -1);
            }
            const strTexts = text.match(/\w+|\s+|[^\s\w]+/g);
            if (strTexts) {
              strTexts.forEach((strText) => {
                arrWords.push({
                  str_text: strText,
                });
              });
            }
          }
        }
      });

      return {
        arr_words: arrWords,
        cnt_cdm: cntCdm,
        cnt_emr: cntEmr,
      };
    }
  };

  // return verifiedLookupWords object for buildDelta
  const verifyContent = async (content) => {
    return await Promise.all(
      content.arr_words.map(async (arrWord) => {
        const { str_text, id_word_emr, bool_is_changed, id_word_cdm } = arrWord;
        let lookupWord = id_word_emr ? id_word_emr : str_text;
        if (lookupWord.match(/\w+/)) {
          let searchWord;
          // check similarity of each word
          try {
            searchWord = await WordService.getSearchWord(
              lookupWord,
              GET_SIMILAR_WORDS_TIMEOUT_WHEN_LOAD_OR_PAST_CONTENT
            );
            if (searchWord && searchWord.data && searchWord.data.emrExists) {
              if (bool_is_changed) {
                return {
                  lookupWord: str_text,
                  emrWordId: searchWord.data.id,
                  emrWordStrText: searchWord.data.word,
                  boolIsChanged: bool_is_changed,
                  cdmWordId: id_word_cdm,
                };
              } else {
                return {
                  lookupWord: searchWord.data.word,
                  emrWordId: searchWord.data.id,
                  emrWordStrText: searchWord.data.word,
                  boolIsChanged: false,
                };
              }
            } else {
              return { lookupWord };
            }
          } catch (error) {
            return { lookupWord };
          }
        } else {
          return { lookupWord };
        }
      })
    );
  };

  // return verifiedLookupWords object for buildDelta
  const verifyLookupWords = async (lookupWords, isPastText = false) => {
    return await Promise.all(
      lookupWords.map(async (lookupWord) => {
        if (lookupWord.match(/\w+/)) {
          // check similarity of each word again and update the content
          try {
            const searchWord = await WordService.getSearchWord(
              lookupWord,
              isPastText
                ? GET_SIMILAR_WORDS_TIMEOUT_WHEN_LOAD_OR_PAST_CONTENT
                : undefined
            );
            if (searchWord && searchWord.data && searchWord.data.emrExists) {
              return {
                lookupWord,
                emrWordId: searchWord.data.id,
                emrWordStrText: searchWord.data.word,
                boolIsChanged: false,
              };
            } else {
              return { lookupWord };
            }
          } catch (error) {
            return { lookupWord };
          }
        } else {
          return { lookupWord };
        }
      })
    );
  };

  // buildDelta build with verifiedLookupWords for displaying content in the editor
  const buildDelta = (retainIndex, deleteLength, verifiedLookupWords) => {
    const newDelta = new Delta().retain(retainIndex).delete(deleteLength);
    verifiedLookupWords.forEach((lookupWordsObj) => {
      if (lookupWordsObj.emrWordId) {
        newDelta.insert(lookupWordsObj.lookupWord, {
          markedWord: {
            color: !!lookupWordsObj.boolIsChanged ? "darkgreen" : "#fb3",
            strText: lookupWordsObj.lookupWord,
            emrWordId: lookupWordsObj.emrWordId,
            emrWordStrText: lookupWordsObj.emrWordStrText,
            boolIsChanged: !!lookupWordsObj.boolIsChanged,
            cdmWordId: lookupWordsObj.cdmWordId,
            quillRef,
          },
        });
      } else {
        newDelta.insert(lookupWordsObj.lookupWord, {
          markedWord: false,
          background: false,
        });
      }
    });
    return newDelta;
  };

  const triggerOnChange = async (quillRef, lookupPhrase, isPastText) => {
    // remove format from lookup phrase
    quillRef.removeFormat(lookupPhrase.startIndex, lookupPhrase.words.length);

    // lookupWords array that contains:
    // + words & white space characters found from left side of the cursor position
    // + word found from right side of the cursor position
    const lookupWords = lookupPhrase.words.match(/\w+|\s+|[^\s\w]+/g);
    if (lookupWords) {
      const verifiedLookupWords = await verifyLookupWords(
        lookupWords,
        isPastText
      );
      const newDelta = buildDelta(
        lookupPhrase.startIndex,
        lookupPhrase.words.length,
        verifiedLookupWords
      );
      setImmediate(() => {
        quillRef.updateContents(newDelta, Quill.sources.API);
        // update content from quillRef.getContents()
        dispatch(setContent(buildContentByDelta(quillRef.getContents())));
      });
    }
  };

  const handleOnChange = async (content, delta, source, editor) => {
    setEditorHtml(content);
    dispatch(setContent(buildContentByDelta(quillRef.getContents())));

    if (quillRef === null) {
      return;
    }

    // when user pasts text -> editor.getSelection() is null
    const isPastText =
      source === Quill.sources.USER && editor.getSelection() == null;
    // when user insert or delete text
    // when insert the begining of the text area --> delta.ops.length === 1 && (delta.ops[0].insert || delta.ops[0].delete)
    // when insert or delete letter --> delta.ops.length === 2 && delta.ops[0].retain && (delta.ops[1].insert || delta.ops[1].delete)
    const isUserInput =
      source === Quill.sources.USER &&
      editor.getSelection() != null &&
      ((delta.ops.length === 1 &&
        (delta.ops[0].insert || delta.ops[0].delete)) ||
        (delta.ops.length === 2 &&
          delta.ops[0].retain &&
          (delta.ops[1].insert || delta.ops[1].delete)));

    // if the insert text is enter character
    const isEnterKeyPressed =
      delta.ops.length === 2 &&
      delta.ops[1].insert &&
      /\r|\n|\t$/.test(delta.ops[1].insert);

    const text = quillRef.getText();
    let cursorStartIndex;
    let cursorEndIndex;
    let lookupPhrase;
    // case 01: User pasts text
    if (isPastText) {
      cursorStartIndex = delta.ops[0].retain ? delta.ops[0].retain : 0;
      cursorEndIndex = delta.ops.reduce((accumulator, op) => {
        if (op.retain) {
          return (accumulator += op.retain);
        } else if (op.delete) {
          return (accumulator -= op.delete);
        } else {
          return (accumulator += op.insert.length);
        }
      }, 0);
      lookupPhrase = getLookupPhrase(text, cursorStartIndex, cursorEndIndex);
    }

    // case 02: User inputs text
    if (isUserInput) {
      cursorStartIndex = quillRef.getSelection().index;
      cursorEndIndex = cursorStartIndex;
      if (isEnterKeyPressed) {
        cursorEndIndex += 1;
      }
      lookupPhrase = getLookupPhraseOfMaxNWords(
        text,
        cursorStartIndex,
        cursorEndIndex
      );
    }

    if (lookupPhrase) {
      console.log("lookupPhrase: ", lookupPhrase);
      triggerOnChange(quillRef, lookupPhrase, isPastText);
    }
  };

  const handleOnChangeSelection = (range, source, editor) => {
    if (source === Quill.sources.USER && range != null && range.length !== 0) {
      const text = editor.getText();
      const cursorStartIndex = range.index;
      const cursorEndIndex = range.index + range.length;
      let selectedWord = text
        .substring(cursorStartIndex, cursorEndIndex)
        .trim();
      if (selectedWord) {
        console.log(">>>>>>>> selectedWord");
        console.log(selectedWord);
        dispatch(setSelectedEmrWord(selectedWord));
      }
    } else {
      dispatch(setSelectedEmrWord(""));
    }
  };

  /* ----------------------------- Custom Toolbar ----------------------------- */
  const handleSwitchChange = () => {
    dispatch(setIsEnableWordAddMode(!isEnableWordAddMode));
  };

  const CustomToolbar = () => (
    <div id="toolbar">
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customSwitchesChecked"
          checked={isEnableWordAddMode}
          onChange={handleSwitchChange}
        />
        <label className="custom-control-label" htmlFor="customSwitchesChecked">
          Word Add Mode
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex-grow-1">
      <CustomToolbar />
      <ClassNames>
        {({ css, cx }) => (
          <ReactQuill
            ref={(el) => {
              setReactQuillRef(el);
            }}
            /* className={cx(
              {
                [css`
                  & p::selection {
                    background: none;
                    user-selection: none;
                  }
                `]: !isEnableWordAddMode,
              },
              css`
                .ql-container {
                  font-size: 16px;
                }
              `
            )} */
            className={cx(
              css`
                .ql-container {
                  font-size: 16px;
                }
              `
            )}
            value={editorHtml}
            onChange={handleOnChange}
            onChangeSelection={
              isEnableWordAddMode ? handleOnChangeSelection : undefined
            }
            onBlur={undefined}
            theme={null}
          />
        )}
      </ClassNames>
      {isEnableWordAddMode && <EnabledWordAddModeNotification />}
    </div>
  );
};

export default EditorWithMarkedWordFeature;

export const getLookupPhrase = (text, cursorStartIndex, cursorEndIndex) => {
  let left = text.slice(0, cursorStartIndex).search(/\S+$/);
  let right = text.slice(cursorEndIndex).search(/\s/);
  let startIndex = left;
  let endIndex = right + cursorEndIndex;
  let words = text.slice(startIndex, endIndex);

  // when typing space, left == -1
  if (left === -1) {
    left = text.slice(0, cursorStartIndex).search(/\w*\s*$/);
    // when type in the begining of the input text area, left set to 0
    if (left === -1) {
      left = 0;
    }
    startIndex = left;
    //endIndex = left+right;
    words = text.slice(startIndex, endIndex);
  }

  let currentTypingWords = {
    startIndex,
    endIndex,
    words,
  };

  return currentTypingWords;
};

export const getLookupPhraseOfMaxNWords = (
  text,
  cursorStartIndex,
  cursorEndIndex,
  maxNumberOfWords = 3
) => {
  let currentTypingWords = null;
  let regex = new RegExp(`((\\s){0,1}(\\S+)){1,${maxNumberOfWords}}$`);
  let matches = regex.exec(text.slice(0, cursorStartIndex));
  if (matches) {
    let matchText = matches[0];
    let matchIndex = matches.index;
    let left = /\s/.test(matchText[0]) ? matchIndex + 1 : matchIndex;
    let right = text.slice(cursorEndIndex).search(/\s/);
    let startIndex = left;
    let endIndex = right + cursorEndIndex;
    let words = text.slice(startIndex, endIndex);

    currentTypingWords = {
      startIndex,
      endIndex,
      words,
    };
  }

  return currentTypingWords;
};
