import './globals.css';
import { Analytics } from '@vercel/analytics/react';

import { Metadata } from 'next';
import Link from 'next/link';

import Header from './header';
import { raleway } from './fonts';

export const METADATA_TITLE_BASE = 'ECOM - DEMO';

export const metadata: Metadata = {
	title: `HOME | ${METADATA_TITLE_BASE}`,
	description: 'Demo E-Commerce Store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={raleway.className}>
				<Header />
				<main className="flex min-h-screen flex-col items-center  p-24">{children}</main>
				<footer className=" bg-gray-100 border-y border-gray-200">
					<div className=" mx-auto w-full max-w-screen-xl my-14 px-5">
						<div className=" flex flex-col sm:flex-row gap-4 justify-center mb-12">
							<div className=" w-1/3 flex flex-col items-center">
								<div className=" flex flex-col">
									<h3>Resource 1</h3>
									<Link href="#" className=" text-sm">
										Link 1
									</Link>
									<Link href="#" className=" text-sm">
										Link 2
									</Link>
									<Link href="#" className=" text-sm">
										Link 3
									</Link>
								</div>
							</div>
							<div className=" w-1/3 flex flex-col items-center">
								<div className=" flex flex-col">
									<h4>Resource 2</h4>
									<Link href="#" className=" text-sm">
										Link 1
									</Link>
									<Link href="#" className=" text-sm">
										Link 2
									</Link>
									<Link href="#" className=" text-sm">
										Link 3
									</Link>
								</div>
							</div>
							<div className=" w-1/3 flex flex-col items-center">
								<div className=" flex flex-col">
									<h4>Resource 3</h4>
									<Link href="#" className=" text-sm">
										Link 1
									</Link>
									<Link href="#" className=" text-sm">
										Link 2
									</Link>
									<Link href="#" className=" text-sm">
										Link 3
									</Link>
								</div>
							</div>
						</div>
					</div>
				</footer>
				<Analytics />
			</body>
		</html>
	);
}
