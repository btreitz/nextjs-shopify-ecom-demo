'use client';

import { MouseEvent, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion';

import Heart from './icons/Heart';
import { COOKIE_SEPARATOR, FAVORITES_COOKIE, FAVORITES_COOKIE_OPTIONS } from './cookies';

type FavorizeProps = {
	id: string;
	heartHeight?: number;
	className?: string;
};

export default function Favorize({ id, heartHeight = 26, className }: FavorizeProps) {
	const [cookies, setCookie] = useCookies([FAVORITES_COOKIE]);
	const idIsInCookie: boolean = useMemo(() => {
		return cookies.fav ? (cookies.fav as string).split(COOKIE_SEPARATOR).includes(id) : false;
	}, [cookies.fav, id]);

	const toogleFavorize = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		idIsInCookie ? removeItemFromCookie() : addItemToCookie();
	};

	function addItemToCookie() {
		setCookie(
			FAVORITES_COOKIE,
			cookies.fav ? `${cookies.fav}${COOKIE_SEPARATOR}${id}` : `${COOKIE_SEPARATOR}${id}`,
			FAVORITES_COOKIE_OPTIONS,
		);
	}

	function removeItemFromCookie() {
		const ids = (cookies.fav as string).split(COOKIE_SEPARATOR);
		const index = ids.indexOf(id);
		if (index > -1) {
			ids.splice(index, 1);
		}
		setCookie(FAVORITES_COOKIE, ids.join(COOKIE_SEPARATOR), FAVORITES_COOKIE_OPTIONS);
	}

	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.8 }}
			className={`${className} hoverable`}
			onClick={toogleFavorize}
		>
			<Heart key={id} fill={idIsInCookie ? '#126160' : 'transparent'} height={heartHeight} />
		</motion.button>
	);
}
