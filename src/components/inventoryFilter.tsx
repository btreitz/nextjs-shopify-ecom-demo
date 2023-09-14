'use client';

import { motion } from 'framer-motion';

import FilterIcon from '@/components/icons/Filter';
import { useContext } from 'react';
import { SideBarContext } from './layout/contexts';

const sortVariants = {
	dateDesc: 'Newest',
	dateAsc: 'Oldest',
	prizeAsc: 'Price: Low to High',
	prizeDesc: 'Price: High to Low',
	productType: 'Product Type',
	name: 'Name: a to z',
} as const;
type SortVariant = keyof typeof sortVariants;

type InventoryFilterProps = {};

export default function InventoryFilter({}: InventoryFilterProps) {
	const { rightIsOpen, setRightIsOpen } = useContext(SideBarContext);

	return (
		<motion.div
			initial={{ y: '5rem' }}
			animate={{ y: 0 }}
			className=" sticky bottom-10 text-white text-sm my-12 flex flex-row justify-center gap-2 bg-primary rounded px-4 py-2"
			onClick={() => setRightIsOpen(!rightIsOpen)}
		>
			Filter <FilterIcon className=" h-5 w-6 fill-white" />
		</motion.div>
	);
}
