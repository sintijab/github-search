import React from 'react';
import ReactDOM from 'react-dom';
import AddRepo from './App';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';

import registerServiceWorker from './registerServiceWorker';
import { ACCESS_TOKEN } from './constants';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `token ${ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <AddRepo />
    </ ApolloHooksProvider>
  </ ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
