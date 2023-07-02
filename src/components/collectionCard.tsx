import { getClient } from '@/lib/gql/ApolloClient';
import { GetCollectionProductsQuery, GetCollectionProductsQueryVariables } from '@/lib/gql/__generated__/graphql';
import { collectionProductsQuery } from '@/lib/gql/operations';

type CollectionCardProps = {
	backgroundColor: string;
	rtl?: boolean;
	newestFirst?: boolean;
};

export default async function CollectionCard({
	backgroundColor,
	rtl = false,
	newestFirst = true,
}: CollectionCardProps) {
	const collectionProducts: CollectionWithProducts = await queryCollectionWithProducts(newestFirst);
	return (
		<div
			className={`w-full rounded-2xl flex flex-col items-center ${rtl ? 'sm:flex-row-reverse' : ''} sm:flex-row`}
			style={{ backgroundColor: backgroundColor }}
		>
			<div className={`w-full p-8 sm:w-1/3 ${rtl ? 'text-end' : ''}`}>
				<h2 className=" text-4xl font-semibold pt-0">{collectionProducts.title}</h2>
				<p>{collectionProducts.description}</p>
			</div>
			<div className="h-96 w-full p-8 sm:w-2/3">
				<div className="h-full border border-black">
					<div className="text-center leading-5 mt-36">Here will be a carousel through a single collection</div>
				</div>
			</div>
		</div>
	);
}

type CollectionWithProducts = {
	title: string;
	description: string;
	updatedAt: any;
	products: {
		id: string;
		title: string;
		images: {
			src: any;
			dimensions: {
				width: number | null | undefined;
				height: number | null | undefined;
			};
		}[];
	}[];
};

function extractFirstCollection(data: GetCollectionProductsQuery | undefined): CollectionWithProducts {
	if (!data || !data?.collections.nodes[0]) {
		throw new Error('No collection found');
	}

	const collection = data.collections.nodes[0];
	const collectionWithProducts: CollectionWithProducts = {
		title: collection.title,
		description: collection.description,
		updatedAt: collection.updatedAt,
		products: collection.products.nodes.map((product) => ({
			id: product.id,
			title: product.title,
			images: product.images.nodes.map((image) => ({
				src: image.url,
				dimensions: {
					width: image.width,
					height: image.height,
				},
			})),
		})),
	};

	return collectionWithProducts;
}

async function queryCollectionWithProducts(newestFirst: boolean) {
	const { data } = await getClient().query<GetCollectionProductsQuery, GetCollectionProductsQueryVariables>({
		query: collectionProductsQuery,
		variables: { firstCollections: 1, newestFirst: newestFirst },
	});

	return extractFirstCollection(data);
}
