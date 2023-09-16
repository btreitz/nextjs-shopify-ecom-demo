export const COOKIE_SEPARATOR = '|';

export const FAVORITES_COOKIE = 'fav';
export const FAVORITES_COOKIE_OPTIONS = {
	path: '/',
	maxAge: 60 * 60 * 24 * 365, // expires after 1 year
	sameSite: true,
};
