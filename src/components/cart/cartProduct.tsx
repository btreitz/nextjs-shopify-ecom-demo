type CartProductProps = {
	title: string;
	price: number;
};

export default function CartProduct({ title, price }: CartProductProps) {
	return (
		<div className=" flex h-60 p-4 gap-4">
			<div className=" bg-gray-400 w-36"></div>
			<div className=" flex-1 pl-4 flex justify-between">
				<div className=" flex flex-col justify-between">
					<div className=" text-lg">{title}</div>
					<div className=" text-sm">
						<div>Remove</div>
						<div>Add to favorites</div>
					</div>
				</div>
				<div className=" flex flex-col justify-between items-end">
					<div>Set amount</div>
					<div>{price} €</div>
				</div>
			</div>
		</div>
	);
}
