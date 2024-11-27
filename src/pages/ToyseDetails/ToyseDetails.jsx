import { useLoaderData } from 'react-router-dom'
import { Button, InputNumber, Image } from 'antd'
import { useState } from 'react'

function ToyseDetails () {
  // Access the toy data loaded from the loader
  const toy = useLoaderData()

  // State to manage quantity
  const [quantity, setQuantity] = useState(1)

  // Image preview state
  const [previewVisible, setPreviewVisible] = useState(false)

  if (!toy) {
    return <div>Loading...</div>
  }

  // Handler for changing quantity
  const handleQuantityChange = value => {
    setQuantity(value)
  }

  // Handle image preview visibility
  const handleImagePreview = () => {
    setPreviewVisible(true)
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='flex flex-col md:flex-row items-center'>
        {/* Toy Image with Ant Design Image Preview */}
        <div className='w-full md:w-1/2 mb-6 md:mb-0'>
          <div className='relative'>
            <Image
              width='100%'
              src={toy.image}
              alt={toy.name}
              className='rounded-lg shadow-lg cursor-pointer'
              onClick={handleImagePreview}
            />
          </div>
        </div>

        {/* Toy Details */}
        <div className='w-full md:w-1/2 pl-0 md:pl-12'>
          <h1 className='text-3xl font-semibold mb-4'>{toy.name}</h1>
          <p className='text-lg text-gray-600 mb-4'>{toy.description}</p>
          <p className='text-xl font-bold mb-4'>${toy.price}</p>

          {/* Rating */}
          <div className='flex items-center mb-4'>
            <span className='text-yellow-500'>
              {'★'.repeat(Math.round(toy.stars))}
            </span>
            <span className='ml-2 text-gray-500'>({toy.reviews} reviews)</span>
          </div>

          {/* Features */}
          <div className='mb-4'>
            <h2 className='text-xl font-semibold'>Features:</h2>
            <ul className='list-disc pl-5 space-y-2'>
              {toy.features.map((feature, index) => (
                <li key={index} className='text-gray-700'>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Category */}
          <div className='mb-4'>
            <span className='font-semibold'>Category:</span> {toy.category}
          </div>

          {/* Quantity Selector */}
          <div className='mt-4 flex items-center gap-4'>
            <p>
              <strong>Quantity:</strong>
            </p>
            <div className='flex items-center gap-2'>
              <button
                onClick={() =>
                  setQuantity(prev => (prev > 1 ? prev - 1 : prev))
                }
                className='px-3 py-1 bg-gray-200 hover:bg-gray-300 transition'
              >
                -
              </button>
              <span className='text-lg'>{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className='px-3 py-1 bg-gray-200 hover:bg-gray-300 transition'
              >
                +
              </button>
            </div>
          </div>

          {/* Buy Button */}
          <button className='px-6 py-2 mt-4 bg-black text-white rounded hover:bg-gray-800 transition'>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Image
        preview={{
          visible: previewVisible,
          src: toy.image,
          onVisibleChange: visible => setPreviewVisible(visible)
        }}
      />
    </div>
  )
}

export default ToyseDetails
