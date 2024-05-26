'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { CartLocalStorage } from '../addToCart';

type CartProductProps = {
	encodedId: string;
	amount: number;
	title: string;
	price: number;
};

export default function CartProduct({ encodedId, amount, title, price }: CartProductProps) {
	const { data: items, setKeyValue } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	const total = price * amount;

	function removeItemFromLocalStorage() {
		const ids = items ? items.filter(({ id }) => id !== encodedId) : [];
		setKeyValue(ids);
	}

	function changeAmount(value: -1 | 1) {
		const newAmount = amount + value;
		if (newAmount < 1) {
			removeItemFromLocalStorage();
			return;
		}
		setKeyValue(
			items
				? items.map((i) => (i.id === encodedId ? { ...i, amount: newAmount } : i))
				: [{ id: encodedId, amount: newAmount }],
		);
	}

	return (
		<div className="flex h-60 p-4 gap-4">
			<div className="bg-gray-400 w-36"></div>
			<div className="flex-1 pl-4 flex justify-between">
				<div className="flex flex-col justify-between">
					<div className="text-lg">{title}</div>
					<div className="text-sm">
						<div>Add to favorites</div>
					</div>
				</div>
				<div className="flex flex-col justify-between items-end">
					<div className="flex justify-evenly gap-2 text-lg">
						<button onClick={() => changeAmount(-1)} className=" hoverable">
							&lt;
						</button>
						<div className=" text-xl w-6 text-center">{amount}</div>
						<button onClick={() => changeAmount(1)} className=" hoverable">
							&gt;
						</button>
					</div>
					<div>{total} €</div>
				</div>
			</div>
		</div>
	);
}
