import { Metadata } from 'next';
import { METADATA_TITLE_BASE } from './layout';

export const metadata: Metadata = {
	title: `404 | ${METADATA_TITLE_BASE}`,
};

export default function NotFound() {
	return (
		<div>
			<h1>Not found - 404</h1>
		</div>
	);
}
