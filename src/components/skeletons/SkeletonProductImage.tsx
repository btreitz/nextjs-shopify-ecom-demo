export default function SkeletonProductImage() {
	return (
		<div className=" w-full sm:basis-1/2 flex flex-col">
			<div className=" w-full h-full aspect-[1/1.33] bg-slate-700 opacity-60 rounded-lg"></div>
			<div className=" flex flex-col py-2 gap-2">
				<div className=" w-2/4 bg-slate-700 h-6 opacity-60 rounded-full"></div>
				<div className=" w-1/5 bg-slate-700 h-4 opacity-60 rounded-full"></div>
			</div>
		</div>
	);
}
