import clsx from 'clsx'
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
  } = props

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
    />
  )

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
