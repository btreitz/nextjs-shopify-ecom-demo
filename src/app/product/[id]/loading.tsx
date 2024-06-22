export default function Loading() {
	return (
		<div className=" w-full max-w-[1680px] md:px-12 animate-pulse">
			<div className=" md:flex md:gap-12">
				<div className=" w-full relative md:w-3/5 bg-slate-700 opacity-60 aspect-[1/1.2] md:rounded-lg"></div>
				<div className="md:w-2/5 flex flex-col pb-8">
					<div className=" p-4 w-full md:p-8 md:bg-light sticky top-20">
						<div className=" hidden md:block">
							<div className=" bg-slate-700 opacity-60 rounded-lg w-4/5 h-10"></div>
							<div className=" py-4">
								<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
							</div>
						</div>
						<div className=" text-sm leading-6">
							<div className=" bg-slate-700 opacity-60 rounded-lg text-transparent">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Ipsum dolor
								sit amet consectetur adipiscing elit. Maecenas pharetra convallis posuere morbi leo urna molestie at
								elementum. Ut lectus arcu bibendum at.
							</div>
							<div className=" h-[1px] w-full bg-gray-200 my-4" />
							<div className=" flex flex-col gap-2">
								<div className=" bg-slate-700 opacity-60 rounded-full h-4 py-1 w-20"></div>
								<div className=" bg-slate-700 opacity-60 rounded-full h-4 py-1 w-20"></div>
								<div className=" bg-slate-700 opacity-60 rounded-full h-4 py-1 w-20"></div>
							</div>
						</div>
						<div className=" hidden md:block pt-6">
							<div className=" bg-slate-700 opacity-60 h-12 w-full rounded-lg"></div>
						</div>
					</div>
				</div>
			</div>
			{/* About the collection */}
			<div className=" px-4 pb-6 pt-12 md:px-0">
				<div className=" pb-4 md:pt-4">
					<div className=" flex flex-col gap-4">
						<div className=" bg-slate-700 opacity-60 h-10 w-96 max-w-[80%] rounded-lg"></div>
						<div className=" bg-slate-700 opacity-60 h-5 w-[600px] max-w-[90%] rounded-lg"></div>
					</div>
					{/* Recommend products from the same collection */}
					<div className=" py-4">
						<div className=" bg-slate-700 opacity-60 h-60 w-full rounded-lg"></div>
					</div>
				</div>
				{/* Recommend products from the same product type */}
				<div className=" pb-4 md:pt-4">
					<div className=" flex flex-col gap-4">
						<div className=" bg-slate-700 opacity-60 h-10 w-96 max-w-[80%] rounded-lg"></div>
					</div>
					{/* Recommend products from the same collection */}
					<div className=" py-4">
						<div className=" bg-slate-700 opacity-60 h-60 w-full rounded-lg"></div>
					</div>
				</div>
			</div>

			<div className=" md:hidden fixed bottom-0 w-full flex flex-col bg-light bg-opacity-95 p-4 z-20 border-t">
				<div className=" flex flex-row justify-between pb-4 px-1 items-center">
					<div className=" bg-slate-700 opacity-60 rounded-full h-8 w-2/4"></div>
					<div className=" bg-slate-700 opacity-60 rounded-full h-5 w-24"></div>
				</div>
				<div className=" w-full">
					<div className=" bg-slate-700 opacity-60 h-12 w-full rounded-lg"></div>
				</div>
			</div>
		</div>
	);
}
