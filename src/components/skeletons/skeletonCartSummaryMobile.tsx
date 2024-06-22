export default function SkeletonCartSummaryMobile() {
	return (
		<div className=" md:hidden fixed bottom-0 w-full flex flex-col bg-light bg-opacity-95 p-4 z-20 border-t">
			<div className=" flex flex-col pb-4 px-1">
				<div className=" bg-slate-700 opacity-60 rounded-full h-8 w-40"></div>
				<div className=" py-3 flex flex-col gap-1">
					<div className=" flex justify-between">
						<div className=" bg-slate-700 opacity-60 rounded-full h-4 w-24"></div>
						<div className=" bg-slate-700 opacity-60 rounded-full h-4 w-24"></div>
					</div>
					<div className=" flex justify-between">
						<div className=" bg-slate-700 opacity-60 rounded-full h-4 w-24"></div>
						<div className=" bg-slate-700 opacity-60 rounded-full h-4 w-24"></div>
					</div>
					<div className=" flex justify-between">
						<div className=" bg-slate-700 opacity-60 rounded-full h-4 w-24"></div>
						<div className=" bg-slate-700 opacity-60 rounded-full h-4 w-24"></div>
					</div>
				</div>
			</div>
			<div className=" w-full">
				<div className=" bg-slate-700 opacity-60 rounded-lg h-12"></div>
			</div>
		</div>
	);
}
