import { Button } from 'antd'
import cuddle from '../../../assets/cuddle.webp'
import dreamland from '../../../assets/Dreamland.webp'
import fun from '../../../assets/Fun.webp'
import play from '../../../assets/playtime.webp'

const cate = [
  {
    id: 1,
    img: cuddle,
    title: 'Cuddle Crew'
  },
  {
    id: 2,
    img: dreamland,
    title: 'Dreamland'
  },
  {
    id: 3,
    img: fun,
    title: 'Fun Fairyland'
  },
  {
    id: 4,
    img: play,
    title: 'Playtime Parade'
  }
]

function QuickShow () {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 my-12'>
      {cate.map(item => (
        <div className='flex flex-col items-center gap-2' key={item.id}>
            <img className='object-cover' src={item.img} alt="" />
            <h1 className='font-semibold text-xl'>{item.title}</h1>
        </div>
      ))}
    </div>
  )
}

export default QuickShow
