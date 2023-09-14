import { RefObject, useContext } from 'react';
import { SideBarContext } from './contexts';

type SidebarBackgroundProps = {
	header: RefObject<HTMLElement>;
};

export default function SidebarBackground({ header }: SidebarBackgroundProps) {
	const { leftIsOpen, rightIsOpen } = useContext(SideBarContext);
	const isOpen = leftIsOpen || rightIsOpen;

	const headerHeight = header.current?.clientHeight || 0;

	return (
		<div
			className={` absolute z-40 w-full bg-black/60 cursor-pointer ${isOpen === false && 'hidden'} left-0`}
			style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}
		/>
	);
}
