import Shocase from "../../Components/utils/Shocase"
import ShowFuture from "../../Components/utils/ShowFuture"
import Category from "./HomeSection/Category"
import Hero from "./HomeSection/Hero"
import QuickShow from "./HomeSection/QuickShow"


function Home() {
  return (
    <div>
      <Hero></Hero>
      <QuickShow></QuickShow>
      <Category></Category>
      <Shocase></Shocase>
      <ShowFuture></ShowFuture>
    </div>
  )
}

export default Home