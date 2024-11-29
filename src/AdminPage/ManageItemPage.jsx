import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Table, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import './ManageItems.css'

const ManageItems = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('Error fetching products:', error)
      })
  }, [])

  const handleDelete = productId => {
    axios
      .delete(`http://localhost:5000/products/${productId}`)
      .then(() => {
        setProducts(products.filter(item => item._id !== productId))
        Swal.fire('Deleted!', 'The product has been deleted.', 'success')
      })
      .catch(error => {
        console.error('Error deleting product:', error)
      })
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => (
        <img src={image} alt='Product' className='product-image' />
      ),
      responsive: ['md']
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      responsive: ['md']
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Popconfirm
            title='Are you sure to delete this product?'
            onConfirm={() => handleDelete(record._id)}
            okText='Yes'
            cancelText='No'
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <div className='manage-items-page'>
      <h1>Manage Products</h1>

      <Table
        rowKey='_id'
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />
    </div>
  )
}

export default ManageItems
