export default function SkeletonCartSummary() {
	return (
		<div className="md:w-2/5 flex flex-col pb-8">
			<div className=" p-4 w-full md:p-8 md:bg-light sticky top-20">
				<div className=" hidden md:block">
					<div className=" py-2 bg-slate-700 opacity-60 rounded-full h-10 w-40"></div>
					<div className=" py-4">
						<div className=" flex justify-between pt-4 gap-6">
							<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
							<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
						</div>
						<div className=" h-[1px] w-full bg-gray-200 my-4" />
						<div className=" flex justify-between gap-6">
							<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
							<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
						</div>
						<div className=" h-[1px] w-full bg-gray-200 my-4" />
						<div className=" flex justify-between gap-6">
							<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
							<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
						</div>
					</div>
				</div>

				<div className=" hidden md:block pt-6">
					<div className=" bg-slate-700 opacity-60 rounded-lg h-12"></div>
				</div>
			</div>
		</div>
	);
}
