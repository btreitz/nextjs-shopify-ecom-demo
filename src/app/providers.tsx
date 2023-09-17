'use client';

import CookiesProvider from '@/components/contexts/cookies';
import { SidebarsProvider } from '@/components/contexts/sidebars';

type ProviderProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
	return (
		<CookiesProvider>
			<SidebarsProvider>{children}</SidebarsProvider>
		</CookiesProvider>
	);
}
