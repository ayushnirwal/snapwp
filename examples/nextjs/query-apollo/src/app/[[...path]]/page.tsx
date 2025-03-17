import { TemplateRenderer, TemplateRendererProps } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { getQueryClient } from '../get-server-query-client';
import { getConfig, getGraphqlUrl } from '@snapwp/core/config';
import { GetCurrentTemplateDocument, parseBodyClasses, parseEditorBlocks, parseEnqueuedScripts, parseEnqueuedStylesheets, parseScriptModules } from '@snapwp/query';
import { headers } from 'next/headers';
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

export default async function Page() {
	const endpoint = getGraphqlUrl();
	const queryClient = getQueryClient(endpoint);
	const { homeUrl } = getConfig();
    const headerList = await headers();
	const pathname = headerList.get( 'x-current-path' );

    const { data } = await queryClient.query(
        { query: GetCurrentTemplateDocument,variables:{uri:pathname || "/"} },
    );

	async function getTemplateData() {
			if ( isObject( data ) && hasKey( data, 'templateByUri' ) ) {
                return {
                    stylesheets: parseEnqueuedStylesheets( homeUrl, data.templateByUri ),
                    editorBlocks: parseEditorBlocks( data.templateByUri ),
                    scripts: parseEnqueuedScripts( data.templateByUri, homeUrl ),
                    scriptModules: parseScriptModules( data.templateByUri, homeUrl ),
                    bodyClasses: parseBodyClasses( data.templateByUri ),
                };
			}
			return {
                    stylesheets: undefined,
                    editorBlocks: undefined,
                    scripts: undefined,
                    scriptModules: undefined,
                    bodyClasses: undefined,
            };
	}

	return (
		<TemplateRenderer getTemplateData={getTemplateData}>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}
