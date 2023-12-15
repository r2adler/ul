import clsx from 'clsx'
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import cls from './ArticleSortSelector.module.scss'

type ArticleSortSelectorProps = {
  className?: string
}
export const ArticleSortSelector = ({ className }: ArticleSortSelectorProps) => {
  const { t } = useTranslation('article')

  const orderOptions = useMemo<SelectOption[]>(() => [
    { value: 'asc', content: t('возрастанию') }, { value: 'desc', content: t('убыванию') },
  ], [])

  return (
    <div className={clsx(cls.ArticleSortSelector, className)}>
      <Select label={t('')} />
      <Select label={t('')} />
    </div>
  )
}
