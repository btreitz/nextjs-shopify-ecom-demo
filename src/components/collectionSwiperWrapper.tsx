'use client';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

import { useEffect, useRef, useState } from 'react';
import { Scrollbar, A11y, Mousewheel } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

type SwiperWrapperProps = {
	children: React.ReactNode[];
	props?: SwiperProps;
};

export default function CollectionSwiperWrapper({ children, props }: SwiperWrapperProps) {
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
