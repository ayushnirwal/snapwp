import { getQueryClient } from './get-server-query-client';
import type React from 'react';
import { getGraphqlUrl } from '@snapwp/core/config';
import { GetGlobalStylesDocument } from '@snapwp/query';
import { GlobalHeadProps } from '@snapwp/core';
import { RootLayout } from '@snapwp/next';

function isObject(res: unknown): res is Object {
    return !!res && typeof res === 'object';
}

function hasKey<T extends object, K extends PropertyKey>(
    value: unknown,
    key: K
): value is T & Record<K, unknown> {
    return (
        typeof value === 'object' && value !== null && key in value
    );
}

export default async function Layout( {
	children,
}: {
	children: React.ReactNode;
} ) {
	const endpoint = getGraphqlUrl();
	const queryClient = getQueryClient(endpoint);
    const { data } = await queryClient.query(
        { query: GetGlobalStylesDocument, },
    );


	async function getGlobalStyles() {
		return {
			//@ts-ignore
			...data,
			//@ts-ignore
			globalStylesheet: data.stylesheet,
		} as GlobalHeadProps;
	}

	return (
        <RootLayout getGlobalStyles={getGlobalStyles}>
            {children}
        </RootLayout>
	);
}
