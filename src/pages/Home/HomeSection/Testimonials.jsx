import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './reviewStyle.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { FaQuoteLeft } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Skeleton } from 'antd'

function Testimonials () {
  const [reviewsData, setReviewsData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/reviews').then(res => {
      setReviewsData(res.data)
    })
  })


  if (!reviewsData) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Your Testimonials</h1>
        <Skeleton active />
      </div>
    );
  }

  return (
    <div className='relative'>
      {/* <video
        loop
        muted
        autoPlay
        src='https://cdn.shopify.com/videos/c/o/v/4d568f4aab50439a84fa00b4def62f59.mp4'
      ></video> */}
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 30 }
          }}
          className='mySwiper'
        >
          {reviewsData.map(review => (
            <SwiperSlide key={review._id}>
              <div className='flex items-start justify-around space-x-5 px-12 py-28'>
                <div className='review-card min-h-48 text-start'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='avatar'>
                        <div className='ring-primary w-12 rounded-full border-2 border-[#07332F]'>
                          <img
                            src={review.profile_image}
                            alt={review.name}
                            className='w-full object-cover'
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className='leading-4 text-nowrap'>{review.name}</h3>
                        <p className='leading-4'>{review.designation}</p>
                      </div>
                    </div>
                    <FaQuoteLeft className='text-5xl md:block hidden' />
                  </div>
                  <p>{review.review_text}</p>
                  <div className='flex items-center'>
                    <h1 className='text-xl font-semibold'>Rating:</h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Testimonials
