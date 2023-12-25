import clsx from 'clsx'
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss'

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined'
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
}
export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    theme = CardTheme.NORMAL,
    ...otherProps
  } = props

  return (
    <div className={clsx(cls.Card, cls[theme], className)} {...otherProps}>
      {children}
    </div>
  )
})
