import { gql } from "graphql-request";

// 1. get all the products belonging to the current category
// 2. also, get all the products that belong to the child categories
export const CATEGORY_QUERY = gql`
  query CATEGORY_QUERY($category: [String], $skip: Int = 0, $first: Int) {
    products(
      where: { categories: { Category_contains: $category } }
      limit: $first
      start: $skip
    ) {
      Nombre
      Price
      picture {
        url
        alternativeText
      }
      discount
      id
      stock {
        Stock
      }
      categories {
        Category
      }
    }
    categories(where: { Category_contains: $category }) {
      Category
      categories {
        Category
        products {
          Nombre
          Price
          picture {
            url
            alternativeText
          }
          discount
          id
          stock {
            Stock
          }
        }
      }
    }
    productsConnection(
      where: { categories: { Category_contains: $category } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const CATEGORY_QUERY_PRICE = gql`
  query CATEGORY_QUERY(
    $category: [String]
    $skip: Int = 0
    $first: Int
    $sort: String
  ) {
    products(
      where: { categories: { Category_contains: $category } }
      limit: $first
      start: $skip
      sort: $sort
    ) {
      Nombre
      Price
      picture {
        url
        alternativeText
      }
      discount
      id
      stock {
        Stock
      }
      categories {
        Category
      }
    }
    categories(where: { Category_contains: $category }) {
      Category
      categories {
        Category
        products {
          Nombre
          Price
          picture {
            url
            alternativeText
          }
          discount
          id
          stock {
            Stock
          }
        }
      }
    }
    productsConnection(
      where: { categories: { Category_contains: $category } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const CATEGORY_QUERY_STOCK = gql`
  query CATEGORY_QUERY($category: [String], $skip: Int = 0, $first: Int) {
    products(
      where: {
        categories: { Category_contains: $category }
        stock: { Stock_ne: "Sin Stock" }
      }
      limit: $first
      start: $skip
    ) {
      Nombre
      Price
      picture {
        url
        alternativeText
      }
      discount
      id
      stock {
        Stock
      }
      categories {
        Category
      }
    }
    categories(where: { Category_contains: $category }) {
      Category
      categories {
        Category
        products {
          Nombre
          Price
          picture {
            url
            alternativeText
          }
          discount
          id
          stock {
            Stock
          }
        }
      }
    }
    productsConnection(
      where: {
        categories: { Category_contains: $category }
        stock: { Stock_ne: "Sin Stock" }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const CATEGORY_QUERY_WITHOUT_STOCK = gql`
  query CATEGORY_QUERY($category: [String], $skip: Int = 0, $first: Int) {
    products(
      where: {
        categories: { Category_contains: $category }
        stock: { Stock: "Sin Stock" }
      }
      limit: $first
      start: $skip
    ) {
      Nombre
      Price
      picture {
        url
        alternativeText
      }
      discount
      id
      stock {
        Stock
      }
      categories {
        Category
      }
    }
    categories(where: { Category_contains: $category }) {
      Category
      categories {
        Category
        products {
          Nombre
          Price
          picture {
            url
            alternativeText
          }
          discount
          id
          stock {
            Stock
          }
        }
      }
    }
    productsConnection(
      where: {
        categories: { Category_contains: $category }
        stock: { Stock: "Sin Stock" }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
