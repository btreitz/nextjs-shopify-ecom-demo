import Link from 'next/link';
import RecomendationSwiperWrapper from '../swiperWrappers/recommendationSwiperWrapper';
import ScalableImage from '../scalableImage';
import { RecommendedProduct } from '@/app/product/[id]/page';

type ProductRecommendationsProps = {
	recommendedFromProductType: RecommendedProduct[];
};

export default function ProductRecommendations({ recommendedFromProductType }: ProductRecommendationsProps) {
	return (
		<div className=" pb-8">
			<div className=" h-[1px] w-full bg-gray-200 my-4 md:opacity-0" />
			<div>
				<h2 className=" py-2 mb-4 md:text-2xl">You may also like</h2>
				<RecomendationSwiperWrapper>
					{recommendedFromProductType.map((product, index) => (
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
		</div>
	);
}
