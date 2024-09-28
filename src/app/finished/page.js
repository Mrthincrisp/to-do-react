'use client';

import { useEffect, useState } from 'react';
import { deleteTask, getFinishedList, updateTodo } from '../../api/TodoData';
import ToDoCard from '../../components/ToDoCard';

export default function Events() {
  const [ todo, setTodo ] = useState([])
  const [refresh, setRefresh] = useState(false);
  
  const activeList = async () => {
    const data = await getFinishedList();
    setTodo(data);
  }

  const handleUpdate = async (firebaseKey) => {
    await updateTodo(firebaseKey);
    setRefresh(!refresh);
  };

  const handleDelete = async (firebaseKey) => {
    if(window.confirm("delete task?")) {
      await deleteTask(firebaseKey);
      setRefresh(!refresh)
    }
  }

  useEffect(() => {
    activeList();
  }, [refresh]);

  return (
    <>
    {todo.map((i) => (
      <ToDoCard key={i.firebaseKey} toDoObj={i} update={handleUpdate} remove={handleDelete}/>
    ))}
    </>
  );
}
