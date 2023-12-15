import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article/model/types/article';

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || ArticleView.BIG;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error
