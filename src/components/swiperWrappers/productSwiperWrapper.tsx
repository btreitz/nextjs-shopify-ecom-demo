'use client';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/navigation';

import { A11y, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
import ZoomIcon from '../icons/Zoom';
import { useRef, useState } from 'react';
import DialogModal from '../dialogModal';
import BurgerButton from '../layout/burgerButton';

type ProductSwiperWrapperProps = {
	children: React.ReactNode[];
	productTitle: string;
	props?: SwiperProps;
};

export default function ProductSwiperWrapper({ children, productTitle, props }: ProductSwiperWrapperProps) {
	const [openDialog, setOpenDialog] = useState(false);
	const swiperRef = useRef<SwiperRef>(null);
	return (
		<>
			<Swiper
				ref={swiperRef}
				modules={[A11y, Pagination]}
				pagination={{
					dynamicBullets: true,
					clickable: true,
				}}
				slidesPerView={1}
				loop={true}
				{...props}
			>
				{children.map((child, index) => (
					<SwiperSlide key={index}>
						<div key={index} className=" w-full">
							{child}
							<div className=" h-8 w-full" />
						</div>
					</SwiperSlide>
				))}
				<div
					className=" absolute top-3 right-3 z-10 opacity-60 hover:opacity-100 hover:cursor-pointer"
					onClick={() => setOpenDialog(true)}
				>
					<ZoomIcon />
				</div>
			</Swiper>
			<DialogModal
				openModal={openDialog}
				closeModal={() => setOpenDialog(false)}
				props={{ className: ' w-full h-full bg-background' }}
			>
				<div className=" w-full h-full flex flex-col ">
					<div className=" sticky top-0 flex justify-between h-16 items-center border-b border-gray-200 px-8 bg-light z-10">
						<div>{productTitle}</div>
						<BurgerButton isOpen={openDialog} setIsOpen={setOpenDialog} />
					</div>
					<div className=" flex justify-center max-h-[calc(100%-4rem)]">
						<Swiper
							initialSlide={swiperRef.current?.swiper.activeIndex || 0}
							modules={[A11y, Navigation, Pagination]}
							slidesPerView={1}
							navigation={true}
							loop={true}
							pagination={{
								dynamicBullets: true,
								clickable: true,
							}}
						>
							{children.map((child, index) => (
								<SwiperSlide key={index}>
									<div className=" h-full">{child}</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</DialogModal>
		</>
	);
}
