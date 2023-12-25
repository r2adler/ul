import clsx from 'clsx'
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article';

type ArticleListProps = {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}
const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3).fill(0)
  .map((_, i) => <ArticleListItemSkeleton view={view} key={i} />)

export const ArticleList = (props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
  } = props

  const { t } = useTranslation()

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
    />
  )

  if (!isLoading && !articles.length) {
    return (
      <div className={cls.ArticleList}>
        <Text title={t('Статьи не найдены')} size={TextSize.L} />
      </div>
    )
  }
  return (
    <div className={clsx(cls.ArticleList, className)}>
      {
        articles.length > 0
          ? articles.map(renderArticle)
          : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  )
}
