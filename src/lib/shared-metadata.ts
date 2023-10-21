import { Metadata } from 'next';

export const METADATA_TITLE_BASE = 'Vörðr Sæde';

export const BASE_METADATA: Metadata = {
	title: `Home | ${METADATA_TITLE_BASE}`,
	description: 'Highend home furniture by Vörðr Sæde',
	metadataBase: new URL(`https://${process.env.VERCEL_URL}`) || new URL(`http://localhost:${process.env.PORT || 3000}`),
	openGraph: {
		title: `Home | ${METADATA_TITLE_BASE}`,
		description: 'Highend home furniture by Vörðr Sæde',
		images: [
			{
				url: '/images/logo/logo-main-full.png',
			},
		],
	},
};
