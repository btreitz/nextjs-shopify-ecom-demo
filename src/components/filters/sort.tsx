import { useState } from 'react';
import BaseFilter from './base';

const sortVariants = {
	dateDesc: 'Date: Newest',
	dateAsc: 'Date: Oldest',
	prizeAsc: 'Price: Low to High',
	prizeDesc: 'Price: High to Low',
	productType: 'Product Type',
	name: 'Name: A-Z',
} as const;
type SortVariant = keyof typeof sortVariants;

type SortProps = {};

export default function Sort({}: SortProps) {
	const [selected, setSelected] = useState<SortVariant>('dateDesc');

	const isSelected = (key: string) => key === selected;
	const onSelect = (key: string) => setSelected(key as SortVariant);

	return <BaseFilter title={'Sort By'} items={sortVariants} isSelected={isSelected} onSelect={onSelect} />;
}
