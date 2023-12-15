import clsx from 'clsx'
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { useCallback } from 'react';
import { ArticleView } from 'entities/Article/model/types/article';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Select } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import cls from './ArticlePageFilters.module.scss'

type ArticlePageFiltersProps = {
  className?: string
}
export const ArticlePageFilters = ({ className }: ArticlePageFiltersProps) => {
  const dispatch = useAppDispatch()
  const view = useSelector(getArticlesPageView)
  const { t } = useTranslation('article')

  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView))
  }, [dispatch])

  return (
    <div className={clsx(cls.ArticlePageFilters, className)}>
      <div className={cls.sortWrapper}>
        <Select label={t('Сортировать по')} />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
    </div>
  )
}
