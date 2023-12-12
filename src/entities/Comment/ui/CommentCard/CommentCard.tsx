import clsx from 'clsx';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment';

type CommentCardProps = {
  className?: string
  comment?: Comment
  isLoading?: boolean
}
export const CommentCard = ({ className, comment, isLoading }: CommentCardProps) => {
  if (isLoading) {
    return (
      <div className={clsx(cls.CommentCard, cls.loading, className)}>
        <div className={cls.header}>
          <Skeleton className={cls.avatar} width={30} height={30} border="50%" />
          <Skeleton className={cls.title} width={150} height={25} />
        </div>
        <Skeleton className={cls.text} width="100%" height={25} />
      </div>
    )
  }

  return (
    <div className={clsx(cls.CommentCard, className)}>
      <AppLink to={`${RoutePath.profile}${comment?.user.id}`} className={cls.header}>
        {comment?.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
        <Text text={comment?.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment?.text} />
    </div>
  )
}
