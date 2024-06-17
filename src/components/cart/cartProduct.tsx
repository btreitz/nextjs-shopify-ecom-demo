'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { CartLocalStorage } from '../addToCart';
import CartProductImage from './cartProductImage';
import { ImageDetails } from '@/app/inventory/page';
import Add from '../icons/Add';
import Remove from '../icons/Remove';
import AddToFavorites from '../addToFavorites';
import Link from 'next/link';

type CartProductProps = {
	encodedId: string;
	title: string;
	price: number;
	images: ImageDetails[];
};

export default function CartProduct({ encodedId, title, price, images }: CartProductProps) {
	const { data: items, setKeyValue } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	const currentProduct = items?.find(({ id }) => id === encodedId);
	const amount = currentProduct?.amount || 1;
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
			<div className="bg-gray-400 w-36">
				{images.length >= 1 && (
					<CartProductImage
						encodedId={encodedId}
						title={title}
						src={images[0].src}
						dimensions={{
							width: images[0].dimensions?.width || 768,
							height: images[0].dimensions?.height || 1024,
						}}
					/>
				)}
			</div>
			<div className="flex-1 pl-4 flex justify-between">
				<div className="flex flex-col justify-between">
					<Link href={`/product/${encodedId}`}>
						<div className="text-lg">{title}</div>
					</Link>
					<div className="text-sm">
						<AddToFavorites encodedId={encodedId} heartHeight={24} />
					</div>
				</div>
				<div className="flex flex-col justify-between items-end">
					<div className="flex justify-evenly gap-1 text-lg">
						<button onClick={() => changeAmount(-1)} className=" hoverable">
							<Remove className={` ${amount === 1 && 'hover:fill-red-700'}`} />
						</button>
						<div className=" text-xl w-6 text-center">{amount}</div>
						<button onClick={() => changeAmount(1)} className=" hoverable">
							<Add />
						</button>
					</div>
					<div>{total.toFixed(2)} €</div>
				</div>
			</div>
		</div>
	);
}
