/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery getCollectionProducts($firstCollections: Int = 1, $newestFirst: Boolean = true) {\n\t\tcollections(first: $firstCollections, sortKey: UPDATED_AT, reverse: $newestFirst) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tupdatedAt\n\t\t\t\tproducts(first: 10) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tid\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\timages(first: 1) {\n\t\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetCollectionProductsDocument,
    "\n\tquery getProducts($productQuery: String = \"\", $maxProducts: Int = 100) {\n\t\tproducts(query: $productQuery, first: $maxProducts) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tproductType\n\t\t\t\t\timages(first: 100) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcollections(first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpriceRange {\n\t\t\t\t\t\tminVariantPrice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetProductsDocument,
    "\n\tquery getProductsOfSameType($query: String!) {\n\t\tproducts(first: 10, query: $query) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\timages(first: 1) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\theight\n\t\t\t\t\t\twidth\n\t\t\t\t\t\turl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetProductsOfSameTypeDocument,
    "\n\tquery getProductsInCollection($collectionId: ID!) {\n\t\tcollection(id: $collectionId) {\n\t\t\tproducts(first: 10) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\timages(first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetProductsInCollectionDocument,
    "\n\tquery getProduct($productId: ID!) {\n\t\tproduct(id: $productId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tproductType\n\t\t\tdescription\n\t\t\tpublishedAt\n\t\t\timages(first: 100) {\n\t\t\t\tnodes {\n\t\t\t\t\theight\n\t\t\t\t\twidth\n\t\t\t\t\turl\n\t\t\t\t}\n\t\t\t}\n\t\t\tcollections(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t}\n\t\t\tvariants(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tpriceV2 {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetProductDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getCollectionProducts($firstCollections: Int = 1, $newestFirst: Boolean = true) {\n\t\tcollections(first: $firstCollections, sortKey: UPDATED_AT, reverse: $newestFirst) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tupdatedAt\n\t\t\t\tproducts(first: 10) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tid\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\timages(first: 1) {\n\t\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getCollectionProducts($firstCollections: Int = 1, $newestFirst: Boolean = true) {\n\t\tcollections(first: $firstCollections, sortKey: UPDATED_AT, reverse: $newestFirst) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tupdatedAt\n\t\t\t\tproducts(first: 10) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tid\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\timages(first: 1) {\n\t\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getProducts($productQuery: String = \"\", $maxProducts: Int = 100) {\n\t\tproducts(query: $productQuery, first: $maxProducts) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tproductType\n\t\t\t\t\timages(first: 100) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcollections(first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpriceRange {\n\t\t\t\t\t\tminVariantPrice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getProducts($productQuery: String = \"\", $maxProducts: Int = 100) {\n\t\tproducts(query: $productQuery, first: $maxProducts) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tproductType\n\t\t\t\t\timages(first: 100) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcollections(first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpriceRange {\n\t\t\t\t\t\tminVariantPrice {\n\t\t\t\t\t\t\tamount\n\t\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getProductsOfSameType($query: String!) {\n\t\tproducts(first: 10, query: $query) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\timages(first: 1) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\theight\n\t\t\t\t\t\twidth\n\t\t\t\t\t\turl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getProductsOfSameType($query: String!) {\n\t\tproducts(first: 10, query: $query) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\timages(first: 1) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\theight\n\t\t\t\t\t\twidth\n\t\t\t\t\t\turl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getProductsInCollection($collectionId: ID!) {\n\t\tcollection(id: $collectionId) {\n\t\t\tproducts(first: 10) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\timages(first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getProductsInCollection($collectionId: ID!) {\n\t\tcollection(id: $collectionId) {\n\t\t\tproducts(first: 10) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\timages(first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getProduct($productId: ID!) {\n\t\tproduct(id: $productId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tproductType\n\t\t\tdescription\n\t\t\tpublishedAt\n\t\t\timages(first: 100) {\n\t\t\t\tnodes {\n\t\t\t\t\theight\n\t\t\t\t\twidth\n\t\t\t\t\turl\n\t\t\t\t}\n\t\t\t}\n\t\t\tcollections(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t}\n\t\t\tvariants(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tpriceV2 {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getProduct($productId: ID!) {\n\t\tproduct(id: $productId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tproductType\n\t\t\tdescription\n\t\t\tpublishedAt\n\t\t\timages(first: 100) {\n\t\t\t\tnodes {\n\t\t\t\t\theight\n\t\t\t\t\twidth\n\t\t\t\t\turl\n\t\t\t\t}\n\t\t\t}\n\t\t\tcollections(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t}\n\t\t\tvariants(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tpriceV2 {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;