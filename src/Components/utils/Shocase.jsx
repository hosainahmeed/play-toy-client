import { Button } from 'antd'
import show from '../../assets/show.webp'

function Shocase () {
  return (
    <div
      style={{ backgroundImage: `url(${show})` }}
      className='bg-fixed top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover p-28'
    >
      <div className='w-full md:w-1/2'>
        <h1 className='text-white text-6xl font-semibold'>Playtime Paradise</h1>
        <p className='text-white text-xl my-4'>
          Discover a world of fun and imagination with our wide range of toys.
          From educational games to the latest action figures, we've got
          something to bring a smile to every child's face!
        </p>
        <Button>All Products</Button>
      </div>
    </div>
  )
}

export default Shocase
