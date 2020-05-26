import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
/*import 'bootstrap/dist/css/bootstrap.css';*/
import '../contact.css';
import axios from 'axios';

class Contact extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      objet: '',
      message: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { name, email, objet, message } = this.state;

    const form = await axios.post('api/form', {
      name,
      email,
      objet,
      message
    })
  }

  render() {
    return (
      <div>
        <h1>Contactez-nous</h1>
        <Form id="form" onSubmit={this.handleSubmit} style={{ width: '800px' }}>
          <FormGroup>
            <Label id="labels" for="name">Nom : </Label>
            <Input
              id="input"
              type="text"
              name="name"
              onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label id="labels" for="Email">Email : </Label>
            <Input
              id="input"
              type="email"
              name="email"
              onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label id="labels" for="Objet">Objet : </Label>
            <Input
              id="input"
              type="text"
              name="objet"
              onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label id="labels" for="name">Message : </Label>
            <Input
              id="input"
              type="textarea"
              name="message"
              onChange={this.handleChange} />
          </FormGroup>

          <Button id="bouton">Envoyer</Button>
        </Form >
      </div>
    );
  }

}

export default Contact;