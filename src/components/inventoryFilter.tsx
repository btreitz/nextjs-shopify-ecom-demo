'use client';

import { motion } from 'framer-motion';

import FilterIcon from '@/components/icons/Filter';
import { useContext } from 'react';
import { SideBarContext } from './layout/contexts';
import { useRouter } from 'next/navigation';

const filterFooterVariants = {
	hidden: { y: '100%' },
	visible: { y: 0, zIndex: 50 },
};

type InventoryFilterProps = {};

export default function InventoryFilter({}: InventoryFilterProps) {
	const { filterSidebarIsOpen, setFilterSidebarIsOpen } = useContext(SideBarContext);
	const router = useRouter();

	return (
		<>
			<motion.div
				initial={{ y: '7rem' }}
				animate={{ y: 0 }}
				transition={{ ease: 'easeOut', duration: 0.2 }}
				className=" fixed bottom-4 text-white my-12 flex flex-row justify-center items-center gap-2 bg-primary rounded px-5 py-2"
				onClick={() => setFilterSidebarIsOpen(!filterSidebarIsOpen)}
			>
				Filter <FilterIcon className=" h-5 w-6 fill-white" />
			</motion.div>
			<motion.div
				initial={'hidden'}
				animate={filterSidebarIsOpen ? 'visible' : 'hidden'}
				transition={{ ease: 'easeOut', duration: 0.3, delay: 0.3 }}
				variants={filterFooterVariants}
				className=" fixed bottom-0 w-full border-t-[1px] border-gray-200 flex flex-row p-4 gap-2 bg-light bg-opacity-95"
			>
				<div
					className=" w-1/4 text-center border-[1px] border-gray-400 rounded py-2"
					onClick={() => router.push('/inventory')}
				>
					Reset
				</div>
				<div
					className=" w-3/4 text-center border-[1px] border-primary rounded py-2 bg-primary text-white"
					onClick={() => setFilterSidebarIsOpen(false)}
				>
					Apply
				</div>
			</motion.div>
		</>
	);
}
