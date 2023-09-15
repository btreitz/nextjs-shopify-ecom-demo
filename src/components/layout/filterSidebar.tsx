'use client';

import { RefObject, useContext } from 'react';
import { SideBarContext } from './contexts';
import Sidebar from '../sidebar';
import Sort from '../filters/sort';
import ProductType from '../filters/productType';
import Prize from '../filters/prize';
import Collection from '../filters/collection';
import { useRouter } from 'next/navigation';

type FilterSidebarProps = {
	header: RefObject<HTMLElement>;
};

export default function FilterSidebar({ header }: FilterSidebarProps) {
	const { filterSidebarIsOpen, setFilterSidebarIsOpen } = useContext(SideBarContext);
	const router = useRouter();

	return (
		<Sidebar className={` bg-backgroundSecondary`} header={header} isOpen={filterSidebarIsOpen} orientation="left">
			<div className=" h-full w-full flex flex-col">
				<div className=" flex-1 flex flex-col px-8 pb-8 overflow-y-scroll gap-4 pt-4">
					<Sort />
					<div className=" h-[1px] min-h-[1px] w-full bg-gray-200"></div>
					<ProductType />
					<div className=" h-[1px] min-h-[1px] w-full bg-gray-200"></div>
					<Prize />
					<div className=" h-[1px] min-h-[1px] w-full bg-gray-200"></div>
					<Collection />
				</div>

				<div className=" border-t-[1px] border-black flex flex-row p-2 gap-2 text-sm">
					<div
						className=" flex-1 text-center border-[1px] border-black rounded py-2"
						onClick={() => router.push('/inventory')}
					>
						Reset
					</div>
					<div
						className=" flex-1 text-center border-[1px] border-primary rounded py-2 bg-primary text-white"
						onClick={() => setFilterSidebarIsOpen(false)}
					>
						Apply
					</div>
				</div>
			</div>
		</Sidebar>
	);
}
