import Image from 'next/image';

type MarketingCardProps = {
	title: string;
	text: string;
	image: string;
};

export default function MarketingCard({ title, text, image }: MarketingCardProps) {
	return (
		<div className=" shadow-card relative rounded-2xl overflow-hidden max-w-full">
			<div className=" absolute w-full h-full">
				<span>{title}</span>
				<span>{text}</span>
			</div>
			<Image src={image} alt="marketing image" width={320} height={320} style={{ objectFit: 'contain' }} />
		</div>
	);
}
