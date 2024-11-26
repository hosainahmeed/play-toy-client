import { motion } from 'framer-motion'

const OurPricing = () => {
  return (
    <div className='mt-32'>
      <div className='lg:w-6/7 mx-auto lg:flex space-y-6 lg:space-y-0 px-1 lg:p-16 justify-between mt-12 gap-4'>
        <motion.div
          className='text-center bg-[#F7F8FA] p-12 w-full rounded-lg shadow-lg transform  transition duration-300 ease-in-out'
          whileTap={{ scale: 0.95 }}
        >
          <p className='text-[#111] bg-white p-8 rounded-full'>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'   
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-16 h-16 mx-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg> */}
          </p>
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
          <p className='text-[#111] bg-white p-8 rounded-full'>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-16 h-16 mx-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg> */}
          </p>
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
          <p className='text-[#111] bg-white p-8 rounded-full'>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-16 h-16 mx-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg> */}
          </p>
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
