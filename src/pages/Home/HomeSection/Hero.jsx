import { Button } from 'antd'
import banner from '../../../assets/banner/banner.jpg'
import {useNavigate } from 'react-router-dom'

function Hero () {
  const navigate = useNavigate()
  return (
    <section
      style={{ backgroundImage: `url(${banner})` }}
      className='relative md:h-[80vh] bg-center bg-cover bg-no-repeat flex md:flex-row flex-col  items-center md:text-start text-center md:items-end px-12 pb-12'
    >
      <div className='absolute pointer-events-none z-[1] bg-[#1111116b] top-0 left-0 w-full h-full'></div>
      <div className='mt-12 z-[999]'>
        <h1 className='text-2xl md:text-5xl font-semibold text-white'>
          TOLUS TOYS COLLECTION
        </h1>
        <p className='md:w-7/12 text-xs md:text-xl text-[#ffffffa1] my-3'>
          Explore our handpicked selection of toys that combine fun and
          creativity. From colorful puzzles to exciting games, find the perfect
          toy to spark your child's imagination!
        </p>
      </div>
      <Button onClick={()=>navigate('/shop')} className='z-[999]'>
        All products
      </Button>
    </section>
  )
}

export default Hero
