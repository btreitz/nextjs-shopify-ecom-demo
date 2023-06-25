type BurgerButtonProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

export default function BurgerButton({ isOpen, setIsOpen }: BurgerButtonProps) {
	return (
		<button className="flex flex-col h-8 w-12 justify-evenly items-center group" onClick={() => setIsOpen(!isOpen)}>
			<div
				className={` h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 ${
					isOpen && ' rotate-45 translate-y-[8px]'
				}`}
			/>
			<div
				className={` h-[1px] rounded-full bg-black transition-all ease-out duration-200 opacity-60 group-hover:opacity-100 ${
					isOpen ? ' w-0' : ' w-6'
				}`}
			/>
			<div
				className={` h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 ${
					isOpen && ' -rotate-45 -translate-y-[8px]'
				}`}
			/>
		</button>
	);
}
