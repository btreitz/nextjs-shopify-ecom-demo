'use client';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

import { A11y, Mousewheel, Scrollbar } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

type RecommendationWrapperProps = {
	children: React.ReactNode[];
	props?: SwiperProps;
};

export default function RecomendationSwiperWrapper({ children, props }: RecommendationWrapperProps) {
	const swiperContainerRef = useRef<HTMLDivElement>(null);
	const [swiperContainerWidth, setSwiperContainerWidth] = useState(swiperContainerRef.current?.offsetWidth);

	useEffect(() => {
		setSwiperContainerWidth(swiperContainerRef.current?.offsetWidth);
	}, []);

	// get width of the swiper container
	return (
		<div ref={swiperContainerRef} className=" relative">
			<Swiper
				modules={[Scrollbar, A11y, Mousewheel]}
				scrollbar
				mousewheel
				slidesPerView={swiperContainerWidth && swiperContainerWidth > 600 ? 3 : 2}
				loop={true}
				spaceBetween={15}
				{...props}
			>
				{children.map((child, index) => (
					<SwiperSlide key={index}>{child}</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
