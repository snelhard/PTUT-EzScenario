import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
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
      <Form onSubmit={this.handleSubmit} style={{ width: '800px' }}>
        <FormGroup>
          <Label for="name">Nom : </Label>
          <Input
            type="text"
            name="name"
            onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="Email">Email : </Label>
          <Input
            type="email"
            name="email"
            onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="Objet">Objet : </Label>
          <Input
            type="text"
            name="objet"
            onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="name">Message : </Label>
          <Input
            type="textarea"
            name="message"
            onChange={this.handleChange} />
        </FormGroup>

        <Button>Envoyer</Button>
      </Form >
    );
  }

}

export default Contact;
