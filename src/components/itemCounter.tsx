type ItemCounterProps = {
	count: number;
};

export default function ItemCounter({ count }: ItemCounterProps) {
	return (
		<div className=" absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full text-[8px] min-w-[12px] text-center">
			{count}
		</div>
	);
}
