import { Flex, Spin, Switch } from 'antd'
import { motion } from 'framer-motion'

const Loader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    pulse: {
      scale: [1, 1.5, 1],
      opacity: [1, 0.7, 1],
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <div className='flex items-center justify-center h-screen overflow-hidden'>
      <motion.div
        className='flex gap-4'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className='w-8 h-8 bg-black rounded-full'
            variants={circleVariants}
            animate='pulse'
          />
        ))}
      </motion.div>
      <motion.h1
        className='absolute bottom-10 text-black text-xl font-bold tracking-wide'
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Loading
      </motion.h1>
    </div>
  )
}

export default Loader
