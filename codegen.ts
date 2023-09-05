import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: './src/lib/gql/storefront-schema.json',
	documents: ['./src/lib/gql/operations/*/index.ts'],
	generates: {
		'./src/lib/gql/__generated__/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
