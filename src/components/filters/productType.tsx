'use client';

import { useCallback, useEffect, useState } from 'react';
import BaseFilter from './base';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SUPPORTED_PRODUCT_QUERY_PARAMS } from '@/lib/gql/utils/queryParams';
import { productTypes } from '../layout/collections';

const paramName: keyof typeof SUPPORTED_PRODUCT_QUERY_PARAMS = 'category';

type ProductTypeVariant = keyof typeof productTypes;

type ProductTypeProps = {};

export default function ProductType({}: ProductTypeProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const getInitialSelection: () => ProductTypeVariant[] = useCallback(() => {
		const paramValue = searchParams.getAll(paramName).flatMap((value) => value.split(','));
		// filter out invalid values
		const validValues = paramValue.filter((value) => Object.keys(productTypes).includes(value)) as ProductTypeVariant[];

		return validValues.length >= 1 ? validValues : (Object.keys(productTypes) as ProductTypeVariant[]);
	}, [searchParams]);

	const [selected, setSelected] = useState<ProductTypeVariant[]>(getInitialSelection());

	useEffect(() => {
		const newSelection = getInitialSelection();
		if (newSelection) setSelected(newSelection);
	}, [getInitialSelection, searchParams]);

	const isSelected = (key: string) => selected.includes(key as ProductTypeVariant);

	const onSelect = (key: string) => {
		let newSelection: ProductTypeVariant[] = [];
		if (isSelected(key)) {
			newSelection = selected.filter((item) => item !== key);
		} else {
			newSelection = [...selected, key as ProductTypeVariant];
		}
		setSelected(newSelection);
		updateQueryParams(newSelection);
	};

	const updateQueryParams = (newSelection: ProductTypeVariant[]) => {
		const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
		if (newSelection.length === 0 || newSelection.length === Object.keys(productTypes).length) {
			newSearchParams.delete(paramName);
		} else {
			newSearchParams.set(paramName, newSelection.join(','));
		}

		const url = `${pathname}?${newSearchParams.toString()}`;
		router.push(url);
	};

	return <BaseFilter title="Product Types" items={productTypes} isSelected={isSelected} onSelect={onSelect} />;
}
