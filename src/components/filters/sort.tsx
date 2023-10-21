'use client';

import { useCallback, useEffect, useState } from 'react';
import BaseFilter from './base';
import { sortParam, sortVariants } from '@/lib/clientExports';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const processedSortVariants: Record<string, string> = {};
for (const [key, value] of Object.entries(sortVariants)) {
	processedSortVariants[key] = value.label;
}

const defaultSortVariant: SortVariant = 'dateDesc';

export type SortVariant = keyof typeof sortVariants;

type SortProps = {};

export default function Sort({}: SortProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isSelected = (key: string) => key === selected;

	const onSelect = (key: SortVariant) => {
		setSelected(key);
		updateQueryParams(key);
	};

	const getInitialSelection: () => SortVariant = useCallback(() => {
		const paramValue = searchParams.get(sortParam);
		return paramValue && paramValue in sortVariants ? (paramValue as SortVariant) : defaultSortVariant;
	}, [searchParams]);

	const [selected, setSelected] = useState<SortVariant>(getInitialSelection());

	useEffect(() => {
		const newSelection = getInitialSelection();
		if (newSelection) setSelected(newSelection);
	}, [getInitialSelection, searchParams]);

	const updateQueryParams = (newSelection: SortVariant) => {
		const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
		if (newSelection === defaultSortVariant) {
			newSearchParams.delete(sortParam);
		} else {
			newSearchParams.set(sortParam, newSelection);
		}

		const url = `${pathname}?${newSearchParams.toString()}`;
		router.push(url);
	};

	return (
		<BaseFilter
			title={'Sort By'}
			items={processedSortVariants}
			isSelected={isSelected}
			onSelect={(key) => onSelect(key as SortVariant)}
		/>
	);
}
