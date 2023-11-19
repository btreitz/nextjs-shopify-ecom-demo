'use client';

import Image, { ImageProps } from 'next/image';
import { motion, Variants } from 'framer-motion';

type ScalableImageProps = ImageProps;

const ZoomVariants: Variants = {
	default: {
		scale: 1,
		transition: { duration: 0.7 },
	},
	zoomed: {
		scale: 1.05,
		transition: { duration: 1.2 },
	},
};

export default function ScalableImage(props: ScalableImageProps) {
	return (
		<motion.div variants={ZoomVariants} initial="default" whileHover="zoomed">
			<Image {...props} alt={props.alt || 'Image'} />
		</motion.div>
	);
}
