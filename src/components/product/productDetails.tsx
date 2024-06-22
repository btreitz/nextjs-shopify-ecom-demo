import { Product } from '@/app/product/[id]/page';
import { ProductDimensions, encodeShopifyProductId } from '@/utils';
import AddToCart from '../addToCart';
import ArrowDoubleSided from '../icons/ArrowDoubledSided';
import ProductDecscription from '../productDescription';

type ProductDetailsProps = {
	product: Product;
	productDimensions: ProductDimensions;
};

export default function ProductDetails({ product, productDimensions }: ProductDetailsProps) {
	return (
		<div className=" p-4 w-full md:p-8 md:bg-light sticky top-20">
			<div className=" hidden md:block">
				<h1 className=" text-3xl font-light py-2">{product.title}</h1>
				<div className=" py-4">
					<span>{product.price.amount}</span>{' '}
					<span>{product.price.currencyCode === 'EUR' ? '€' : product.price.currencyCode}</span>
				</div>
			</div>
			<div className=" text-sm leading-6">
				<ProductDecscription description={product.description} />
				<div className=" h-[1px] w-full bg-gray-200 my-4" />
				<div>
					<ul>
						<li className=" flex flex-row items-center w-20 justify-between">
							<ArrowDoubleSided /> <span>{productDimensions.width}cm</span>
						</li>
						<li className=" flex flex-row items-center w-20 justify-between">
							<ArrowDoubleSided className=" rotate-90" /> <span>{productDimensions.height}cm</span>
						</li>
						<li className=" flex flex-row items-center w-20 justify-between">
							<ArrowDoubleSided className=" -rotate-45" /> <span>{productDimensions.depth}cm</span>
						</li>
					</ul>
				</div>
			</div>
			<div className=" hidden md:block pt-8">
				<AddToCart
					encodedId={encodeShopifyProductId(product.id)}
					className=" rounded-lg w-full bg-primary text-center p-3 text-white hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
				/>
			</div>
		</div>
	);
}
