import { useCallback, useMemo } from 'react';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article';
import { useTranslation } from 'react-i18next';

type ArticleTypeTabsProps = {
  className?: string
  value: ArticleType
  onChangeType: (type: ArticleType) => void
}
export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props
  const { t } = useTranslation('article')

  const typeTabs = useMemo<TabItem[]>(() => [
    {
      value: ArticleType.ALL,
      content: t('Все статьи'),
    },
    {
      value: ArticleType.IT,
      content: t('ИТ'),
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Наука'),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Экономика'),
    },
  ], [t])

  const onTabClick = useCallback((tab: TabItem) => {
    onChangeType(tab.value as ArticleType)
  }, [onChangeType])

  return (
    <Tabs
      className={className}
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
    />
  )
}
