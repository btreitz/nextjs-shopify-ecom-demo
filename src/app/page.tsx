import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className=" flex flex-col w-full">
			<div className=" border w-full relative">
				<div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
					<Link href={{ pathname: '/inventory' }}>
						<div className=" w-56 p-3 backdrop-blur border border-black transition ease-out duration-200 text-center hover:bg-white/50 hover:scale-105">
							EXPLORE
						</div>
					</Link>
				</div>
				<Image
					src="/images/banner.png"
					alt="banner home"
					className=" w-full min-h-[calc(100vh-5rem)] object-cover z-10"
					width={1344}
					height={896}
				/>
			</div>
			<h1>Hello Home</h1>
		</div>
	);
}
