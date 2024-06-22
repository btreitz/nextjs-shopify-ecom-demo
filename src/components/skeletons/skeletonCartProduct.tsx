export default function SkeletonCartProduct() {
	return (
		<div className="flex h-60 p-4 gap-4">
			<div className="w-36 h-full bg-slate-700 opacity-60 rounded-lg"></div>
			<div className="flex-1 pl-4 flex justify-between gap-4">
				<div className="flex flex-col justify-between">
					<div className=" bg-slate-700 opacity-60 rounded-full w-48 h-8"></div>
					<div className=" bg-slate-700 opacity-60 rounded-full w-8 h-8"></div>
				</div>
				<div className="flex flex-col justify-between items-end">
					<div className=" bg-slate-700 opacity-60 rounded-full w-24 h-8"></div>
					<div className=" bg-slate-700 opacity-60 rounded-full w-24 h-8"></div>
				</div>
			</div>
		</div>
	);
}
