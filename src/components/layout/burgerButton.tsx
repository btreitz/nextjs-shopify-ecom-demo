'use-client';

import { useContext } from 'react';
import { SideBarContext } from './contexts';

type BurgerButtonProps = {};

export default function BurgerButton({}: BurgerButtonProps) {
	const { menuSidebarIsOpen, setMenuSidebarIsOpen } = useContext(SideBarContext);

	return (
		<button
			className="flex flex-col h-8 w-12 justify-evenly items-center group"
			onClick={() => setMenuSidebarIsOpen(!menuSidebarIsOpen)}
		>
			<div
				className={` h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 ${
					menuSidebarIsOpen && ' rotate-45 translate-y-[8px]'
				}`}
			/>
			<div
				className={` h-[1px] rounded-full bg-black transition-all ease-out duration-200 opacity-60 group-hover:opacity-100 ${
					menuSidebarIsOpen ? ' w-0' : ' w-6'
				}`}
			/>
			<div
				className={` h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 ${
					menuSidebarIsOpen && ' -rotate-45 -translate-y-[8px]'
				}`}
			/>
		</button>
	);
}
