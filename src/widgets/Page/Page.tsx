import clsx from 'clsx'
import {
  MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollRestorationByPath, scrollRestorationActions } from 'features/scrollRestoration';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useTrottle/useTrottle';
import cls from './Page.module.scss'

type PageProps = {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}
export const Page = ({ className, children, onScrollEnd }: PageProps) => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const scrollPosition = useSelector((state: StateSchema) => getScrollRestorationByPath(state, pathname))
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollRestorationActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname,
    }))
  }, 500)

  return (
    <section ref={wrapperRef} className={clsx(cls.Page, className)} onScroll={onScroll}>
      {children}
      {onScrollEnd ? <div ref={triggerRef} className={cls.trigger} /> : null}
    </section>
  )
}
