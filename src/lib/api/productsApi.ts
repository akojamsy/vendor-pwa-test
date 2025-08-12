import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
}

export interface UpdateProductRequest {
  id: string
  name?: string
  description?: string
  price?: number
  category?: string
  imageUrl?: string
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
    // In a real app, you'd use an actual API endpoint
    // For now, we'll simulate with localStorage
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: () => {
        try {
          const products = localStorage.getItem('products')
          return { data: products ? JSON.parse(products) : [] }
        } catch (error) {
          return { error: { status: 500, data: 'Failed to fetch products' } }
        }
      },
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<Product, CreateProductRequest>({
      queryFn: (product) => {
        try {
          const newProduct: Product = {
            ...product,
            id: Date.now().toString(),
          }
          const existingProducts = JSON.parse(
            localStorage.getItem('products') || '[]'
          )
          const updatedProducts = [...existingProducts, newProduct]
          localStorage.setItem('products', JSON.stringify(updatedProducts))
          return { data: newProduct }
        } catch (error) {
          return { error: { status: 500, data: 'Failed to create product' } }
        }
      },
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      queryFn: ({ id, ...updates }) => {
        try {
          const existingProducts = JSON.parse(
            localStorage.getItem('products') || '[]'
          )
          const productIndex = existingProducts.findIndex(
            (p: Product) => p.id === id
          )

          if (productIndex === -1) {
            return { error: { status: 404, data: 'Product not found' } }
          }

          const updatedProduct = {
            ...existingProducts[productIndex],
            ...updates,
          }
          existingProducts[productIndex] = updatedProduct
          localStorage.setItem('products', JSON.stringify(existingProducts))

          return { data: updatedProduct }
        } catch (error) {
          return { error: { status: 500, data: 'Failed to update product' } }
        }
      },
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, string>({
      queryFn: (id) => {
        try {
          const existingProducts = JSON.parse(
            localStorage.getItem('products') || '[]'
          )
          const filteredProducts = existingProducts.filter(
            (p: Product) => p.id !== id
          )
          localStorage.setItem('products', JSON.stringify(filteredProducts))
          return { data: undefined }
        } catch (error) {
          return { error: { status: 500, data: 'Failed to delete product' } }
        }
      },
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi
