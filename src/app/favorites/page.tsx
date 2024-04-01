import DisplayFavorites from '@/components/displayFavorites';
import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
	...BASE_METADATA,
	title: `Favorites | ${METADATA_TITLE_BASE}`,
	openGraph: {
		...BASE_METADATA.openGraph,
		title: `Favorites | ${METADATA_TITLE_BASE}`,
	},
};

type Props = {};

export default function Page({}: Props) {
	return (
		<div className=" w-full max-w-[1680px] flex flex-col px-4 pb-16 lg:pb-40">
			<DisplayFavorites />
		</div>
	);
}
