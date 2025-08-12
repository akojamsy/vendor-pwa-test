'use client'

import { useState } from 'react'
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  type Product,
} from '@/lib/api/productsApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import Image from 'next/image'

export default function ProductsPage() {
  const { data: products = [], isLoading, error } = useGetProductsQuery()
  const [createProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
  })
  const [hiddenImages, setHiddenImages] = useState<Set<string>>(new Set())

  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
  })

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setEditingProduct({ ...product })
  }

  const handleSave = async () => {
    if (editingId) {
      await updateProduct({ id: editingId, ...editingProduct })
      setEditingId(null)
      setEditingProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createProduct(newProduct)
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
    })
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id)
    }
  }

  if (isLoading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading...
      </div>
    )
  if (error)
    return (
      <div className='flex justify-center items-center min-h-screen text-red-500'>
        Error loading products
      </div>
    )

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Products</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className='flex items-center gap-2'
        >
          <Plus className='w-4 h-4' />
          Add Product
        </Button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Fill in the product details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>Name</label>
                  <Input
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder='Product name'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Category
                  </label>
                  <Input
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    placeholder='Product category'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Price
                  </label>
                  <Input
                    type='number'
                    step='0.01'
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder='0.00'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Image URL
                  </label>
                  <Input
                    value={newProduct.imageUrl}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, imageUrl: e.target.value })
                    }
                    placeholder='https://example.com/image.jpg'
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Description
                </label>
                <Input
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder='Product description'
                  required
                />
              </div>
              <div className='flex gap-2'>
                <Button type='submit'>Add Product</Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <Card key={product.id} className='relative'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle className='text-lg'>
                    {editingId === product.id ? (
                      <Input
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                        className='text-lg font-semibold'
                      />
                    ) : (
                      product.name
                    )}
                  </CardTitle>
                  <CardDescription>
                    {editingId === product.id ? (
                      <Input
                        value={editingProduct.category}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            category: e.target.value,
                          })
                        }
                        placeholder='Category'
                      />
                    ) : (
                      product.category
                    )}
                  </CardDescription>
                </div>
                <div className='flex gap-2'>
                  {editingId === product.id ? (
                    <>
                      <Button
                        size='sm'
                        onClick={handleSave}
                        className='bg-green-600 hover:bg-green-700'
                      >
                        <Save className='w-4 h-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handleCancel}
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleDelete(product.id)}
                        className='text-red-600 hover:text-red-700'
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {product.imageUrl && !hiddenImages.has(product.id) && (
                <div className='mb-4'>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={128}
                    className='w-full h-32 object-cover rounded-md'
                    onError={() => {
                      setHiddenImages((prev) => new Set(prev).add(product.id))
                    }}
                  />
                </div>
              )}

              <div className='space-y-3'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Description
                  </label>
                  {editingId === product.id ? (
                    <Input
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                      placeholder='Description'
                    />
                  ) : (
                    <p className='text-sm text-gray-600'>
                      {product.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Price
                  </label>
                  {editingId === product.id ? (
                    <Input
                      type='number'
                      step='0.01'
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder='0.00'
                    />
                  ) : (
                    <p className='text-lg font-semibold text-green-600'>
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>

                {editingId === product.id && (
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Image URL
                    </label>
                    <Input
                      value={editingProduct.imageUrl || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder='https://example.com/image.jpg'
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>
            No products yet. Add your first product to get started!
          </p>
        </div>
      )}
    </div>
  )
}
