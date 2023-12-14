import clsx from 'clsx'
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article';

type ArticleListProps = {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}
export const ArticleList = (props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
  } = props

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
    />
  )
  if (isLoading) {
    return (
      <div className={clsx(cls.ArticleList, className)}>
        {
          new Array(view === ArticleView.SMALL ? 9 : 3).fill(0)
            .map((_, i) => <ArticleListItemSkeleton view={view} key={i} />)
        }
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
    </div>
  )
}
