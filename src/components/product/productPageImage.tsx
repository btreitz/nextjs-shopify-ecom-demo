import Image from 'next/image';
import { Product } from '@/app/product/[id]/page';
import ProductSwiperWrapper from '../swiperWrappers/productSwiperWrapper';

type ProductPageImageProps = {
	product: Product;
};

export default function ProductPageImage({ product }: ProductPageImageProps) {
	return (
		<ProductSwiperWrapper props={{ className: ' w-full' }} productTitle={product.title} productId={product.id}>
			{product.images.map((image, index) => (
				<Image
					key={index}
					src={image.src}
					alt={product.title}
					className=" object-cover ml-auto mr-auto w-full"
					width={image.dimensions?.width || 768}
					height={image.dimensions?.height || 1024}
				/>
			))}
		</ProductSwiperWrapper>
	);
}
