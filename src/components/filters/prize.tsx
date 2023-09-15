import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';
import { useCallback, useEffect, useState } from 'react';
import { SUPPORTED_PRODUCT_QUERY_PARAMS } from '@/lib/gql/utils/queryParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MIN_PRIZE = 0;
const MAX_PRIZE = 5000;
let timeout: NodeJS.Timeout | null = null;
const paramNames: [keyof typeof SUPPORTED_PRODUCT_QUERY_PARAMS, keyof typeof SUPPORTED_PRODUCT_QUERY_PARAMS] = [
	'priceMin',
	'priceMax',
];

type PrizeProps = {};

export default function Prize({}: PrizeProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const getInitialRange: () => [number, number] = useCallback(() => {
		const paramValues = paramNames.map((paramName) => searchParams.get(paramName)) as [string | null, string | null];
		const [min, max] = paramValues.map((value) => (value && !isNaN(Number(value)) ? +value : null)) as [
			number | null,
			number | null,
		];

		return [min ? Math.max(MIN_PRIZE, min) : MIN_PRIZE, max ? Math.min(MAX_PRIZE, max) : MAX_PRIZE];
	}, [searchParams]);

	const [range, setRange] = useState<[number, number]>(getInitialRange());

	useEffect(() => {
		const newRange = getInitialRange();
		if (newRange) setRange(newRange);
	}, [getInitialRange]);

	const getUpdateQueryParams = (newRange: [number, number]) => {
		const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

		if (newRange[0] === MIN_PRIZE) {
			newSearchParams.delete(paramNames[0]);
		} else {
			newSearchParams.set(paramNames[0], newRange[0].toString());
		}

		if (newRange[1] === MAX_PRIZE) {
			newSearchParams.delete(paramNames[1]);
		} else {
			newSearchParams.set(paramNames[1], newRange[1].toString());
		}

		return `${pathname}?${newSearchParams.toString()}`;
	};

	const handleOnChange = (newRange: [number, number]) => {
		setRange(newRange);
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			router.prefetch(getUpdateQueryParams(newRange));
		}, 500);
	};

	const handleOnAfterChange = (newRange: [number, number]) => {
		// if the value does not change within 500ms, then update the url
		const url = getUpdateQueryParams(newRange);
		router.push(url);
	};

	return (
		<div>
			<div className=" text-md pb-4 pt-0">Prize</div>
			<div className=" pb-2">
				<Slider
					range={true}
					value={range}
					onChange={(newValue) => handleOnChange(newValue as [number, number])}
					onAfterChange={(newVal) => handleOnAfterChange(newVal as [number, number])}
					pushable={true}
					min={MIN_PRIZE}
					max={MAX_PRIZE}
					step={50}
					trackStyle={[{ height: '3px', backgroundColor: '#000000' }]}
					railStyle={{ height: '3px' }}
					handleStyle={{
						height: '13px',
						width: '13px',
						backgroundColor: '#000000',
						opacity: 1,
						border: 'none',
						marginTop: '-5px',
					}}
					activeDotStyle={{ boxShadow: 'none' }}
				/>
			</div>
			<div className=" w-full flex flex-row justify-between text-sm">
				<div>{range[0].toFixed(2)} €</div>
				<div>{range[1].toFixed(2)} €</div>
			</div>
		</div>
	);
}
