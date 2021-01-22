import { useQuery as useApolloQuery, useMutation as useApolloMutation } from '@apollo/client';
import { useContext } from 'react';
import { useSnackbar } from 'notistack';

import { accountStoreContext, essayStoreContext } from '@/store';

const useQuery = ({ query, variables = {}, sucCallback, errCallback, options = { hideSnackbar: false }}) => {
	const { enqueueSnackbar } = useSnackbar();
	const { hideSnackbar } = options;
	return useApolloQuery(query, {
		variables,
		onError: ({ graphQLErrors, networkError }) => {
			if (!hideSnackbar) {
				if (graphQLErrors)
					graphQLErrors.map(({ message }) =>
						enqueueSnackbar(message, {
							variant: 'error'
						}),
					);
				if (networkError)
					networkError.response
						? enqueueSnackbar(JSON.stringify(networkError.response, { variant: 'error', }))
						: enqueueSnackbar(networkError.result.errors[0].message, { variant: 'error', });
			}
			if (typeof errCallback === 'function') errCallback({ graphQLErrors, networkError });
		},
		onCompleted: typeof sucCallback === 'function'
			? (res) => sucCallback(res)
			: null,
	});
}

const useMutation = ({ mutation, sucCallback, errCallback, options = { hideSnackbar: false } }) => {
	const { enqueueSnackbar } = useSnackbar();
	const { hideSnackbar } = options;
	return useApolloMutation(mutation, {
		onError: ({ graphQLErrors, networkError }) => {
			if (!hideSnackbar) {
				if (graphQLErrors)
					graphQLErrors.map(({ message }) =>
						enqueueSnackbar(message, {
							variant: 'error',
						}),
					);
				if (networkError)
					networkError.response
						? enqueueSnackbar(JSON.stringify(networkError.response), { variant: 'error' })
						: enqueueSnackbar(networkError.result.errors[0].message, { variant: 'error' });
			}
			if (typeof errCallback === 'function') errCallback({ graphQLErrors, networkError });
		},
		onCompleted: typeof sucCallback === 'function'
			? (res) => sucCallback(res)
			: null,
	});
}

const useAccountStores = () => useContext(accountStoreContext);
const useEssayStores = () => useContext(essayStoreContext);

export {
	useQuery,
	useMutation,
	useAccountStores,
	useEssayStores,
}