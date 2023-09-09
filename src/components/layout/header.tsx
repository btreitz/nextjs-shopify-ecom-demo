'use client';

import Link from 'next/link';
import IconCart from '@/components/icons/Cart';
import IconAccount from '@/components/icons/Account';
import HeaderLogo from './headerLogo';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BurgerButton from './burgerButton';
import MenuSidebar from './menuSidebar';
import FilterSidebar from './filterSidebar';

export const animLimit = 50; // scroll limit in pixels

export default function Header() {
	const headerRef = useRef<HTMLElement>(null);

	const { scrollY } = useScroll();
	const headerHeightRaw = useTransform(scrollY, [0, animLimit], [5, 3]);
	const springHeaderHeight = useTransform(
		useSpring(headerHeightRaw, { mass: 0.3, stiffness: 200 }),
		(val) => `${val}rem`,
	);

	return (
		<>
			<motion.header
				ref={headerRef}
				className=" sticky top-0 w-full backdrop-blur-sm bg-white/10 flex flex-col z-50 items-center"
				style={{ height: springHeaderHeight }}
			>
				<nav className=" h-full w-full max-w-[1680px] flex flex-row justify-between items-center px-5">
					<div className=" flex justify-start">
						<BurgerButton />
					</div>
					<HeaderLogo />
					<div className=" flex justify-end gap-5">
						<Link href="#" className=" hoverable">
							<IconCart />
						</Link>
						<button className=" hoverable">
							<IconAccount />
						</button>
					</div>
				</nav>
			</motion.header>
			<MenuSidebar headerRef={headerRef} />
			<FilterSidebar headerRef={headerRef} />
		</>
	);
}
