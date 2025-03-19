import type { FetchQuery, getServerClient } from '@snapwp/types';
import {
	QueryClient,
	defaultShouldDehydrateQuery,
	type QueryClientConfig,
} from '@tanstack/react-query';
import request from 'graphql-request';

/**
 *
 * @param url
 * @param options
 */
export const getQueryClient: getServerClient = (
	url: string,
	options: QueryClientConfig
) => {
	const TSClient = new QueryClient( {
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
			dehydrate: {
				// include pending queries in dehydration
				// eslint-disable-next-line jsdoc/require-jsdoc -- @todo
				shouldDehydrateQuery: ( query ) =>
					defaultShouldDehydrateQuery( query ) ||
					query.state.status === 'pending',
			},
			...options.defaultOptions,
		},
		...options,
	} );

	/**
	 *
	 * @param queryKey
	 * @param document
	 */
	const fetchQuery: FetchQuery = ( queryKey, document ) => {
		return TSClient.fetchQuery( {
			queryKey,
			/**
			 *
			 */
			queryFn: async () => {
				return await request( url, document );
			},
		} );
	};

	return {
		fetchQuery,
	};
};
