import React from "react";
// import { Control } from "rete";
import Rete from "rete";

class MyReactControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      titre: this.props.titre,
      texte: this.props.texte,
      enigme: this.props.enigme,
      reponse: this.props.reponse
    });
  }
  onChange(event) {
    // this.props.emitter.trigger("process");
    let target = event.target.name;
    let value = event.target.value;
    console.log(target + " " + value)
    this.setState({
      [target]: value
    }, () => this.props.putData(target, value));
  }

  render() {
    return (
      <div style={{color: "white  "}}>
        <label>Titre</label><input value={this.state.titre} name="titre" onChange={this.onChange.bind(this)} /><br/>
        <label>Texte</label><input value={this.state.texte} name="texte" onChange={this.onChange.bind(this)} /><br/>
        {/* <textarea name="texte" onChange={this.onChange.bind(this)}>{this.state.texte}</textarea> */}
        <label>Enigme</label><input value={this.state.enigme} name="enigme" onChange={this.onChange.bind(this)} /><br/>
        <label>Reponse</label><input value={this.state.reponse} name="reponse" onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}

export class MyControlIntrigue extends Rete.Control {
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
      putData: (id, data) => this.putData(id, data)
      // putData: () => this.putData.apply(this, arguments)
    };
  }
}
