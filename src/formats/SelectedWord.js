import { Quill } from "react-quill";
import { v4 } from "uuid";

const Inline = Quill.import("blots/inline");
export class SelectedWord extends Inline {
  /**
   * This static function generates a DOM Node for the Blot.
   * It will generate a DOM Node with the provided tagName and className.
   * This is not a good place to set listeners because you can't save a reference to them anywhere to remove them.
   * Don't call this function directly. Use parchment.create(blotName): Blot instead.
   * @param {Any} value
   */
  static create(value) {
    const id = v4();
    const { color = "white", backgroundColor } = value;
    let node = super.create(value);
    node.setAttribute("data-id", id);
    node.style.backgroundColor = backgroundColor;
    node.style.color = color;
    node.dataset.id = id;
    node.dataset.name = "SelectedWord";
    node.dataset.color = color;
    node.dataset.backgroundColor = backgroundColor;

    return node;
  }

  /**
   * when call blot.formats() or getFormat() of the quill of react-quill
   * Returns format values represented by domNode if it is this Blot's type
   * No checking that domNode is this Blot's type is required.
   * @param {*} node
   */
  static formats(node) {
    if (node.dataset.name === "SelectedWord") {
      const selectedWord = {
        id: node.dataset.id,
        color: node.dataset.color,
        backgroundColor: node.dataset.backgroundColor,
      };

      return selectedWord;
    }
  }
}

SelectedWord.blotName = "selectedWord";
