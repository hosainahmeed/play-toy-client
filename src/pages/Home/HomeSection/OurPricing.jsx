import { motion } from 'framer-motion'

const OurPricing = () => {
  return (
    <div className='mt-32'>
      <div className='lg:w-6/7 mx-auto lg:flex space-y-6 lg:space-y-0 px-1 lg:p-16 justify-between mt-12 gap-4'>
        <motion.div
          className='text-center bg-[#F7F8FA] p-12 w-full rounded-lg shadow-lg transform  transition duration-300 ease-in-out'
          whileTap={{ scale: 0.95 }}
        >
          <p className='text-[#111] text-4xl font-bold bg-white p-8 rounded-full'>$</p>
          <h4 className='text-xl mt-2 font-bold'>Basic</h4>
          <h4 className='text-5xl mt-4 text-[#111] font-bold '>$25</h4>
          <p className='text-gray-500 mt-3'>Basic price cover fundamental</p>
          <hr className='border-1 my-2 boder-[#111]' />
          <p className='text-gray-500 mt-3'>Basic price includes essential</p>
          <hr className='border-1 my-2 boder-[#111]' />
          <p className='text-gray-500 mt-3'>Cost-effective option</p>
          <button className='bg-[#111] px-8 mt-8 py-2 text-white font-semibold rounded-3xl'>
            Buy Now
          </button>
        </motion.div>

        <motion.div
          className='text-center bg-[#F7F8FA] p-12 w-full rounded-lg shadow-lg transform transition duration-300 ease-in-out'
          whileTap={{ scale: 0.95 }}
        >
          <p className='text-[#111 text-4xl font-bold bg-white p-8 rounded-full'>$</p>
          <h4 className='text-xl mt-2 font-bold'>Standard</h4>
          <h4 className='text-5xl mt-4 text-[#111] font-bold '>$50</h4>
          <p className='text-gray-500 mt-3'>The standard price</p>
          <hr className='border-1 my-2 boder-[#111]' />
          <p className='text-gray-500 mt-3'>Additional features</p>
          <hr className='border-1 my-2 boder-[#111]' />
          <p className='text-gray-500 mt-3'>Upgrade to the standard</p>
          <button className='bg-[#111] px-8 mt-8 py-2 text-white font-semibold rounded-3xl'>
            Buy Now
          </button>
        </motion.div>

        <motion.div
          className='text-center bg-[#F7F8FA] p-12 w-full rounded-lg shadow-lg transform transition duration-300 ease-in-out'
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className='text-[#111] text-4xl font-bold bg-white p-8 rounded-full'>$</p>
          <h4 className='text-xl mt-2 font-bold'>High Quality</h4>
          <h4 className='text-5xl mt-4 text-[#111] font-bold '>$100</h4>
          <p className='text-gray-500 mt-3'>Experience the premium level</p>
          <hr className='border-1 my-2 boder-[#111]' />
          <p className='text-gray-500 mt-3'>Unlock the finest features</p>
          <hr className='border-1 my-2 boder-[#111]' />
          <p className='text-gray-500 mt-3'>Elevate your experience</p>
          <button className='bg-[#111] px-8 mt-8 py-2 text-white font-semibold rounded-3xl'>
            Buy Now
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default OurPricing
