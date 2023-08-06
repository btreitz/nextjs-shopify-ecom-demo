'use client';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

import { A11y, Scrollbar } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { useEffect, useMemo, useRef, useState } from 'react';

type RecommendationWrapperProps = {
	children: React.ReactNode[];
	maxCardWidth?: number;
	props?: SwiperProps;
};

export default function RecomendationSwiperWrapper({
	children,
	props,
	maxCardWidth = 400,
}: RecommendationWrapperProps) {
	const swiperContainerRef = useRef<HTMLDivElement>(null);
	const [swiperContainerWidth, setSwiperContainerWidth] = useState(swiperContainerRef.current?.offsetWidth);
	const slidesPerView = useMemo(() => {
		if (swiperContainerWidth && swiperContainerWidth / maxCardWidth > 3) {
			return swiperContainerWidth / maxCardWidth;
		} else if (swiperContainerWidth && swiperContainerWidth > 600) {
			return 3;
		}
		return 2;
	}, [maxCardWidth, swiperContainerWidth]);

	useEffect(() => {
		setSwiperContainerWidth(swiperContainerRef.current?.offsetWidth);
	}, []);

	return (
		<div ref={swiperContainerRef} className=" relative">
			<Swiper
				modules={[Scrollbar, A11y]}
				scrollbar
				slidesPerView={slidesPerView}
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
