// src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
		SHOPIFY_STOREFRONT_API_URL: z.string().url(),
		SHOPIFY_STOREFRONT_API_ACCESS_TOKEN: z.string(),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		SHOPIFY_STOREFRONT_API_URL: process.env.SHOPIFY_STOREFRONT_API_URL,
		SHOPIFY_STOREFRONT_API_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
	},
});
