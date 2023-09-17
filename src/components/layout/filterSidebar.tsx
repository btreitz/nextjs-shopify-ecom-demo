'use client';

import { RefObject, Suspense, useContext } from 'react';
import { SideBarContext } from './contexts';
import Sidebar from '../sidebar';
import Sort from '../filters/sort';
import ProductType from '../filters/productType';
import Prize from '../filters/prize';
import Collection from '../filters/collection';

type FilterSidebarProps = {
	header: RefObject<HTMLElement>;
};

export default function FilterSidebar({ header }: FilterSidebarProps) {
	const { filterSidebarIsOpen } = useContext(SideBarContext);

	return (
		<Sidebar className={` bg-backgroundSecondary`} header={header} isOpen={filterSidebarIsOpen} orientation="left">
			<div className=" h-full w-full flex flex-col">
				<Suspense fallback={<SearchBarFallback />}>
					<div className=" flex-1 flex flex-col px-8 pb-24 overflow-y-scroll gap-4 pt-4">
						<Sort />
						<div className=" h-[1px] min-h-[1px] w-full bg-gray-200"></div>
						<ProductType />
						<div className=" h-[1px] min-h-[1px] w-full bg-gray-200"></div>
						<Prize />
						<div className=" h-[1px] min-h-[1px] w-full bg-gray-200"></div>
						<Collection />
					</div>
				</Suspense>
			</div>
		</Sidebar>
	);
}

function SearchBarFallback() {
	return <div className=" h-12 w-full bg-gray-200 animate-pulse"></div>;
}
