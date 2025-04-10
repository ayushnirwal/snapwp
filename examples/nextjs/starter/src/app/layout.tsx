import { RootLayout } from '@snapwp/next';
import type { PropsWithChildren } from 'react';

export default function Layout( { children }: PropsWithChildren ) {
	return (
		<RootLayout>
			<>{ children }</>
		</RootLayout>
	);
}
