'use client';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

import { useEffect, useRef, useState } from 'react';
import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

type CollectionSwiperWrapperProps = {
	children: React.ReactNode[];
	props?: SwiperProps;
};

export default function CollectionSwiperWrapper({ children, props }: CollectionSwiperWrapperProps) {
	const swiperContainerRef = useRef<HTMLDivElement>(null);
	const [swiperContainerWidth, setSwiperContainerWidth] = useState(swiperContainerRef.current?.offsetWidth);

	useEffect(() => {
		setSwiperContainerWidth(swiperContainerRef.current?.offsetWidth);
	}, []);

	// get width of the swiper container
	return (
		<div ref={swiperContainerRef} className=" relative">
			<Swiper
				modules={[Scrollbar, A11y]}
				scrollbar
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
