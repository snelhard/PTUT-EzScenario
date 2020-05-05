import React from "react";
import { initEditor, jsoned, load } from "./rete/editor";

// import "./styles.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editorContainer = React.createRef();
  }

  componentDidMount() {
    console.log("didMount");
    initEditor(this.editorContainer.current);
  }

  componentWillUnmount() {
    console.log("unmounting");
  }

  render() {
    return (
      <div>
        <h1>Editor</h1>
        <button onClick={() => jsoned()}>EXPORT</button>
        <button onClick={() => load()}>LOAD</button>
        <div className="editor">
          <div ref={this.editorContainer} />
        </div>
      </div>
    );
  }
}

export default Editor;