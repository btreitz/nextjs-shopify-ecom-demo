import { METADATA_TITLE_BASE } from '@/app/layout';
import { ResolvingMetadata, Metadata } from 'next';

type Props = {
	params: { id: string };
};

export default function Page({ params }: Props) {
	return <h1>Hello Product - {params.id}</h1>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route product id
	const { id } = params;
	console.log(id); // just for testing

	// get the current product from the shopify storefront api
	// const product = await fetch(`https://.../${id}`).then((res) => res.json());

	const product = {
		title: 'Example product that is very good',
		description: 'An example description for the product',
		image: 'https://via.placeholder.com/150',
	};

	// set the fields accordingly to the product
	return {
		title: `${product.title} | ${METADATA_TITLE_BASE}`,
		description: product.description,
		openGraph: {
			title: `${product.title} | ${METADATA_TITLE_BASE}`,
			description: product.description,
			images: [
				{
					url: product.image,
				},
			],
		},
	};
}
