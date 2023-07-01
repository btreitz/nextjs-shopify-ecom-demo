import Image from 'next/image';

type MarketingCardProps = {
	title: string;
	text: string;
	image: string;
};

export default function MarketingCard({ title, text, image }: MarketingCardProps) {
	return (
		<div className=" shadow-card relative rounded-2xl overflow-hidden max-w-full group/card">
			<div className=" absolute bg-black opacity-0 w-full h-full -left-full blur-[115px] transition-all duration-700 group-hover/card:-left-1/4 group-hover/card:opacity-100 z-20" />
			<div className=" absolute w-full h-full z-30 text-left p-6 -left-full transition-all duration-300 group-hover/card:left-0 text-white">
				<div className=" text-3xl font-bold pb-4">{title}</div>
				<div>{text}</div>
			</div>
			<Image
				src={image}
				alt="marketing image"
				width={320}
				height={320}
				style={{ objectFit: 'contain' }}
				className=" z-10"
			/>
		</div>
	);
}
