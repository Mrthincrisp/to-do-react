const endpoint = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

const addATask = async (payload) => {
  const post = await fetch(`${endpoint}/Todo.json`, {
        method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = post.json();
  return response;
  }

const getFinishedList = async () => {
  const read = await fetch (`${endpoint}/Todo.json?orderBy="active"&equalTo=false`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await read.json();
  return Object.values(response);
};

const getActiveList = async () => {
  const read = await fetch (`${endpoint}/Todo.json?orderBy="active"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await read.json();
  return Object.values(response);
};

const updateTodo = async (firebaseKey) => {
  const getTodo = await fetch(`${endpoint}/Todo/${firebaseKey}.json`);
  const todo = await getTodo.json();
  const updatedActive = !todo.active;  

  const patch = await fetch(`${endpoint}/Todo/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      active: updatedActive, 
    }),
  });
  const response = await patch.json();
  return response;
};

const patchTask = async (firebaseKey, payload) => {
  const patch = await fetch(`${endpoint}/Todo/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = await patch.json();
  return response;
};

const deleteTask = async (firebaseKey) => {
  const del = await fetch(`${endpoint}/Todo/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await del.json();
  return response;
};

export {
  addATask,
  getActiveList,
  getFinishedList,
  updateTodo,
  deleteTask,
  patchTask,
}
