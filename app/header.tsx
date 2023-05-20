import Link from 'next/link';
import IconCart from './IconCart';
import IconAccount from './IconAccount';

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
		<header className=" h-20 sticky top-0 w-full backdrop-blur-sm bg-white/50 flex flex-col ">
			<nav className=" h-full w-full flex flex-row justify-between items-center px-5">
				<button>Burger Menu</button>
				<Link href="#">Vörðr Sæde</Link>
				<div className=" flex flex-row gap-5">
					<Link href="#">
						<IconCart />
					</Link>
					<button>
						<IconAccount />
					</button>
				</div>
			</nav>
			<div className=" border-b border-gray-200" />
		</header>
	);
}
