import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import randomSentence from 'random-sentence';

const GET_TODOS = gql`
  {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($id: Int!, $title: String!, $completed: Boolean!) {
    addTodo(id: $id, completed: $completed, title: $title) {
      id
      completed
    }
  }
`;

const Todos = () => (
  <Query query={GET_TODOS}>
    {({ data = {}, loading, error }) => (
      <Mutation mutation={ADD_TODO} refetchQueries={[{ query: GET_TODOS }]}>
        {(addTodo, { loading: isUpdating }) => {
          const todos = data.todos || [];
          const isLoading = loading || isUpdating;

          const result = { isLoading, todos };
          return (
            <>
              <pre>
                <code>{JSON.stringify(result, null, 4)}</code>
              </pre>
              <button
                type="button"
                onClick={() =>
                  addTodo({
                    variables: {
                      id: todos.length,
                      title: randomSentence({ min: 5, max: 9 }),
                      completed: false
                    }
                  })
                }
              >
                Add todo
              </button>
            </>
          );
        }}
      </Mutation>
    )}
  </Query>
);

export default Todos;
