const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} = require('graphql');
const todosApiService = require('./todos-api-service');
const usersApiService = require('./users-api-service');

const todoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    user: {
      type: userType,
      resolve: ({ userId }) => usersApiService.getById(userId)
    }
  })
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    todos: {
      type: new GraphQLList(todoType),
      args: {
        completed: { type: GraphQLBoolean },
        limit: { type: GraphQLInt }
      },
      resolve: ({ id: userId }) => todosApiService.get({ userId })
    }
  })
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todos: {
      type: new GraphQLList(todoType),
      resolve: () => todosApiService.get()
    },
    todo: {
      type: todoType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (__, { id }) => todosApiService.getById(id)
    },
    users: {
      type: new GraphQLList(userType),
      resolve: () => usersApiService.get()
    },
    user: {
      type: userType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (__, { id }) => usersApiService.getById(id)
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateTodo: {
      type: todoType,
      args: {
        id: { type: GraphQLInt },
        completed: { type: GraphQLBoolean }
      },
      resolve: (_, { id, completed }) =>
        todosApiService.update(id, { completed })
    }
  }
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
