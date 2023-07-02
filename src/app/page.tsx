import MarketingCard from '@/components/marketingCard';
import { ARTISTRY_TEXT, EXCELLENCE_TEXT, OPULENCE_TEXT } from '@/lib/consts';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className=" flex flex-col w-full">
			<section className=" border w-full relative">
				<div className=" absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center text-primary w-3/4 sm:max-w-2xl">
					<h1 className=" text-6xl font-bold tracking-tight pb-11">Vörðr Sæde</h1>
					<p className=" pb-6">
						Transform your living space with the captivating allure of Scandinavian design - discover the perfect blend
						of timeless elegance and functional simplicity.
					</p>
					<Link
						href={{ pathname: '/inventory' }}
						className=" w-56 p-3 backdrop-blur border border-black rounded-full transition ease-out duration-200 text-center hover:bg-white/50 hover:scale-105 tracking-widest"
					>
						explore
					</Link>
				</div>
				<Image
					src="/images/banner/banner-hero.png"
					alt="banner home"
					className=" w-full min-h-[calc(100vh-5rem)] object-cover z-10"
					width={1344}
					height={896}
				/>
			</section>
			<section className=" w-full text-center pb-12 px-6 sm:px-12">
				<div>
					<h1>we offer ...</h1>
					<div className=" flex flex-row justify-center flex-wrap gap-6">
						<MarketingCard title={'Excellence'} text={EXCELLENCE_TEXT} image={'/images/marketing/material-wood.png'} />
						<MarketingCard title={'Opulence'} text={OPULENCE_TEXT} image={'/images/marketing/design.png'} />
						<MarketingCard title={'Artistry'} text={ARTISTRY_TEXT} image={'/images/marketing/lamp-glass.png'} />
					</div>
				</div>
			</section>
			<section className=" w-full p-4">
				<div className="w-full bg-[#f1dce5] rounded-2xl flex flex-col items-center sm:flex-row ">
					<div className=" w-full p-8 sm:w-1/3">
						<h2 className=" text-3xl font-semibold pt-0">Collection 1</h2>
						<p>
							Some text about this specific collection. This text is fetched from shopify directly but it should not be
							muhc longer than this text here
						</p>
					</div>
					<div className=" h-96 w-full p-8 sm:w-2/3">
						<div className=" h-full border border-black ">
							<div className=" text-center mt-36">Here will be a carousel through a single collection</div>
						</div>
					</div>
				</div>
			</section>
			<section className=" w-full pt-0 p-4">
				<div className="w-full bg-[#DCE5F1] rounded-2xl flex flex-col-reverse items-center sm:flex-row ">
					<div className=" h-96 w-full p-8 sm:w-2/3">
						<div className=" h-full border border-black ">
							<div className=" text-center mt-36">Here will be a carousel through a single collection</div>
						</div>
					</div>
					<div className=" w-full p-8 sm:w-1/3 text-end">
						<h2 className=" text-3xl font-semibold pt-0">Collection 2</h2>
						<p>
							Some text about this specific collection. This text is fetched from shopify directly but it should not be
							muhc longer than this text here
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
