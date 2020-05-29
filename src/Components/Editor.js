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
      <div className="editorWindow">
        <div className="toolBar">
          <button onClick={() => exportEditorData()}><i class="fas fa-file-download"></i>Exporter</button>
          <button onClick={() => saveEditorData()}><i class="fas fa-save"></i>Sauvegarder</button>
          {/* <input type="file" onChange={loadEditorData} accept=".json" /> */}
          <input className="hideme" id="upload" name="upload" type="file" onChange={loadEditorData} accept=".json"/>
          <label for="upload" className="custom-file-upload"><i class="fas fa-file-upload"></i>Importer</label>

          <button onClick={() => resetEditor()}><i class="fas fa-trash-alt"></i>Effacer</button>
        </div>
        {/* <h1>Bienvenue dans l'éditeur d'histoire</h1> */}
        {/* <hr class="divider light my-4"></hr> */}
        {/* <h1>Éditeur</h1> */}
        
        <div className="editor">
          <div ref={this.editorContainer} />
        </div>
      </div>
    );
  }
}

export default Editor;