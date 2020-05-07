import React from "react";
// import { Control } from "rete";
import Rete from "rete";

class MyReactControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      titre: this.props.getData('titre'),
      texte: this.props.getData('texte'),
      choix1: this.props.getData('choix1'),
      choix2: this.props.getData('choix2')
    });
  }
  onChange(event) {
    // this.props.emitter.trigger("process");
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
        <label>Titre</label><input value={this.state.titre} name="titre" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/><br/>  
        {/* <label>Texte</label><input value={this.state.texte} name="texte" onChange={this.onChange.bind(this)} /><br/> */}
        <label>Texte</label><textarea name="texte" onChange={this.onChange.bind(this)} value={this.state.texte} style={{"minHeight": "80px", "width" : "100%"}}/><br/>
        <label>Choix 1</label><input value={this.state.choix1} name="choix1" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/><br/>
        <label>Choix 2</label><input value={this.state.choix2} name="choix2" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/>
      </div>
    );
  }
}

export class MyControl extends Rete.Control {
  constructor(emitter, key, titre, texte, choix1, choix2) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.props = {
      emitter,
      id: key,
      titre,
      texte,
      choix1,
      choix2,
      putData: (id, data) => this.putData(id, data),
      getData: (field) => this.getData(field)
      // putData: () => this.putData.apply(this, arguments)
    };
  }
}
