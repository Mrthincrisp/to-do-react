'use client';

import { useEffect, useState } from 'react';
import { addATask, getActiveList, patchTask, updateTodo } from '../api/TodoData';
import ToDoCard from '../components/ToDoCard';
import TaskForm from '../components/Form';

function Home() {
  const [ todo, setTodo ] = useState([])
  const [refresh, setRefresh] = useState(false);
  
  const activeList = async () => {
    const data = await getActiveList();
    setTodo(data);
  }

  const handleUpdate = async (firebaseKey) => {
    await updateTodo(firebaseKey);
    setRefresh(!refresh);
  };

  const handleSubmit = async (formInput) => {
    const payload = {
      ...formInput,   
    };
    await addATask(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      patchTask(patchPayload.firebaseKey, patchPayload);
    });
    setRefresh(!refresh);
  };

  useEffect(() => {
    activeList();
  }, [refresh]);

  return (
    <>
        <TaskForm handleSubmit={handleSubmit} />
    {todo.map((i) => (
      <ToDoCard key={i.firebaseKey} toDoObj={i} update={handleUpdate} />
    ))}
    </>
  );
}

export default Home;
