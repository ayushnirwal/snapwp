import { TemplateRenderer, TemplateRendererProps } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { getQueryClient } from '../get-query-client';
import { getConfig, getGraphqlUrl } from '@snapwp/core/config';
import request, { gql } from 'graphql-request';
import { GetCurrentTemplateDocument, parseBodyClasses, parseEditorBlocks, parseEnqueuedScripts, parseEnqueuedStylesheets, parseScriptModules } from '@snapwp/query';
import { headers } from 'next/headers';

export default async function Page() {
	const queryClient = getQueryClient();
	const endpoint = getGraphqlUrl();
	const { homeUrl } = getConfig();
    const headerList = await headers();
	const pathname = headerList.get( 'x-current-path' );

	const response = await queryClient.fetchQuery( {
		queryKey: [ 'template', pathname || "/" ],
		queryFn: async () => {
			const response = await request(
				endpoint,GetCurrentTemplateDocument, {uri:pathname || "/"}
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

			if ( isObject( response ) && hasKey( response, 'templateByUri' ) ) {
                return {
                    stylesheets: parseEnqueuedStylesheets( homeUrl, response.templateByUri ),
                    editorBlocks: parseEditorBlocks( response.templateByUri ),
                    scripts: parseEnqueuedScripts( response.templateByUri, homeUrl ),
                    scriptModules: parseScriptModules( response.templateByUri, homeUrl ),
                    bodyClasses: parseBodyClasses( response.templateByUri ),
                };
			}
			return {
                    stylesheets: undefined,
                    editorBlocks: undefined,
                    scripts: undefined,
                    scriptModules: undefined,
                    bodyClasses: undefined,
            };
		},
	} );

	async function getTemplateData() {
        return response
	}

	return (
		<TemplateRenderer getTemplateData={getTemplateData}>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}
