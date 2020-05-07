import React from "react";
 import { Control } from "rete";


class MyReactControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      titre: this.props.getData('titre'),
      texte: this.props.getData('texte'),
      enigme: this.props.getData('enigme'),
      reponse: this.props.getData('reponse')
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
      <label>Titre</label><input value={this.state.titre} name="titre" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/> <br/>
      <label>Texte</label><input value={this.state.texte} name="texte" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/><br/>
      <label>Enigme</label><input value={this.state.enigme} name="enigme" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/> <br/>
      <label>Reponse</label><input value={this.state.reponse} name="reponse" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/><br/>
      </div>
    );
  }
}

export class MyControlIntrigue extends Control {
  constructor(emitter, key, titre, texte, enigme, reponse) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.props = {
      emitter,
      id: key,
      titre,
      texte,
      enigme,
      reponse,
     // putData:() => this.putData("texte",this.props.name)
      putData: (id,data) => this.putData(id, data),
      getData: (field) => this.getData(field)
    };
  }
}
