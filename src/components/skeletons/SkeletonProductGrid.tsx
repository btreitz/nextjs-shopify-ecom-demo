import SkeletonProductImage from './SkeletonProductImage';

export default function SkeletonProductGrid() {
	return (
		<div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
			<SkeletonProductImage />
		</div>
	);
}
