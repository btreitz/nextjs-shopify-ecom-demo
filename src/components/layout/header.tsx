import Link from 'next/link';
import IconCart from '@/components/icons/Cart';
import IconAccount from '@/components/icons/Account';
import Menu from './menu';
import HeaderLogo from './headerLogo';

export default function Header() {
	return (
		<header className=" h-20 sticky top-0 w-full backdrop-blur-sm bg-white/50 flex flex-col z-50">
			<nav className=" h-full w-full flex flex-row justify-between items-center px-5">
				<div className=" flex justify-start">
					<Menu />
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
		</header>
	);
}
