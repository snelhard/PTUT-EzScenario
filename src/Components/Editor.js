import React from "react";
import { initEditor, exportEditorData, loadEditorData, saveEditorData, resetEditor} from "../rete/editor";
import { read } from "fs";


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editorContainer = React.createRef();
  }

  componentDidMount() {
        //quand on arrive dans le composant ça initialise l'editeur si il y a un current
    initEditor(this.editorContainer.current);
  }

  componentWillUnmount() {
    //quand on quitte le composant ça vide le current
    localStorage.setItem('Current',"");
  }

  render() {
    //HTML
    return (
      <div>
        <h1>Bienvenue dans l'éditeur d'histoire</h1>
        <hr class="divider light my-4"></hr>
        <h1>Éditeur</h1>
        <button onClick={() => exportEditorData()}>Exporter</button>
        <button onClick={() => saveEditorData()}>Sauvegarder</button>
        <input type="file" onChange={loadEditorData} accept=".json" />
        <button onClick={() => resetEditor()}>Effacer</button>
        <div className="editor">
          <div ref={this.editorContainer} />
        </div>
      </div>
    );
  }
}

export default Editor;