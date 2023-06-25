import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className=" flex flex-col w-full">
			<div className=" border w-full relative">
				<div className=" absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center text-primary">
					<h1 className=" text-5xl font-bold">Vörðr Sæde</h1>
					<p className=" pb-8">
						Transform your living space with the captivating allure of Scandinavian design - discover the perfect blend
						of timeless elegance and functional simplicity.
					</p>
					<Link
						href={{ pathname: '/inventory' }}
						className=" w-56 p-3 backdrop-blur border border-black rounded-full transition ease-out duration-200 text-center hover:bg-white/50 hover:scale-105"
					>
						<div>EXPLORE</div>
					</Link>
				</div>
				<Image
					src="/images/banner-hero.png"
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
