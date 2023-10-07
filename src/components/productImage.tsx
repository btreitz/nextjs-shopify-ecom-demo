'use client';

import { InventoryProduct } from '@/app/inventory/page';
import Link from 'next/link';
import ScalableImage from './scalableImage';
import Favorize from './favorize';
import { motion } from 'framer-motion';

type ProductImageProps = {
	product: InventoryProduct;
};

export default function ProductImage({ product }: ProductImageProps) {
	return (
		<motion.div className=" w-full" initial="default" whileHover="zoomed">
			<Link href={`/product/${product.id}`}>
				<div className=" w-full sm:basis-1/2 flex flex-col">
					<div className=" w-full h-full relative overflow-hidden">
						<ScalableImage image={product.images[0]} />
						<Favorize encodedId={product.id} className=" absolute top-3 right-3" />
					</div>
					<div className=" flex flex-col text-sm py-2 leading-6">
						<span className=" text-base">{product.title}</span>
						<div className=" text-sm opacity-60">
							<span>{product.price.amount}</span>{' '}
							<span>{product.price.currencyCode === 'EUR' ? '€' : product.price.currencyCode}</span>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
