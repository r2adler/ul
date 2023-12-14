import clsx from 'clsx'
import { ArticleView } from 'entities/Article/model/types/article';
import { Card } from 'shared/ui/Card/Card';
import React from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ArticleListItem.module.scss'

type ArticleListItemProps = {
  className?: string
  view?: ArticleView
}
export const ArticleListItemSkeleton = ({ className, view }: ArticleListItemProps) => {
  if (view === ArticleView.BIG) {
    return (
      <div className={clsx(cls.big, className)}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Skeleton width={30} height={30} border="50%" className={cls.avatar} />
            <Skeleton width={150} height={16} className={cls.username} />
            <Skeleton width={150} height={16} className={cls.date} />
          </div>
          <Skeleton width={250} height={24} className={cls.title} />
          <Skeleton width={100} height={16} className={cls.types} />
          <Skeleton height={200} width="100%" className={cls.img} />
          <div className={cls.footer}>
            <Skeleton width={100} height={16} />
            <Skeleton width={30} height={16} className={cls.views} />
          </div>
        </Card>
      </div>
    )
  }
  return (
    <div className={clsx(cls.small, className)}>
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} />
      </Card>
    </div>
  )
}
