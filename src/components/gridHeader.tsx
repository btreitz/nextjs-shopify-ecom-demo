type GridHeaderProps = {
	text: string;
};

export default function GridHeader({ text }: GridHeaderProps) {
	return (
		<div className=" flex justify-end text-sm pt-1 pb-4 items-center">
			<div className=" opacity-60 hover:opacity-100">{text}</div>
		</div>
	);
}
