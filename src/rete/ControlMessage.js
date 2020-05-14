import React from "react";
 import { Control } from "rete";


class MyReactControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      texte: this.props.getData('texte')
      //contenu: this.props.contenu
    });
  }
  onChange(event) {
    let target = event.target.name;
    let value = event.target.value;
    console.log(target + " " + value)
    this.update(target, value);
  }
  update(target, value){
    this.setState({
      [target]: value
    }, () => this.props.putData(target, value));
  }

  render() {
    return (
      <div style={{color: "white  "}}> 
      <label>Texte</label><input value={this.state.texte} name="texte" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/><br/>
      </div>
    );
  }
}

export class MyControlMessage extends Control {
  constructor(emitter, key, titre, texte, enigme, reponse) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.props = {
      emitter,
      id: key,
      texte,
     // putData:() => this.putData("texte",this.props.name)
      putData: (id,data) => this.putData(id, data),
      getData: (field) => this.getData(field)
    };
  }
}
