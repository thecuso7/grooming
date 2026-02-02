import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloLink } from "@apollo/client/core";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { HttpLink } from "@apollo/client/link/http";

const httpLink = new HttpLink({
	uri: 'http://localhost:3000/api/graphql',
	headers: {
		'Content-Type': 'application/json',
	},
});

const batchLink = new BatchHttpLink({
  uri: 'http://localhost:3000/api/graphql',
  batchMax: 5,
  batchInterval: 20,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apolloClient = new ApolloClient({
	link: ApolloLink.split(
		operation => operation.getContext().batch,
		batchLink,
		httpLink
	),
	cache: new InMemoryCache({
		addTypename: false,
		
		dataIdFromObject(object) {
			switch (object.__typename) {
				case 'Pet':
					return `Pet:${object.id}`;
				default:
					return undefined;
			}
		}
	}),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network",
		},
		query: {
			fetchPolicy: "network-only",
		},
	},
});

export default apolloClient;