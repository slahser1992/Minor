import 'fontsource-roboto';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import AppRouter from '@/pages';
import theme from '@/theme';

const httpLink = new createHttpLink({
	uri: '/graphql',
	onError: ({ operation, graphQLErrors, networkError, response }) => {
		if (graphQLErrors)
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
				),
			);
  	if (networkError) console.log(`[Network error]: ${networkError}`);
	}
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
  return (
		<ApolloProvider client={client}>
			<MuiThemeProvider theme={theme}>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<AppRouter />
				</SnackbarProvider>
			</MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
