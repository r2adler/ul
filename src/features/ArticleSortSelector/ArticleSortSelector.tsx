import clsx from 'clsx'
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
import cls from './ArticleSortSelector.module.scss'

type ArticleSortSelectorProps = {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newOrder: ArticleSortField) => void
}
export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
  const {
    className,
    onChangeOrder,
    onChangeSort,
    order,
    sort,
  } = props
  const { t } = useTranslation('article')

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    { value: 'asc', content: t('возрастанию') },
    { value: 'desc', content: t('убыванию') },
  ], [t])

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    { value: ArticleSortField.CREATED, content: t('дате создания') },
    { value: ArticleSortField.TITLE, content: t('названию') },
    { value: ArticleSortField.VIEWS, content: t('просмотрам') },
  ], [t])

  return (
    <div className={clsx(cls.ArticleSortSelector, className)}>
      <Select label={t('сортировать по')} options={sortFieldOptions} onChange={onChangeSort} />
      <Select label={t('по')} options={orderOptions} onChange={onChangeOrder} className={cls.order} />
    </div>
  )
}
