# Ecom-Demo: A Next.js E-commerce Application

This project is a modern e-commerce application built using [Next.js](https://nextjs.org/) App Router. The application is designed to interact with Shopify via the Shopify Storefront API, but utilizes Shopify solely as Content Management System (CMS) in a headless matter.

For communication with the Shopify Storefront API, the application uses GraphQL with codegen to generate types from the queries and mutations. The application also uses Apollo Client for data fetching, state management, and caching.

## Getting Started

Pre-requisites:
| Tool | Version |
| --- | --- |
| Node.js | 20.x |
| pnpm | 8.x |

To get started with development, you'll need to install the project dependencies. This project uses `pnpm` as its package manager. If you don't have it installed, you can install it globally with `npm install -g pnpm`. Then, you can install the project dependencies with:

```sh
pnpm install
```

You can then start the development server with:

```sh
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

The application is currently hosted on [Vercel](https://vercel.com/). A deployment is triggered automatically when changes are pushed any branch.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
