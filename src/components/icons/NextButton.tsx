type NextButtonProps = {
	className?: string;
};

export default function NextButton({ className }: NextButtonProps = {}) {
	return (
		<svg
			className={` ${className}`}
			width="16"
			height="9"
			viewBox="0 0 16 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M16 1.38462L14.5455 0L8 6.23077L1.45455 0L0 1.38462L8 9L16 1.38462Z"
				fill="black"
			></path>
		</svg>
	);
}
