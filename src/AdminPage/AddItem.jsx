import { useState } from 'react'
import {
  Input,
  InputNumber,
  Button,
  Rate,
  Select,
  Space,
  Typography
} from 'antd'
import { useForm, Controller } from 'react-hook-form'
import TextArea from 'antd/es/input/TextArea'
import Swal from 'sweetalert2'
import axios from 'axios'

const { Option } = Select
const { Title } = Typography

const AddItemPage = () => {
  const [features, setFeatures] = useState([])
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const onSubmit = data => {
    const itemData = {
      ...data,
      features
    }
    axios
    .post('http://localhost:5000/products', itemData)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart!',
        timer: 3000,
        timerProgressBar: true,
      })
    })
    .catch((error) => {
      console.error('Error adding to cart:', error)
      Swal.fire({
        icon: 'error',
        title: 'Add Failed',
        text: 'This is Already in Your Cart!',
      })
    })
  }

  const handleFeatureAdd = feature => {
    if (feature && !features.includes(feature)) {
      setFeatures([...features, feature])
    }
  }

  const handleFeatureRemove = feature => {
    setFeatures(features.filter(item => item !== feature))
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <Title level={2}>Add New Item</Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px'
        }}
      >
        {/* Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Item name is required' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder='Enter item name'
                  style={{ width: '100%' }}
                />
                {errors.name && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.name.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Image URL Field */}
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name='image'
            control={control}
            rules={{ required: 'Image URL is required' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder='Enter image URL'
                  style={{ width: '100%' }}
                />
                {errors.image && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.image.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Price Field */}
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name='price'
            control={control}
            rules={{ required: 'Price is required' }}
            render={({ field }) => (
              <>
                <InputNumber
                  {...field}
                  placeholder='Enter price'
                  min={0}
                  style={{ width: '100%' }}
                />
                {errors.price && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.price.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Reviews Field */}
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name='reviews'
            control={control}
            rules={{ required: 'Number of reviews is required' }}
            render={({ field }) => (
              <>
                <InputNumber
                  {...field}
                  placeholder='Enter reviews count'
                  min={0}
                  style={{ width: '100%' }}
                />
                {errors.reviews && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.reviews.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Stars Field */}
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name='stars'
            control={control}
            rules={{ required: 'Star rating is required' }}
            render={({ field }) => (
              <>
                <Rate {...field} />
                {errors.stars && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.stars.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Features Field */}
        <div style={{ marginBottom: '20px' }}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Space>
              <Input
                placeholder='Enter a feature'
                onPressEnter={e => {
                  handleFeatureAdd(e.target.value)
                  e.target.value = ''
                }}
              />
              <Button
                type='primary'
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder="Enter a feature"]'
                  )
                  handleFeatureAdd(input.value)
                  input.value = ''
                }}
              >
                Add Feature
              </Button>
            </Space>
            <div>
              {features.map((feature, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    background: '#f0f0f0',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    margin: '5px'
                  }}
                >
                  {feature}{' '}
                  <Button
                    type='link'
                    size='small'
                    danger
                    onClick={() => handleFeatureRemove(feature)}
                  >
                    Remove
                  </Button>
                </span>
              ))}
            </div>
          </Space>
        </div>

        {/* Description Field */}
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <>
                <TextArea
                  {...field}
                  rows={4}
                  placeholder='Enter item description'
                  style={{ width: '100%' }}
                />
                {errors.description && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.description.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Category Field */}
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  placeholder='Select a category'
                  style={{ width: '100%' }}
                >
                  <Option value='Dreamland'>Dreamland</Option>
                  <Option value='Fantasy Friends'>Fantasy Friends</Option>
                  <Option value='Joyful Junction'>Joyful Junction</Option>
                  <Option value="Lil'Explorers">Lil'Explorers</Option>
                  <Option value='Cuddle Crew'>Cuddle Crew</Option>
                  <Option value='Discovery Den'>Discovery Den</Option>
                  <Option value='Giggle Gear'>Giggle Gear</Option>
                  <Option value='Jungle Jamboree'>Jungle Jamboree</Option>
                  <Option value='Fun Fairyland'>Fun Fairyland</Option>
                </Select>
                {errors.category && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.category.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <Button
          type='primary'
          htmlType='submit'
          block
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default AddItemPage
