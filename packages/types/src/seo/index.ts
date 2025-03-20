import type { Metadata } from 'next';

/**
 * Type for global metadata.
 */
export type RootMetadata = Partial< {
	siteTitle: string;
	description: string;
	locale: string;
} >;

export type GetRootMetaDataOptions = Partial< {
	fetchMetadata: FetchMetaData;
	parseMetaData: FetchMetaData;
} >;

/**
 * Generates root meta data.
 * This is the main export to be consumed at root level [@todo DELETE THIS LINE]
 * @param options Configuration object. By default has preimplemented fetcher and parser.
 */
export type GetRootMetaData = (
	options: GetRootMetaDataOptions
) => Promise< Metadata >;

/**
 * Queries data required to generate root meta data
 */
export type FetchMetaData = () => Promise< unknown >;

/**
 * Validates and parses root meta data into consumable state
 */
export type ParseMetaData = ( rootMetadata: unknown ) => RootMetadata;

export type RouteOpenGraphMetadata = Partial< {
	title: string;
	url: string;
	type: 'article' | 'website';
	images?: {
		url: string;
		width?: number;
		height?: number;
	}[];
	description: string;
	publishedTime: string;
	modifiedTime: string;
} >;

export type GetRouteOpenGraphMetadataOptions = Partial< {
	fetchRouteOpenGraphMetaData: FetchRouteOpenGraphMetaData;
	parseRouteOpenGraphMetaData: ParseRouteOpenGraphMetaData;
} >;

/**
 * Generates Route open graph data
 * @param path Pathname of a route
 * @param options Configuration object. By default has preimplemented fetcher and parser.
 */
export type GetRouteOpenGraphMetaData = (
	path: string,
	options: GetRouteOpenGraphMetaData
) => Promise< Metadata >;

/**
 * Queries data required to generate open graph data
 * @param path Pathname of a route
 */
export type FetchRouteOpenGraphMetaData = (
	path: string
) => Promise< unknown >;

/**
 * Validates and parses open graph data into consumable state
 * @param path Pathname of a route
 * @param routeOpenGraphMetadata object to be validated and parsed
 */
export type ParseRouteOpenGraphMetaData = (
	path: string,
	routeOpenGraphMetadata: unknown
) => RouteOpenGraphMetadata;

/**
 * Type for parsed Twitter metadata.
 */
export type RouteTwitterMetadata = Partial< {
	title: string;
	description: string;
	image: {
		url: string;
		width?: number;
		height?: number;
	};
} >;

export type GetRouteTwitterMetaDataOptions = {
	fetchRouteTwitterMetaData: FetchRouteTwitterMetaData;
	parseRouteTwitterMetaData: ParseRouteTwitterMetaData;
};

/**
 * Generates Route open graph data
 * @param path Pathname of a route
 * @param options Configuration object. By default has preimplemented fetcher and parser.
 */
export type GetRouteTwitterMetaData = (
	path: string,
	options: GetRouteTwitterMetaDataOptions
) => Promise< Metadata >;

/**
 * Queries data required to generate route's twitter meta data
 * @param path Pathname of a route
 */
export type FetchRouteTwitterMetaData = ( path: string ) => Promise< unknown >;

/**
 * Queries data required to generate root meta data
 */
export type ParseRouteTwitterMetaData = (
	path: string,
	routeOpenGraphMetadata: unknown
) => RouteTwitterMetadata;

/**
 * Type for parsed Twitter metadata.
 */
export type RouteMetadata = Partial<
	RouteOpenGraphMetadata &
		RouteTwitterMetadata & {
			title: string;
			description: string;
			authors: { name: string }[];
		}
>;

export type GetRouteMetaDataOptions = {
	getRouteOpenGraphMetaDataOptions: GetRouteOpenGraphMetadataOptions;
	getRouteTwitterMetaDataOptions: GetRouteTwitterMetaDataOptions;
};

/**
 * Generates Route open graph data
 * This is the main export to be consumed at root level [@todo DELETE THIS LINE]
 * @param path Pathname of a route
 * @param options Configuration object. By default has preimplemented internals.
 */
export type GetRouteMetaData = (
	path: string,
	options: GetRouteMetaDataOptions
) => Promise< Metadata >;

/**
 * Queries data required to generate route's twitter meta data
 * @param path Pathname of a route
 */
export type FetchRouteMetaData = ( path: string ) => Promise< unknown >;

/**
 * Queries data required to generate root meta data
 */
export type ParseRouteMetaData = (
	path: string,
	routeOpenGraphMetadata: unknown
) => RouteMetadata;
