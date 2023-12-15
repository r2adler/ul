import clsx from 'clsx'
import { ArticleView } from 'entities/Article/model/types/article'
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss'
import SmallModeIcon from '../../shared/assets/icons/smallMode.svg'
import BigModeIcon from '../../shared/assets/icons/bigMode.svg'

type ArticleViewSelectorProps = {
  className?: string
  view: ArticleView
  onViewClick: (view: ArticleView) => void
}

const viewTypes = [
  { view: ArticleView.SMALL, icon: SmallModeIcon }, { view: ArticleView.BIG, icon: BigModeIcon },
]
export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
  const { className, onViewClick, view } = props

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView)
  }

  return (
    <div className={clsx(cls.ArticleViewSelector, className)}>
      {viewTypes.map((viewType) => (
        <Button key={viewType.view} onClick={onClick(viewType.view)} theme={ButtonTheme.CLEAR}>
          <Icon Svg={viewType.icon} className={clsx(viewType.view !== view && cls.notSelected)} />
        </Button>
      ))}
    </div>
  )
}
