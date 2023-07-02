'use client';

import { useEffect, useRef, useState } from 'react';
import { Scrollbar, A11y, Mousewheel } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide, useSwiper } from 'swiper/react';
import NextButton from './icons/NextButton';

type SwiperWrapperProps = {
	children: React.ReactNode[];
	props: SwiperProps;
};

export default function SwiperWrapper({ children, props }: SwiperWrapperProps) {
	const swiper = useSwiper();
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
				navigation
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
			<div className=" absolute h-full top-0 z-10 flex flex-col justify-center -ml-7">
				<button
					className="swiper-button-prev w-12 h-12 bg-primary rounded-full flex justify-center items-center rotate-90"
					aria-label="Prev slide"
					onClick={() => swiper.slidePrev()}
				>
					<NextButton />
				</button>
			</div>
			<div className=" absolute h-full top-0 right-0 z-10 flex flex-col justify-center -mr-7">
				<button
					className="swiper-button-next w-12 h-12 bg-primary rounded-full flex justify-center items-center -rotate-90"
					aria-label="Next slide"
					onClick={() => swiper.slideNext()}
				>
					<NextButton />
				</button>
			</div>
		</div>
	);
}
