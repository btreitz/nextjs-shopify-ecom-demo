import Link from 'next/link';
import Image from 'next/image';

type CartProductImageProps = {
	encodedId: string;
	title: string;
	src: string;
	dimensions: {
		width: number;
		height: number;
	};
};

export default function CartProductImage({ encodedId, title, src, dimensions }: CartProductImageProps) {
	return (
		<div className=" w-full h-full">
			<Link href={`/product/${encodedId}`}>
				<Image
					alt={title}
					src={src}
					className=" object-cover h-full"
					width={dimensions.width}
					height={dimensions.height}
				/>
			</Link>
		</div>
	);
}
