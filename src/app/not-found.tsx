import { Metadata } from 'next';
import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';

export const metadata: Metadata = {
	...BASE_METADATA,
	title: `404 | ${METADATA_TITLE_BASE}`,
};

export default function NotFound() {
	return (
		<div>
			<h1>Not found - 404</h1>
		</div>
	);
}
