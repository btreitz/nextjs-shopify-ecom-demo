'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	console.error(error);
	return (
		<div>
			<h2>Something went wrong!</h2>
			<Link href="/">Back to Home</Link>
		</div>
	);
}
