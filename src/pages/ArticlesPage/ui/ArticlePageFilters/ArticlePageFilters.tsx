import clsx from 'clsx'
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { useCallback } from 'react';
import { ArticleSortField, ArticleView } from 'entities/Article/model/types/article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArticleSortSelector } from 'features/ArticleSortSelector/ArticleSortSelector';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import {
  getArticlesPageOrder, getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlePageFilters.module.scss'

type ArticlePageFiltersProps = {
  className?: string
}
export const ArticlePageFilters = ({ className }: ArticlePageFiltersProps) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('article')
  const view = useSelector(getArticlesPageView)
  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const search = useSelector(getArticlesPageSearch)

  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView))
  }, [dispatch])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort))
  }, [dispatch])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder))
  }, [dispatch])

  const onChangeSearch = useCallback((newSearch: string) => {
    dispatch(articlesPageActions.setSearch(newSearch))
  }, [dispatch])

  return (
    <div className={clsx(cls.ArticlePageFilters, className)}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} order={order} sort={sort} />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card>
        <Input placeholder={t('Поиск')} onChange={onChangeSearch} value={search} />
      </Card>
    </div>
  )
}
