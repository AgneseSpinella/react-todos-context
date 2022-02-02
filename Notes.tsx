import React, { useContext } from 'react';
import { ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import Note from './Note';
import { TodosContext } from './Context/store';
const uuid = require('uuid-v4');

export default () => {
  const {
    state: { todos },
    addTodos,
  } = useContext(TodosContext);

  const onType = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      addTodos({
        text: e.target.value,
        id: uuid(),
        done: false,
      });
      e.target.value = '';
    }
  };
  return (
    <div>
      <ListGroup as="ol" numbered>
        {todos.map((item) => (
          <Note key={item.id} note={item} />
        ))}
      </ListGroup>

      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Insert Note</InputGroup.Text>
        <FormControl
          onKeyDown={onType}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>

      <h2>Done</h2>
      <ListGroup as="ol" numbered>
        {todos
          .filter((todo) => todo.done === true)
          .map((todo) => (
            <Note key={todo.id} note={todo} />
          ))}
      </ListGroup>

      <h2>Undone</h2>
      <ListGroup as="ol" numbered>
        {todos
          .filter((todo) => todo.done !== true)
          .map((todo) => (
            <Note key={todo.id} note={todo} />
          ))}
      </ListGroup>
    </div>
  );
};
