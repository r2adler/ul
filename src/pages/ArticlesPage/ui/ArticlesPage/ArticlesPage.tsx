import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { ArticleView } from 'entities/Article/model/types/article';
import { Page } from 'shared/ui/Page/Page';
import clsx from 'clsx';
import { getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlesPage.module.scss';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)

  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView))
  }, [dispatch])

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState())
    dispatch(fetchArticlesList({
      page: 1,
    }))
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page onScrollEnd={onLoadNextPart} className={clsx(cls.ArticlesPage, className)}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
