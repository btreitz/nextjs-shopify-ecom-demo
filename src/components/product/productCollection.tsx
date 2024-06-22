import { Product, RecommendedProduct } from '@/app/product/[id]/page';
import RecomendationSwiperWrapper from '../swiperWrappers/recommendationSwiperWrapper';
import Link from 'next/link';
import ScalableImage from '../scalableImage';

type ProductCollectionProps = {
	product: Product;
	recommendedFromCollection: RecommendedProduct[];
};

export default function ProductCollection({ product, recommendedFromCollection }: ProductCollectionProps) {
	return (
		<div className=" pb-4 md:pt-4">
			<div>
				<h2 className=" py-2 mb-3 md:text-2xl">
					Collection <span className=" font-medium">{product.collections[0].title}</span>
				</h2>
				<p className=" text-sm">{product.collections[0].description}</p>
			</div>
			{/* Recommend products from the same collection */}
			{recommendedFromCollection.length > 0 && (
				<div className=" mt-5">
					<RecomendationSwiperWrapper>
						{recommendedFromCollection.map((product, index) => (
							<Link href={`/product/${product.id}`} key={index} className=" h-full">
								<div className=" w-full rounded-lg overflow-hidden aspect-square flex items-end">
									<ScalableImage
										animationTriggers={{ hover: true }}
										src={product.images.src}
										alt={product.title}
										className=" object-contain"
										width={product.images.dimensions.width || 768}
										height={product.images.dimensions.height || 1024}
									/>
								</div>
								<div className=" w-full pt-3 mb-6 pl-1">{product.title}</div>
							</Link>
						))}
					</RecomendationSwiperWrapper>
				</div>
			)}
		</div>
	);
}
