import Shocase from '../../Components/utils/Shocase'
import ShowFuture from '../../Components/utils/ShowFuture'
import Category from './HomeSection/Category'
import Hero from './HomeSection/Hero'
import OurPricing from './HomeSection/OurPricing'
import QuickShow from './HomeSection/QuickShow'
import Testimonials from './HomeSection/Testimonials'

function Home () {
  return (
    <div>
      <Hero></Hero>
      <QuickShow></QuickShow>
      <Shocase></Shocase>
      <Category></Category>
      <ShowFuture></ShowFuture>
      <Testimonials></Testimonials>
      <OurPricing></OurPricing>
    </div>
  )
}

export default Home
