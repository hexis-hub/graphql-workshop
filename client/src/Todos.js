import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import TodoList from './TodoList';

const GET_TODOS = gql`
  {
    todos {
      id
      title
      completed
      user {
        id
        name
        todos {
          completed
        }
      }
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const Todos = () => (
  <Query query={GET_TODOS}>
    {({ data: { todos = [] }, loading, error }) => (
      <Mutation mutation={UPDATE_TODO} refetchQueries={[{ query: GET_TODOS }]}>
        {(updateTodo, { loading: isUpdating }) => {
          const isLoading = loading || isUpdating;

          return (
            <TodoList
              isLoading={isLoading}
              error={error}
              dataSet={todos}
              onUpdateOne={variables => updateTodo({ variables })}
            />
          );
        }}
      </Mutation>
    )}
  </Query>
);

export default Todos;
