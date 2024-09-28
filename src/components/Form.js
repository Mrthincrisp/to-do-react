'use client'

import { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Col, Form } from "react-bootstrap";

const initialState = {
  text: '',
  active: true,
}

export default function TaskForm({ handleSubmit }) {
  const [formInput, setFormInput] = useState(initialState);  

 const onSubmit = (e) => {
  e.preventDefault();
  handleSubmit(formInput);
  setFormInput(initialState);
 }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group as={Col} md="6" controlId="validationName">
        <Form.Label>Create a new Task</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter a Task"
          name="text"
          value={formInput.text || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Button style={{ margin: "5px"}} type="submit">Finish</Button>
    </Form>
  );
 }

 TaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
