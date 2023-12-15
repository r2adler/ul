import clsx from 'clsx'
import { MutableRefObject, ReactNode, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import cls from './Page.module.scss'

type PageProps = {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}
export const Page = ({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd })

  return (
    <section ref={wrapperRef} className={clsx(cls.Page, className)}>
      {children}
      <div ref={triggerRef} />
    </section>
  )
}
