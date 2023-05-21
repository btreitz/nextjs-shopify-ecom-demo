import './globals.css';
import { Analytics } from '@vercel/analytics/react';

import { Metadata } from 'next';

import { raleway } from '@/components/fonts';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { BASE_METADATA } from '@/components/shared-metadata';

export const metadata: Metadata = BASE_METADATA;

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
