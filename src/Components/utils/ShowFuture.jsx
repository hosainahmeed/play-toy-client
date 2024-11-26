import image from '../../assets/image.webp'
import { CiHeart } from 'react-icons/ci'
import { BsRecycle, BsScissors } from 'react-icons/bs'
import { GiPuzzle } from 'react-icons/gi'
function ShowFuture () {
  return (
    <div className='flex md:flex-row flex-col my-12 justify-between items-center'>
      <div className='flex items-center flex-col justify-between gap-12'>
        <div className='flex items-center flex-col gap-2'>
          <CiHeart className='text-5xl md:text-7xl'></CiHeart>
          <h1 className='text-xl md:text-3xl'>Made With Love</h1>
          <p className='text-sm text-[#555] md:text-base text-center'>
            The next best thing to snuggling skin-to-skin
          </p>
        </div>
        <div className='flex items-center flex-col gap-2'>
          <BsRecycle className='text-5xl md:text-7xl'></BsRecycle>
          <h1 className='text-xl md:text-3xl'>Earth-friendly</h1>
          <p className='text-sm text-[#555] md:text-base text-center'>
            GOTS certified, organic cotton. None of the bad stuff.
          </p>
        </div>
      </div>
      <div>
        <img src={image} alt='toys' />
      </div>
      <div className='flex items-center flex-col gap-2'>
        <div className='flex items-center flex-col justify-between gap-12'>
          <div className='flex items-center flex-col gap-2'>
            <BsScissors className='text-5xl md:text-7xl'></BsScissors>
            <h1 className='text-xl md:text-3xl'>Custom Made Toys</h1>
            <p className='text-sm text-[#555] md:text-base text-center'>
              Wash-tested fabrics that never shrink, pill, or fade
            </p>
          </div>
          <div className='flex items-center flex-col gap-2'>
            <GiPuzzle className='text-5xl md:text-7xl'></GiPuzzle>
            <h1 className='text-xl md:text-3xl'>Personalized Toys</h1>
            <p className='text-sm text-[#555] md:text-base text-center'>
              Add an embroidered name or manogram for a unique touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowFuture
