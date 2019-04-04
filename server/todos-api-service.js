const { isBoolean, isInteger } = require('lodash');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let todos = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 2,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false
  },
  {
    userId: 2,
    id: 4,
    title: 'et porro tempora',
    completed: true
  },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false
  },
  {
    userId: 2,
    id: 6,
    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
    completed: false
  },
  {
    userId: 1,
    id: 7,
    title: 'illo expedita consequatur quia in',
    completed: false
  },
  {
    userId: 2,
    id: 8,
    title: 'quo adipisci enim quam ut ab',
    completed: true
  },
  {
    userId: 1,
    id: 9,
    title: 'molestiae perspiciatis ipsa',
    completed: false
  },
  {
    userId: 2,
    id: 10,
    title: 'illo est ratione doloremque quia maiores aut',
    completed: true
  },
  {
    userId: 1,
    id: 11,
    title: 'vero rerum temporibus dolor',
    completed: true
  },
  {
    userId: 1,
    id: 12,
    title: 'ipsa repellendus fugit nisi',
    completed: true
  },
  {
    userId: 2,
    id: 22,
    title: 'distinctio vitae autem nihil ut molestias quo',
    completed: true
  },
  {
    userId: 2,
    id: 23,
    title: 'et itaque necessitatibus maxime molestiae qui quas velit',
    completed: false
  }
];

const get = async (filters, limit) => {
  await sleep(100);

  let response = todos;

  if (filters) {
    const { userId, completed } = filters;

    response = todos.filter(todo => {
      const isUser = todo.userId === userId;
      const isCompleted = todo.completed === completed;

      return (
        (isInteger(userId) ? isUser : true) &&
        (isBoolean(completed) ? isCompleted : true)
      );
    });
  }

  return response.slice(0, limit || response.length);
};

const getById = async id => {
  await sleep(100);

  return todos.find(item => item.id === id);
};

const create = async data => {
  await sleep(100);

  todos.push(data);

  return todos;
};

const update = async (id, data) => {
  const todo = todos.find(item => item.id === id);
  const newTodo = Object.assign(todo, data);

  return newTodo;
};

const remove = async id => {
  todos = todos.filter(todo => todo.id !== id);

  return todos;
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove
};
