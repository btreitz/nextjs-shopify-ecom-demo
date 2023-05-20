import './globals.css';
import { Analytics } from '@vercel/analytics/react';

import { Metadata } from 'next';

import Header from './header';
import { raleway } from './fonts';
import Footer from './footer';

export const METADATA_TITLE_BASE = 'Vörðr Sæde';

export const metadata: Metadata = {
	title: `HOME | ${METADATA_TITLE_BASE}`,
	description: 'Highend home furniture by Vörðr Sæde',
	openGraph: {
		title: `HOME | ${METADATA_TITLE_BASE}`,
		description: 'Highend home furniture by Vörðr Sæde',
		images: [
			{
				url: '/images/logo/logo.png',
			},
		],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${raleway.className} bg-background text-foreground`}>
				<Header />
				<main className="flex min-h-screen flex-col items-center  p-24">{children}</main>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
