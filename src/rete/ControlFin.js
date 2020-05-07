import React from "react";
import { Control } from "rete";

class MyReactControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      name: this.props.name
      //contenu: this.props.contenu
    });
    console.log(this.props);
    this.props.putData(this.props.id, this.props.titre);
  }
  onChange(event) {
    this.props.putData(this.props.id, event.target.value);
    this.props.emitter.trigger("process");
    this.setState({
      name: event.target.value
    });
    console.log(this.state.name);   
    this.update();
  }
  update(){
    console.log("this is  update");
    this.props.putData("text",this.state.name);
    this.props.emitter.trigger('process');
  }

  render() {
    return (
      <div>
      <p> Titre   <input value={this.state.name} onChange={this.onChange.bind(this)} /> </p>
      <p> Contenu <input value={this.state.contenu} onChange={this.onChange.bind(this)} /> </p>
      </div>
    );
  }
}

export class MyControlFin extends Control {
  constructor(emitter, key, name) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.props = {
      emitter,
      id: key,
      name,
     // putData:() => this.putData("texte",this.props.name)
      putData: (id,data) => this.putData(id, data)
    };
  }
}
