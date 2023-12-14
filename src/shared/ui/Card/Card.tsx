import clsx from 'clsx'
import { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}
export const Card = ({ className, children, ...otherProps }: CardProps) => (
  <div className={clsx(cls.Card, className)} {...otherProps}>
    {children}
  </div>
)
