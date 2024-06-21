import SkeletonGridHeader from '@/components/skeletons/SkeletonGridHeader';
import SkeletonProductGrid from '@/components/skeletons/SkeletonProductGrid';

export default function Loading() {
	return (
		<div className=" animate-pulse w-full max-w-[1680px] flex flex-col px-4 pb-16 lg:pb-40">
			<SkeletonGridHeader />
			<div className=" h-[1px] w-full bg-gray-200 mb-4" />
			<SkeletonProductGrid />
		</div>
	);
}
