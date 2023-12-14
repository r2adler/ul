import clsx from 'clsx'
import { Text, TextSize } from 'shared/ui/Text/Text';
import React, { useCallback } from 'react';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss'
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import eyeIcon from '../../../../shared/assets/icons/eye-20-20.svg'

type ArticleListItemProps = {
  className?: string
  article: Article
  view?: ArticleView
}
export const ArticleListItem = ({ className, view, article }: ArticleListItemProps) => {
  const [isHover, bindHover] = useHover()
  const { t } = useTranslation('profile')
  const navigate = useNavigate()

  const onOpenArticle = useCallback(
    () => {
      navigate(RoutePath.article_details + article.id)
    },
    [article.id, navigate],
  )

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks
      .find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock

    return (
      <div className={clsx(cls.big, className)}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text text={article.title} className={cls.title} size={TextSize.L} />
          <Text text={article.type.join(', ')} className={cls.types} />
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && <ArticleTextBlockComponent className={cls.textBlock} block={textBlock} />}
          <div className={cls.footer}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onOpenArticle}>
              {t('Читать далее...')}
            </Button>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={eyeIcon} />
          </div>
        </Card>
      </div>
    )
  }
  return (
    <div className={clsx(cls.small, className)} {...bindHover}>
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text className={cls.date} text={article.createdAt} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(', ')} className={cls.types} />
          <Text text={String(article.views)} className={cls.views} />
          <Icon Svg={eyeIcon} />
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  )
}
