import Image from 'next/image';

type Product = {
	title: string;
	description: string;
	image: string;
};

async function getProductsBy(params: [string, string][]): Promise<Product[]> {
	// TODO: fetch products by the given params from shopify storefront api

	const products: Product[] = await new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					title: 'Product 1',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
				{
					title: 'Product 2',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
				{
					title: 'Product 2',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
			]);
		}, 2000);
	});
	return products;
}

type Props = {
	searchParams: Record<string, string>;
};

export default async function Page({ searchParams }: Props) {
	const paramsList: [string, string][] = Object.entries(searchParams);
	const products = await getProductsBy(paramsList);
	return (
		<>
			<h1>Inventory</h1>
			<div className=" flex flex-row flex-wrap">
				{products.map((product, index) => (
					<p key={index} className=" border rounded m-5 p-4">
						<span>{product.title}</span>
						<br />
						<span>{product.description}</span>
						<br />
						<Image src={product.image} alt={product.title} width={150} height={150} />
					</p>
				))}
			</div>
		</>
	);
}
