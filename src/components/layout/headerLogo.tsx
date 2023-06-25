'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { animLimit } from './header';

const minWith = 10; // minimum width of logo div in percent

export default function HeaderLogo() {
	const path = usePathname();

	const { scrollY } = useScroll();
	const transformedScroll = useTransform(scrollY, [0, animLimit], [100, minWith]);
	const intermediateWidth = useTransform(transformedScroll, (val) => (path === '/' ? val : minWith));
	const width = useTransform(
		useSpring(intermediateWidth, {
			damping: 25,
			mass: 0.5,
			stiffness: 150,
		}),
		(val) => `${val}%`,
	);

	return (
		<div className=" flex-1 px-4">
			<motion.div
				className=" flex justify-center min-w-[75px]"
				style={{
					width,
				}}
			>
				<Link href="/">
					<Image src={'/images/logo/logo-2.png'} alt={'Vörðr Sæde'} width={100} height={72.66} />
				</Link>
			</motion.div>
		</div>
	);
}
