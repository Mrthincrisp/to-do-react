'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

function ToDoCard({ toDoObj, update, remove }) {
  return (
    <Card className="my-2" body>
      {console.warn(toDoObj)}
      {toDoObj.text}
      <Button style={{ margin: '5px' }} variant="info" onClick={() => update(toDoObj.firebaseKey)}>{(toDoObj.active ? "Finish" : "Add")}</Button>
      {toDoObj.active ? '' : <Button onClick={()=>remove(toDoObj.firebaseKey)}>delete</Button>}
    </Card>
  );
}

ToDoCard.propTypes = {
  toDoObj: PropTypes.shape({
    text: PropTypes.string,
    firebaseKey: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default ToDoCard;
