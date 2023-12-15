import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import clsx from 'clsx';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import AddCommentForm from 'features/addCommentForm/ui/AddCommentForm/AddCommentForm';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../selectors/comments';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
}
const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props

  const { t } = useTranslation('article-details')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentsIsLoading)

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  if (!id) {
    return (
      <Page className={className}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page>
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        <div className={clsx(cls.ArticleDetailsPage, className)}>
          <ArticleDetails id={id} />
          <Text title={t('Комментарии')} />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList isLoading={isLoading} comments={comments} />
        </div>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
