const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const DataLoader = require('dataloader');
const schema = require('./schema');
const usersApiService = require('./users-api-service');
const todosApiService = require('./todos-api-service');

const app = express();
const PORT = 4000;

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
    context: {
      usersLoader: new DataLoader(usersApiService.get),
      todosByUserLoader: new DataLoader(async userIds => {
        return userIds.map(({ userId, completed, limit }) =>
          todosApiService.get({ userId, completed }, limit)
        );
      })
    }
  }))
);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`-> GraphQL server running!
-> Open http://localhost:${PORT}/graphql to play with it :)
`);
});
