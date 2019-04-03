const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const todos = [
  {
    id: 0,
    title: 'Create GraphQL boilerplate',
    completed: true
  },
  {
    id: 1,
    title: 'Respond using a DB or another API',
    completed: false
  }
];

const todoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  })
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todos: {
      type: new GraphQLList(todoType),
      resolve: () => todos
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: todoType,
      args: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean }
      },
      resolve: (_, todo) => {
        todos.push(todo);
        return todo;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
