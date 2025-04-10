import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { QueryEngine } from '@snapwp/query';

export async function generateStaticParams() {
	//@todo Do not hard code this get this from WP server
	return [
		{ slug: [] },
		{ slug: [ 'sample-page' ] },
		{ slug: [ 'hello-world' ] },
		{ slug: [ 'categories' ] },
		{ slug: [ 'category', 'text' ] },
	];
}

export default async function Page( {
	params,
}: {
	params: Promise< { slug: string[] } >;
} ) {
	const { slug } = await params;

	return (
		<TemplateRenderer slug={ slug }>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}
