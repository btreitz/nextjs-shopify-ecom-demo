import Link from 'next/link';

export default function Footer() {
	return (
		<footer className=" backdrop-blur-sm bg-white/50 border-y border-gray-200 relative z-0">
			<div className=" mx-auto w-full max-w-screen-xl my-14 px-5">
				<div className=" flex flex-col sm:flex-row gap-4 justify-center mb-12">
					<div className=" w-1/3 flex flex-col items-center">
						<div className=" flex flex-col">
							<span>Resource 1</span>
							<Link href="#" className=" text-sm hoverable">
								Link 1
							</Link>
							<Link href="#" className=" text-sm hoverable">
								Link 2
							</Link>
							<Link href="#" className=" text-sm hoverable">
								Link 3
							</Link>
						</div>
					</div>
					<div className=" w-1/3 flex flex-col items-center">
						<div className=" flex flex-col">
							<span>Resource 2</span>
							<Link href="#" className=" text-sm hoverable">
								Link 1
							</Link>
							<Link href="#" className=" text-sm hoverable">
								Link 2
							</Link>
							<Link href="#" className=" text-sm hoverable">
								Link 3
							</Link>
						</div>
					</div>
					<div className=" w-1/3 flex flex-col items-center">
						<div className=" flex flex-col">
							<span>Resource 3</span>
							<Link href="#" className=" text-sm hoverable">
								Link 1
							</Link>
							<Link href="#" className=" text-sm hoverable">
								Link 2
							</Link>
							<Link href="#" className=" text-sm hoverable">
								Link 3
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
