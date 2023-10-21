import Image from 'next/image';
import Link from 'next/link';
import CollectionCard from '@/components/collectionCard';
import MarketingCard from '@/components/marketingCard';
import { ARTISTRY_TEXT, EXCELLENCE_TEXT, OPULENCE_TEXT } from '@/lib/consts';

export default function Home() {
	return (
		<div className=" flex flex-col w-full items-center">
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
					className=" w-full min-h-[calc(100dvh-5rem)] object-cover z-10"
					width={1344}
					height={896}
				/>
			</section>
			<section className=" w-full max-w-[1680px] text-center pb-12 px-6 sm:px-12">
				<div>
					<h1>we offer ...</h1>
					<div className=" flex flex-row justify-center flex-wrap gap-6">
						<MarketingCard title={'Excellence'} text={EXCELLENCE_TEXT} image={'/images/marketing/material-wood.png'} />
						<MarketingCard title={'Opulence'} text={OPULENCE_TEXT} image={'/images/marketing/design.png'} />
						<MarketingCard title={'Artistry'} text={ARTISTRY_TEXT} image={'/images/marketing/lamp-glass.png'} />
					</div>
				</div>
			</section>
			<section className="w-full max-w-[1680px] px-4 py-2">
				{/* @ts-expect-error Server Component */}
				<CollectionCard backgroundColor={'#D3E1C2'} />
			</section>
			<section className="w-full max-w-[1680px] px-4 pt-2 pb-12">
				{/* @ts-expect-error Server Component */}
				<CollectionCard backgroundColor={'#E1D0C2'} rtl={true} newestFirst={false} />
			</section>
		</div>
	);
}
