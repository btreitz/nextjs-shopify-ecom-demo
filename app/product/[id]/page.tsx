import { METADATA_TITLE_BASE } from '@/components/utils/shared-metadata';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
	params: { id: string };
};

type Product = {
	id: string;
	title: string;
	description: string;
	image: string;
};

async function getProductData(id: string): Promise<Product> {
	// decode id from base64
	const decodedId = Buffer.from(id, 'base64').toString('utf-8');

	const product: Product = await new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: decodedId,
				title: 'Example product that is very good',
				description: 'An example description for the product',
				image: 'https://via.placeholder.com/150',
			});
		}, 2000);
	});
	return product;
}

export default async function Page({ params }: Props) {
	const product = await getProductData(params.id);
	return (
		<>
			<h1>Hello Product - {product.id}</h1>
			<p>
				<span>{product.title}</span>
				<br />
				<span>{product.description}</span>
				<br />
				<Image src={product.image} alt={product.title} width={150} height={150} />
			</p>
		</>
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route product id
	const { id } = params;

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
