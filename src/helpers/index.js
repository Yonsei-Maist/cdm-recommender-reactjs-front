/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */

/**
 * @category Helpers
 * @module helpers
 */

/**
 * @function
 * @description
 * highlight text with onClickHandler method on onclick event
 *
 * @param {string} text
 * @param {*} onClickHandler
 *
 * @returns {string} text to highlight
 *
 * @example
 * const text = 'cold';
 * const markedText = addMarkTagWithOnClickHandler(text, keywords, 'alert');
 * // <mark onclick="alert('cold')">cold</mark>
 */
export const highlightTextWithOnClickHandler = (text, onClickHandler) => {
  return `<mark onclick="${onClickHandler}('${text}')">${text}</mark>`;
};

/**
 * @function
 * @description
 * Add mark tag to text with alert method on onclick event by giving a list of keywords
 *
 * @param {string} text
 * @param {Array} keywords
 *
 * @returns {string} text with mark tags
 *
 * @example
 * const keywords = ['cold', 'patient'];
 * const text = 'In my opinion, this patient have cold and .....';
 * const markedText = addMarkTag(text, keywords); // In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....
 *
 */
export const addMarkTag = (text, keywords) => {
  const START_REGEX_STR = "(?<!\\S<mark.*)\\b(";
  const END_REGEX_STR = ")\\b(?!.*\\Smark>)";
  const newKeywords = keywords.map((keyword) => {
    return START_REGEX_STR + keyword + END_REGEX_STR;
  });
  const markedText = text
    .trim()
    .replace(
      new RegExp(newKeywords.join("|"), "g"),
      `<mark onclick="alert('$&')">$&</mark>`
    );

  return markedText;
};

/**
 * @function
 * @description
 * Add mark tag to text with onClickHandler method on onclick event by giving a list of keywords
 *
 * @param {string} text
 * @param {Array} keywords
 * @param {*} onClickHandler
 *
 * @returns {string} text with mark tags
 *
 * @example
 * const keywords = ['cold', 'patient'];
 * const text = 'In my opinion, this patient have cold and .....';
 * const markedText = addMarkTagWithOnClickHandler(text, keywords, 'alert');
 * // In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....
 *
 */
export const addMarkTagWithOnClickHandler = (
  text,
  keywords,
  onClickHandler
) => {
  const START_REGEX_STR = "(?<!\\S*<mark)\\b(";
  const END_REGEX_STR = ")\\b(?!\\S*mark>)";
  const newKeywords = keywords.map((keyword) => {
    return START_REGEX_STR + keyword + END_REGEX_STR;
  });
  const markedText = text.replace(
    new RegExp(newKeywords.join("|"), "g"),
    `<mark onclick="${onClickHandler}('$&')">$&</mark>`
  );

  return markedText;
};

/**
 * @function
 * @description
 * Remove all mark tags from text
 *
 * @param {string} text
 *
 * @returns {string} text without mark tags
 *
 * @example
 * const text = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....`;
 * const removeMarkTagText = removeMarkTag(text); // In my opinion, this patient have cold and .....
 */
export const removeMarkTag = (text) => {
  return text.replace(/<mark.*?>(?<innerText>.*?)<\/mark>/g, "$<innerText>");
};

/**
 * @function
 * @description
 * Remove the last mark tag from text
 *
 * @param {string} text
 *
 * @returns {string} text without the last mark tag
 */
export const removeLastMarkTag = (text) => {
  let out = text;
  let lastOccurrence = {};
  let result = {};
  let regexp = /<mark.*?>(?<innerText>.*?)<\/mark>/g;

  while ((result = regexp.exec(text))) {
    lastOccurrence.value = result[0];
    lastOccurrence.index = result.index;
  }

  if (lastOccurrence.value) {
    out = replaceLast(
      lastOccurrence.value,
      removeMarkTag(lastOccurrence.value),
      text
    );
  }

  return out;
};

/**
 * @function
 * @description
 * Find the last words and replace it by other words from text
 *
 * @param {string} find words to find inside a text
 * @param {string} replace words to replace the found words
 * @param {string} string text
 *
 * @returns {string} text without the last mark tag
 */
const replaceLast = (find, replace, string) => {
  var lastIndex = string.lastIndexOf(find);

  if (lastIndex === -1) {
    return string;
  }

  var beginString = string.substring(0, lastIndex);
  var endString = string.substring(lastIndex + find.length);

  return beginString + replace + endString;
};

/**
 * @function
 * @description
 * Get the caret position from an element
 *
 * @param {Object} el DOM element
 *
 * @returns {number} caret position
 */
export const getCaretPosition = (el) => {
  var caretOffset = 0;
  var doc = el.ownerDocument || el.document;
  var win = doc.defaultView || doc.parentWindow;
  var sel;
  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(el);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type !== "Control") {
    var textRange = sel.createRange();
    var preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(el);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
};

/**
 * @function
 * @description
 * Move caret to a specific point of the text in a DOM element.
 * nodeName: "#text", nodeType: 3.
 *
 * @param {Object} el DOM element
 * @param {number} pos position to put the caret
 *
 * @returns {number} caret position because of recursion stuff
 */
export const setCaretPosition = (el, pos) => {
  // Loop through all child nodes
  for (var node of el.childNodes) {
    if (node.nodeType === 3) {
      // we have a text node
      if (node.length >= pos) {
        // finally add our range
        var range = document.createRange(),
          sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1; // we are done
      } else {
        pos -= node.length;
      }
    } else {
      pos = setCaretPosition(node, pos);
      if (pos === -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return pos; // needed because of recursion stuff
};

/**
 * @function
 * @description
 * Move caret to a specific point of the text in a DOM element by div element.
 * tagName: "MARK", nodeName: "MARK", nodeType: 1;
 * nodeName: "#text", nodeType: 3;
 * tagName: "DIV", nodeName: "DIV", nodeType: 1 (when user hits enter key);
 *
 * @param {Object} el DOM element
 * @param {number} pos position to put the caret
 *
 * @returns {number} caret position because of recursion stuff
 */
export const setCaretPositionByDiv = (el, pos) => {
  // Loop through all child nodes
  for (var node of el.childNodes) {
    if (node.nodeType === 1 && node.nodeName === "DIV") {
      // we have a text node
      if (node.length >= pos) {
        // finally add our range
        var range = document.createRange(),
          sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1; // we are done
      } else {
        pos -= node.length;
      }
    } else {
      pos = setCaretPositionByDiv(node, pos);
      if (pos === -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return pos; // needed because of recursion stuff
};
