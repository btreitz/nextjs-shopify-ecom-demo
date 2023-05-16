import './globals.css';
import { Analytics } from '@vercel/analytics/react';

import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'ECOM - DEMO',
	description: 'Demo E-Commerce Store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<header className=" h-20 sticky top-0 w-full backdrop-blur-sm bg-white/50 flex flex-col ">
					<nav className=" h-full w-full flex flex-row justify-between items-center px-5">
						<button>Burger Menu</button>
						<Link href="#">Logo in middle</Link>
						<div className=" flex flex-row gap-3">
							<Link href="#">Cart</Link>
							<button>Login</button>
						</div>
					</nav>
					<div className=" border-b border-gray-200" />
				</header>
				{children}
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
