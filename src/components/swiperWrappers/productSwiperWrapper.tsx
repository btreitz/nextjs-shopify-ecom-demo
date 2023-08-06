'use client';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

import { A11y, Pagination, Mousewheel } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import ZoomIcon from '../icons/Zoom';
import { useState } from 'react';
import DialogModal from '../dialogModal';
import BurgerButton from '../layout/burgerButton';

type ProductSwiperWrapperProps = {
	children: React.ReactNode[];
	props?: SwiperProps;
};

export default function ProductSwiperWrapper({ children, props }: ProductSwiperWrapperProps) {
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<Swiper
			modules={[A11y, Pagination, Mousewheel]}
			pagination={{
				dynamicBullets: true,
				clickable: true,
			}}
			slidesPerView={1}
			mousewheel={false}
			loop={true}
			{...props}
		>
			{children.map((child, index) => (
				<SwiperSlide key={index}>{child}</SwiperSlide>
			))}
			<div
				className=" absolute top-3 right-3 z-10 opacity-60 hover:opacity-100 hover:cursor-pointer"
				onClick={() => setOpenDialog(true)}
			>
				<ZoomIcon />
			</div>
			<DialogModal
				openModal={openDialog}
				closeModal={() => setOpenDialog(false)}
				props={{ className: ' w-full h-full' }}
			>
				<div className=" w-full flex flex-col">
					<div className=" sticky top-0 flex justify-between h-16 items-center border-b border-gray-200 px-8 bg-light">
						<div>PLACEHOLDER - TITLE</div>
						<BurgerButton isOpen={openDialog} setIsOpen={setOpenDialog} />
					</div>
					<div className=" overflow-x-scroll px-8 py-6 bg-background h-[2000px]">PLACEHOLDER - CONTENT</div>
				</div>
			</DialogModal>
		</Swiper>
	);
}
