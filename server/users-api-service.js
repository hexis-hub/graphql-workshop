const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let users = [
  {
    id: 1,
    name: 'Matheus Paiva',
    jobTitle: 'developer'
  },
  {
    id: 2,
    name: 'Bob Big Boss',
    jobTitle: 'ceo'
  }
];

const get = async (ids = []) => {
  await sleep(100);

  if (ids.length) {
    return users.filter(({ id }) => ids.includes(id));
  }

  return users;
};

const getById = async id => {
  await sleep(100);

  return users.find(item => item.id === id);
};

const create = async data => {
  await sleep(100);

  users.push(data);

  return data;
};

const update = async (id, data) => {
  const todo = users.find(item => item.id === id);
  const newTodo = Object.assign(todo, data);

  return newTodo;
};

const remove = async id => {
  users = users.filter(todo => todo.id !== id);

  return true;
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove
};
