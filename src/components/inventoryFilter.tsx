'use client';

import { motion } from 'framer-motion';

import FilterIcon from '@/components/icons/Filter';
import { useContext } from 'react';
import { SideBarContext } from './layout/contexts';

type InventoryFilterProps = {};

export default function InventoryFilter({}: InventoryFilterProps) {
	const { filterSidebarIsOpen, setFilterSidebarIsOpen } = useContext(SideBarContext);

	return (
		<motion.div
			initial={{ y: '5rem' }}
			animate={{ y: 0 }}
			className=" sticky bottom-10 text-white text-sm my-12 flex flex-row justify-center gap-2 bg-primary rounded px-4 py-2"
			onClick={() => setFilterSidebarIsOpen(!filterSidebarIsOpen)}
		>
			Filter <FilterIcon className=" h-5 w-6 fill-white" />
		</motion.div>
	);
}
