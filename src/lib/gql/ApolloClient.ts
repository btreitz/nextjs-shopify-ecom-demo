import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { env } from '../env.mjs';

export const { getClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			// this needs to be an absolute url, as relative urls cannot be used in SSR
			uri: env.SHOPIFY_STOREFRONT_API_URL,
			headers: {
				'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
			},
			// you can disable result caching here if you want to
			// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
			// fetchOptions: { cache: "no-store" },
		}),
	});
});
