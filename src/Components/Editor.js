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
      <h1 class="main-title">Bienvenue dans l'éditeur d'histoire</h1>
      <hr class="divider light my-4"></hr>
      <h1>Éditeur</h1>
      <button onClick={() => exportEditorData()}>Exporter</button>
      <button onClick={() => saveEditorData()}>Sauvegarder</button>
      <input type="file" onChange={loadEditorData} accept=".json" />
      {/* <input id="upload" name="upload" type="file" onChange={loadEditorData} accept=".json"/>
      <label for="upload" className="custom-file-upload"> IMPORTER HISTOIRE  </label> */}
      <button onClick={() => resetEditor()}>Effacer</button>
      <div className="editor">
        <div ref={this.editorContainer} />
      </div>
      </div>
    );
  }
}

export default Editor;