import clsx from 'clsx'
import { ReactNode, useCallback } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import cls from './Tabs.module.scss'

export type TabItem = {
  value: string
  content: ReactNode
}
type TabsProps = {
  className?: string
  tabs: TabItem[]
  value: string // выбранное значение
  onTabClick: (tab: TabItem) => void
}
export const Tabs = (props: TabsProps) => {
  const {
    className, tabs, value, onTabClick,
  } = props

  const clickHandle = useCallback((tab: TabItem) => () => {
    onTabClick(tab)
  }, [onTabClick])

  return (
    <div className={clsx(cls.Tabs, className)}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          className={cls.tab}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
}
