import Image from 'next/image';

import Link from 'next/link';
import IconCart from '@/components/icons/Cart';
import IconAccount from '@/components/icons/Account';
import Menu from './menu';

export default function Header() {
	// check if current pathname is active to highlight in navbar
	/*
    const pathname = usePathname();
    {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        ...
        render links and highlight active link
        ...
    */

	return (
		<header className=" h-20 sticky top-0 w-full backdrop-blur-sm bg-white/50 flex flex-col z-50">
			<nav className=" h-full w-full flex flex-row justify-between items-center px-5">
				<div className=" flex-1 flex justify-start">
					<Menu />
				</div>
				<div className=" flex-1 flex justify-center">
					<Link href="/">
						<Image src={'/images/logo/logo-big-text-transparent.png'} alt={'Vörðr Sæde'} width={100} height={100} />
					</Link>
				</div>
				<div className=" flex justify-end gap-5 flex-1">
					<Link href="#" className=" hoverable">
						<IconCart />
					</Link>
					<button className=" hoverable">
						<IconAccount />
					</button>
				</div>
			</nav>
			<div className=" border-b border-gray-200" />
		</header>
	);
}
