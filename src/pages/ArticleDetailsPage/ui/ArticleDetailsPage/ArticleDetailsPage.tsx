import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={className}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <div className={className}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
