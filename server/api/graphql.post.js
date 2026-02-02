import { ApolloServer } from '@apollo/server';
import { startServerAndCreateH3Handler } from '@as-integrations/h3';

import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    allowBatchedHttpRequests: true,
})

export default startServerAndCreateH3Handler(apollo, {
  context: (event) => {
  },
})