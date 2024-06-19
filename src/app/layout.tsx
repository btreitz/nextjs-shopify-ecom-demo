import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Metadata, Viewport } from 'next';

import { raleway } from '@/lib/fonts';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { BASE_METADATA } from '@/lib/shared-metadata';
import { Providers } from './providers';

export const metadata: Metadata = BASE_METADATA;
export const viewport: Viewport = {
	themeColor: '#faf5f1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${raleway.className} bg-background text-foreground`}>
				<Providers>
					<Header />
					<main className="flex min-h-screen flex-col items-center">{children}</main>
					<Footer />
					<Analytics />
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	);
}
