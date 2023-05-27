import Link from 'next/link';

export default function Footer() {
	return (
		<footer className=" backdrop-blur-sm bg-white/50 border-y border-gray-200 relative z-0">
			<div className=" mx-auto w-full max-w-screen-xl my-14 px-5">
				<div className=" flex flex-col sm:flex-row gap-4 justify-center mb-12">
					<div className=" w-1/3 flex flex-col items-center">
						<div className=" flex flex-col">
							<h4>Resource 1</h4>
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
							<h4>Resource 2</h4>
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
							<h4>Resource 3</h4>
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
