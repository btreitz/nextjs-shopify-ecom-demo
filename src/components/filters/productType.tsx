import { useState } from 'react';
import BaseFilter from './base';

const productTypeVariants = {
	chair: 'Chair',
	lamp: 'Lamp',
	table: 'Table',
} as const;
type ProductTypeVariant = keyof typeof productTypeVariants;

type ProductType = {};

export default function ProductType({}: ProductType) {
	const [selected, setSelected] = useState<ProductTypeVariant[]>(['chair', 'lamp', 'table']);

	const isSelected = (key: string) => selected.includes(key as ProductTypeVariant);
	const onSelect = (key: string) => {
		if (isSelected(key)) {
			setSelected(selected.filter((item) => item !== key));
		} else {
			setSelected([...selected, key as ProductTypeVariant]);
		}
	};

	return <BaseFilter title="Product Type" items={productTypeVariants} isSelected={isSelected} onSelect={onSelect} />;
}
