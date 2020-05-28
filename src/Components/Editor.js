import React from "react";
import '../App.css';
import { initEditor, exportEditorData, loadEditorData, saveEditorData, resetEditor} from "../rete/editor";
import { read } from "fs";

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
    localStorage.setItem('Current',"");
  }

  render() {
    return (
      <div>
      <h1>Bienvenue dans l'éditeur d'histoire</h1>
      <hr class="divider light my-4"></hr>
      <button onClick={() => exportEditorData()}>EXPORT</button>
      <button onClick={() => saveEditorData()}>SAVE</button>
      <input type="file" onChange={loadEditorData} accept=".json" />
      <button onClick={() => resetEditor()}>CLEAR</button>
      <div className="editor">
        <div ref={this.editorContainer} />
      </div>
      </div>
    );
  }
}

export default Editor;