'use client'

import React, { useState } from 'react';
import Form from '@/components/Form';
import { Button, Col } from 'react-bootstrap';
import { addATask } from '../../api/TodoData';

const initialState = {
  text: '',
  active: true,
}

export default function Forms() {
  const [formInput, setFormInput] = useState(initialState);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
    };
    await addATask(payload);
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Col} md="6" controlId="validationName">
        <Form.Label>Task</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter tag name"
          name="name"
          value={formInput.text || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Finish</Button>
    </Form>
  );
 }
