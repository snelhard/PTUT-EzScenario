import React from "react";
import { initEditor , jsoned } from "./rete/editor";
import { render } from "@testing-library/react";

// import "./styles.css";

class Editor extends React.Component {

    // componentDidMount() {
    //     initEditor()
    // }
    componentWillUnmount(){
        console.log("unmounting");
    }

    render() {
        return (
            <div>
              <h1>Editor</h1>
              <button onClick={() => jsoned()}>EXPORT</button>
              <div className="editor">
                <div ref={el => initEditor(el)} />
              </div>
              {/* <button onClick={() => console.log(editor.toJSON())} /> */}
            </div>
        );
    }
  
}

export default Editor;