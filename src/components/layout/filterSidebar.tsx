import { RefObject, useContext } from 'react';
import { SideBarContext } from './contexts';
import Sidebar from '../sidebar';

type FilterSidebarProps = {
	headerRef: RefObject<HTMLElement>;
};

export default function FilterSidebar({ headerRef }: FilterSidebarProps) {
	const { rightIsOpen, setRightIsOpen } = useContext(SideBarContext);

	return (
		<div className=" hidden">
			<Sidebar headerRef={headerRef} isOpen={rightIsOpen} setIsOpen={setRightIsOpen} orientation="right">
				<div className=" flex flex-col">TEST</div>
			</Sidebar>
		</div>
	);
}
