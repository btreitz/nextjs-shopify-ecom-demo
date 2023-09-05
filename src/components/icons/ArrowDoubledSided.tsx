type ArrowDoubleSidedProps = {
	className?: string;
};

export default function ArrowDoubleSided({ className }: ArrowDoubleSidedProps = {}) {
	return (
		<svg className={` ${className}`} xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
			<path d="M307.846-349.231 176.307-480.769l131.539-131.539 24.333 24.257-90.513 90.359 476.052.769-89.513-91.282 23.334-23.334L783.077-480 651.539-348.461l-23.334-23.334 89.513-91.282-476.821.154 90.282 90.359-23.333 23.333Z" />
		</svg>
	);
}
