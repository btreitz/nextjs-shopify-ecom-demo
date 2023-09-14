import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';
import { useState } from 'react';

const MIN_PRIZE = 0;
const MAX_PRIZE = 5000;
let timeout: NodeJS.Timeout | null = null;

type PrizeProps = {};

export default function Prize({}: PrizeProps) {
	const [value, setValue] = useState<[number, number]>([MIN_PRIZE, MAX_PRIZE]);

	const handleOnChange = (value: [number, number]) => {
		setValue(value);

		// if the value does not change within 500ms, then update the url
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			console.log('update url');
		}, 500);
	};

	return (
		<div>
			<div className=" text-md pb-4 pt-0">Prize</div>
			<div className=" pb-2">
				<Slider
					range={true}
					value={value}
					onChange={(newValue) => handleOnChange(newValue as [number, number])}
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
				<div>{value[0].toFixed(2)} €</div>
				<div>{value[1].toFixed(2)} €</div>
			</div>
		</div>
	);
}
