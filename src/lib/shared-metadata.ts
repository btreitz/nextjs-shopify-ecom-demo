import { Metadata } from 'next';

export const METADATA_TITLE_BASE = 'Vörðr Sæde';

export const BASE_METADATA: Metadata = {
	title: `Home | ${METADATA_TITLE_BASE}`,
	description: 'Highend home furniture by Vörðr Sæde',
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
