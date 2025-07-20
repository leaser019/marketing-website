'use client'

import { AnimatedCounterProps, FadeInProps, HoverCardProps, PulseAnimationProps, StaggeredContainerProps } from '@/types/animation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function FadeIn({ children, className = '', delay = 0.2, direction = 'up' }: FadeInProps) {
  const { ref, inView:isInView } = useInView({ threshold: 0.1 })
  
  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
    none: ''
  }

  const animationClass = isInView 
    ? 'opacity-100 translate-y-0 translate-x-0' 
    : `opacity-0 ${directionClasses[direction]}`

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${animationClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <div className={`transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}>
      {children}
    </div>
  )
}

export function StaggeredContainer({ children, className = '', staggerDelay = 100 }: StaggeredContainerProps) {
  return (
    <div className={className}>
      {Array.isArray(children) ? 
        children.map((child, index) => (
          <FadeIn key={index} delay={index * staggerDelay}>
            {child}
          </FadeIn>
        )) : children}
    </div>
  )
}



export function AnimatedCounter({ end, duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView:isInView } = useInView({ threshold: 0.1, triggerOnce: true })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number | null = null
    let animationFrame: number | null = null
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      
      const percentage = Math.min(progress / duration, 1)
      setCount(Math.floor(percentage * end))
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }  
    animationFrame = requestAnimationFrame(step)
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, isInView])
  
  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  )
}

export function PulseAnimation({ children, className = '' }: PulseAnimationProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  )
}
