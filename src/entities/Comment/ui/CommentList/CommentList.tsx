import clsx from 'clsx'
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss'
import { Comment } from '../../model/types/comment'

type CommentListProps = {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}
export const CommentList = ({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={clsx(cls.CommentList, className)}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    )
  }

  return (
    <div className={clsx(cls.CommentList, className)}>
      {comments?.length
        ? comments.map((comment) => <CommentCard comment={comment} isLoading={isLoading} />)
        : <Text text={t('Комментарии отсутствуют')} />}
    </div>
  )
}
