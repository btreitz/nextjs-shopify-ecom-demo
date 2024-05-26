'use client';

import { LocalStorageProvider } from '@/utils/contexts/localStorage';
import { SidebarsProvider } from '@/utils/contexts/sidebars';

type ProviderProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
	return (
		<LocalStorageProvider>
			<SidebarsProvider>{children}</SidebarsProvider>
		</LocalStorageProvider>
	);
}
