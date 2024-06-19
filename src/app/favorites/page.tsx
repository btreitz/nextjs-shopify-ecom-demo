import FavoritesGrid from '@/components/favoritesGrid';
import GridHeader from '@/components/gridHeader';
import RedirectToFavorites from '@/components/redirects/redirectToFavorites';
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

type Props = {
	searchParams: {
		ids?: string[] | string;
	};
};

export default function Page({ searchParams }: Props) {
	const { ids: encodedProductIds } = searchParams;

	const headerText = () => {
		if (Array.isArray(encodedProductIds) && encodedProductIds.length > 0) {
			return `${encodedProductIds.length} Item(s) Favorized`;
		} else if (encodedProductIds) {
			return '1 Item Favorized';
		} else {
			return ' No Items Favorized';
		}
	};

	return (
		<RedirectToFavorites currentIds={encodedProductIds}>
			<div className=" w-full max-w-[1680px] flex flex-col px-4 pb-16 lg:pb-40">
				<GridHeader text={headerText()} />
				<div className=" h-[1px] w-full bg-gray-200 mb-4" />
				{encodedProductIds && <FavoritesGrid encodedProductIds={encodedProductIds} />}
			</div>
		</RedirectToFavorites>
	);
}
