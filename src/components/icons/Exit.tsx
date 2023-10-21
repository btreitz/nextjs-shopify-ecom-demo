type ExitProps = {
	className?: string;
};

export default function Exit({ className }: ExitProps = {}) {
	return (
		<div className={` ${className} flex flex-col h-8 w-12 justify-evenly items-center group`}>
			<div
				className={
					' h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 rotate-45 translate-y-[8px]'
				}
			/>
			<div
				className={
					' h-[1px] rounded-full bg-black transition-all ease-out duration-200 opacity-60 group-hover:opacity-100 w-0'
				}
			/>
			<div
				className={
					' h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 -rotate-45 -translate-y-[8px]'
				}
			/>
		</div>
	);
}
