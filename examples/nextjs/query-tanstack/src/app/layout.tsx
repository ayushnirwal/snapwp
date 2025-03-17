import { getQueryClient } from './get-server-query-client';
import type React from 'react';
import { gql, request } from 'graphql-request';
import { getGraphqlUrl } from '@snapwp/core/config';
import { RootLayout } from '@snapwp/next';
import Providers from './providers';
import { GlobalHeadProps } from '@snapwp/core';

export default async function Layout( {
	children,
}: {
	children: React.ReactNode;
} ) {
	const queryClient = getQueryClient();
	const endpoint = getGraphqlUrl();
	await queryClient.prefetchQuery( {
		queryKey: [ 'global' ],
		queryFn: async () => {
			const response = await request(
				endpoint,
				gql`
					query GetGlobalStyles {
						globalStyles {
							customCss
							stylesheet
							renderedFontFaces
						}
					}
				`
			);

			function isObject( res: unknown ): res is Object {
				return !! res && typeof res === 'object';
			}

			function hasKey< T extends object, K extends PropertyKey >(
				value: unknown,
				key: K
			): value is T & Record< K, unknown > {
				return (
					typeof value === 'object' && value !== null && key in value
				);
			}

			if ( isObject( response ) && hasKey( response, 'globalStyles' ) ) {
				return response.globalStyles;
			}
			return {};
		},
	} );

	async function getGlobalStyles() {
		const data = queryClient.getQueryData( [ 'global' ] );
		return {
			//@ts-ignore
			...data,
			//@ts-ignore
			globalStylesheet: data.stylesheet,
		} as GlobalHeadProps;
	}

	return (
        <RootLayout getGlobalStyles={getGlobalStyles}>
            <Providers>
                {children}
            </Providers>
        </RootLayout>
	);
}
