import {useRef } from "react";
import "../text-editor.css";

const ContentEditable = ({ html, onChange, placeholder }) => {
  const editorRef = useRef(null);



  const getCaretPosition = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length; // Cursor position in text
  };

  const setCaretPosition = (pos) => {
    const node = editorRef.current;
    const selection = window.getSelection();
    const range = document.createRange();
    
    let currentPos = 0;
    let found = false;
    
    const traverseNodes = (node) => {
      if (found) return;
      if (node.nodeType === 3) {
        const nextPos = currentPos + node.length;
        if (pos <= nextPos) {
          range.setStart(node, pos - currentPos);
          range.setEnd(node, pos - currentPos);
          found = true;
        }
        currentPos = nextPos;
      } else {
        for (const child of node.childNodes) {
          traverseNodes(child);
        }
      }
    };

    traverseNodes(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleInput = () => {
    const caretPos = getCaretPosition(); 
    const updatedHtml = editorRef.current.innerHTML;
    onChange(updatedHtml);
    setTimeout(() => setCaretPosition(caretPos), 0);
  };

  const formatText = (command, value = null,event) => {
    if (event) event.preventDefault();
    document.execCommand(command, false, value);
    handleInput();
  };

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        <button type="button" onClick={() => formatText("bold")}>B</button>
        <button type="button" onClick={() => formatText("italic")}>I</button>
        <button type="button" onClick={() => formatText("underline")}>U</button>

        <select onChange={(e) => formatText("fontName", e.target.value,e)}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>        <select onChange={(e) => formatText("formatBlock", `h${e.target.value}`,e)}>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
      </div>

      {/* Editable Content */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: html }}
        onInput={handleInput}
        className="editable"
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default ContentEditable;
