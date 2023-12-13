import clsx from 'clsx'
import { Text } from 'shared/ui/Text/Text';
import React from 'react';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleListItem.module.scss'
import { Article, ArticleView } from '../../model/types/article';
import eyeIcon from '../../../../shared/assets/icons/eye-20-20.svg'

type ArticleListItemProps = {
  className?: string
  article: Article
  view?: ArticleView
}
export const ArticleListItem = ({ className, view, article }: ArticleListItemProps) => {
  if (view === ArticleView.BIG) {
    return (
      <div className={clsx(cls.big, className)}>
        {article.title}
      </div>
    )
  }
  return (
    <div className={clsx(cls.small, className)}>
      <div className={cls.card}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text className={cls.createdAt} text={article.createdAt} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(', ')} className={cls.types} />
          <Text text={String(article.views)} className={cls.views} />
          <Icon Svg={eyeIcon} />
        </div>
        <Text text={article.title} className={cls.title} />
      </div>
    </div>
  )
}
