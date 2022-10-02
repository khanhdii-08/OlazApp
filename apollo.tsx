import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import JWTManager from "./utils/jwt";

const httpLink = createHttpLink({
  uri: "http://192.168.1.7:4000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from JWTManager if it exists
  const token = JWTManager.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
