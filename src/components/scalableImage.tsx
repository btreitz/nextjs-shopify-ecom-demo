'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ImageDetails } from '@/app/inventory/page';

type ScalableImageProps = {
	image: ImageDetails;
};

const ZoomVariants: Variants = {
	default: {
		scale: 1,
		transition: { duration: 0.7 },
	},
	zoomed: {
		scale: 1.08,
		transition: { duration: 0.7 },
	},
};

export default function ScalableImage({ image }: ScalableImageProps) {
	return (
		<motion.div variants={ZoomVariants}>
			<Image
				alt="product image"
				src={image.src}
				className=" object-contain h-full"
				width={image.dimensions?.width || 768}
				height={image.dimensions?.height || 1024}
			/>
		</motion.div>
	);
}
