type SortProps = {
	className?: string;
};

export default function Sort({ className }: SortProps = {}) {
	return (
		<svg
			className={` ${className}`}
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 -960 960 960"
			fill="#000000"
		>
			<path d="M160-280v-33.846h190V-280H160Zm0-183.077v-33.846h414.616v33.846H160Zm0-183.077V-680h640v33.846H160Z" />
		</svg>
	);
}
