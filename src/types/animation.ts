import { ReactNode } from 'react';

export type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export type PageTransitionProps = {
  children: ReactNode
}

export type HoverCardProps = {
  children: ReactNode;
  className?: string;
}

export type StaggeredContainerProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export type PulseAnimationProps = {
  children: ReactNode;
  className?: string;
}

export type AnimatedCounterProps = {
  end: number;
  duration?: number;
  className?: string;
}