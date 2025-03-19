import type { FetchQuery, getServerClient } from '@snapwp/types';
import type { QueryClientConfig } from '@tanstack/react-query';

import {
	HttpLink,
	type ApolloClientOptions,
	type NormalizedCacheObject,
} from '@apollo/client';
import {
	registerApolloClient,
	ApolloClient,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

interface WrappedApolloClientOptions
	extends Omit<
		ApolloClientOptions< NormalizedCacheObject >,
		'cache' | 'ssrMode' | 'ssrForceFetchDelay'
	> {
	cache: InMemoryCache;
}

/**
 *
 * @param url
 * @param options
 */
export const getQueryClient: getServerClient = (
	url: string,
	options: WrappedApolloClientOptions
) => {
	/**
	 *
	 * @param uri
	 */
	const { getClient } = registerApolloClient( () => {
		return new ApolloClient( {
			link: new HttpLink( {
				// this needs to be an absolute url, as relative urls cannot be used in SSR
				uri: url,
				// you can disable result caching here if you want to
				// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
				// fetchOptions: { cache: "no-store" },
			} ),
			...options,
		} );
	} );

	/**
	 *
	 * @param queryKey
	 * @param document
	 */
	const fetchQuery: FetchQuery = ( queryKey, document ) => {
		return getClient().query( {
			query: document,
		} );
	};
};
