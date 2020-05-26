import React from "react";
// import { Control } from "rete";
import Rete from "rete";

class MyReactControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      titre: this.props.getData('titre'),
      texte: this.props.getData('texte'),
      question: this.props.getData('question'),
      choix1: this.props.getData('choix1'),
      check1: this.props.getData('check1'),
      choix2: this.props.getData('choix2'),
      check2: this.props.getData('check2'),
      choix3: this.props.getData('choix3'),
      check3: this.props.getData('check3'),
      choix4: this.props.getData('choix4'),
      check4: this.props.getData('check4'),
    });
  }
  onChange(event) {
    let target = event.target.name;
    let value = event.target.value;
    console.log(target + " : " + value);
    this.update(target, value);
  }
  update(target, value){
    this.setState({
      [target]: value
    }, () => this.props.putData(target, value));
  }

  onChangeCheckbox(event) {
    let target = event.target.name;
    let value = !this.state[target]
    console.log("value = " + value);
    this.setState({
        [target]: value
      }, () => this.props.putData(target, value));
  }

  render() {
    return (
      <div style={{color: "white  "}}>
        <label>Titre</label><input value={this.state.titre} name="titre" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/><br/>
        <label>Texte</label><textarea name="texte" onChange={this.onChange.bind(this)} value={this.state.texte} style={{"minHeight": "80px", "width" : "100%"}}/><br/>
        <label>Question</label><input value={this.state.question} name="question" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/><br/>

    
        <label>Choix 1</label>
        <div style={{"width" : "100%" , "flexDirection": "row", "display": "flex" }}>
            <input value={this.state.choix1} name="choix1" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/>
            <input type="checkbox" name="check1" defaultChecked={this.state.check1} onChange={this.onChangeCheckbox.bind(this)} style={{"margin" : "auto", "marginLeft": "6px"}} /><br/>
        </div>
        
        <label>Choix 2</label>
        <div style={{"width" : "100%" , "flexDirection": "row", "display": "flex" }}>
            <input value={this.state.choix2} name="choix2" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/>
            <input type="checkbox" name="check2" defaultChecked={this.state.check2} onChange={this.onChangeCheckbox.bind(this)} style={{"margin" : "auto", "marginLeft": "6px"}}/><br/>
        </div>

        <label>Choix 3</label>
        <div style={{"width" : "100%" , "flexDirection": "row", "display": "flex" }}>
            <input value={this.state.choix3} name="choix3" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/>
            <input type="checkbox" name="check3" defaultChecked={this.state.check3} onChange={this.onChangeCheckbox.bind(this)} style={{"margin" : "auto", "marginLeft": "6px"}}/><br/>
        </div>

        <label>Choix 4</label>
        <div style={{"width" : "100%" , "flexDirection": "row", "display": "flex" }}>
            <input value={this.state.choix4} name="choix4" onChange={this.onChange.bind(this)} style={{"width" : "100%"}}/>
            <input type="checkbox" name="check4" defaultChecked={this.state.check4} onChange={this.onChangeCheckbox.bind(this)} style={{"margin" : "auto", "marginLeft": "6px"}}/><br/>
        </div>
      </div>
    );
  }
}

export class MyControlQcm extends Rete.Control {
  constructor(emitter, key, titre, texte, question, choix1, check1, choix2, check2, choix3, check3, choix4, check4) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.props = {
      emitter,
      id: key,
      titre,
      texte,
      question,
      choix1,
      check1,
      choix2,
      check2,
      choix3,
      check3,
      choix4,
      check4,
      putData: (id, data) => this.putData(id, data),
      getData: (field) => this.getData(field)
    };
  }
}
