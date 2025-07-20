'use client'

import { PageTransitionProps } from '@/types/animation'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'tween', ease: 'linear', duration: 0.5 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
