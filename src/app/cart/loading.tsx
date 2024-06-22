import SkeletonCartProduct from '@/components/skeletons/skeletonCartProduct';
import SkeletonCartSummary from '@/components/skeletons/skeletonCartSummary';
import SkeletonCartSummaryMobile from '@/components/skeletons/skeletonCartSummaryMobile';

export default function Loading() {
	return (
		<div className=" animate-pulse w-full max-w-[1680px] md:px-12">
			<div className=" md:flex md:gap-12">
				<div className=" w-full md:w-3/5">
					<SkeletonCartProduct />
					<div className=" h-[1px] w-full bg-gray-200 my-4" />
					<SkeletonCartProduct />
					<div className=" h-[1px] w-full bg-gray-200 my-4" />
					<SkeletonCartProduct />
					<div className=" h-[1px] w-full bg-gray-200 my-4" />
				</div>
				<SkeletonCartSummary />
			</div>
			<SkeletonCartSummaryMobile />
		</div>
	);
}
