// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

import { getClient } from '@/lib/gql/ApolloClient';
import { GetCollectionProductsQuery, GetCollectionProductsQueryVariables } from '@/lib/gql/__generated__/graphql';
import { collectionProductsQuery } from '@/lib/gql/operations';
import SwiperWrapper from './swiperWrapper';
import Image from 'next/image';

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
			<div className=" w-full p-8 sm:w-2/3">
				<div className="h-full">
					<SwiperWrapper props={{ className: ' h-full' }}>
						{collectionProducts.products.map((product) => (
							<div key={product.id} className="h-full flex flex-col items-center justify-center">
								<div className=" w-full rounded-lg overflow-hidden">
									<Image
										src={product.images[0].src}
										alt={product.title}
										className=" object-contain"
										width={product.images[0].dimensions?.width || 500}
										height={product.images[0].dimensions?.height || 500}
									/>
								</div>
								<div className=" w-full pt-5 pb-4 pl-1">{product.title}</div>
							</div>
						))}
					</SwiperWrapper>
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
