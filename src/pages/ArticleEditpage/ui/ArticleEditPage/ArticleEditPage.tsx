import clsx from 'clsx'
import { Page } from 'widgets/Page/Page'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cls from './ArticleEditPage.module.scss'

type ArticleEditPageProps = {
  className?: string
}
const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation('article-details')
  const { id } = useParams<{id: string}>()
  const isEdit = Boolean(id)

  return (
    <Page className={clsx(cls.ArticleEditPage, className)}>
      {isEdit
        ? t('Редактирование статьи с ID = ') + id
        : t('Создание новой статьи')}
    </Page>
  )
}
export default ArticleEditPage
