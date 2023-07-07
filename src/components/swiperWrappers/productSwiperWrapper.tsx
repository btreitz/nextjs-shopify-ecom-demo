'use client';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

import { A11y, Pagination, Mousewheel } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

type ProductSwiperWrapperProps = {
	children: React.ReactNode[];
	props?: SwiperProps;
};

export default function ProductSwiperWrapper({ children, props }: ProductSwiperWrapperProps) {
	return (
		<Swiper
			modules={[A11y, Pagination, Mousewheel]}
			pagination={{
				dynamicBullets: true,
				clickable: true,
			}}
			slidesPerView={1}
			mousewheel={true}
			loop={true}
			{...props}
		>
			{children.map((child, index) => (
				<SwiperSlide key={index}>{child}</SwiperSlide>
			))}
		</Swiper>
	);
}
