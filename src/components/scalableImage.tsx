'use client';

import Image, { ImageProps } from 'next/image';
import { motion, Variants } from 'framer-motion';

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

type ScalableImageProps = ImageProps & {
	animationTriggers: {
		mount?: boolean;
		hover?: boolean;
	};
};

export default function ScalableImage(props: ScalableImageProps) {
	return (
		<motion.div
			variants={ZoomVariants}
			initial="default"
			whileHover={props.animationTriggers.hover ? 'zoomed' : ''}
			animate={props.animationTriggers.mount ? 'zoomed' : ''}
		>
			<Image {...props} alt={props.alt || 'Image'} />
		</motion.div>
	);
}
