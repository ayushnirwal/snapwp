import type { DocumentNode, TypedQueryDocumentNode } from 'graphql';

export type Variables = Record< string, unknown >;

export type FetchQuery< T = unknown, V extends Variables = Variables > = (
	queryKey: string[],
	document: DocumentNode | TypedQueryDocumentNode< T, V >
) => Promise< T >;

export type getServerClient = (
	url: string,
	options: Record< string, unknown >
) => ServerClient;

export type getBrowserClient = (
	url: string,
	options: Record< string, unknown >
) => BrowserClient;

export interface ServerClient {
	fetchQuery: FetchQuery;
}

export interface BrowserClient {}
