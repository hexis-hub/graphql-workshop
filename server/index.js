const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const app = express();
const PORT = 4000;

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP(() => ({
    schema,
    graphiql: true
  }))
);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`-> GraphQL server running!
-> Open http://localhost:${PORT}/graphql to play with it :)
`);
});
