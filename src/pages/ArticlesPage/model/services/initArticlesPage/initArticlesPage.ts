import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { getArticlesPageInited } from '../../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../../model/slice/articlesPageSlice';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const inited = getArticlesPageInited(getState())

    if (!inited) {
      const orderFromURL = searchParams.get('order') as SortOrder
      const searchFromURL = searchParams.get('search')
      const sortFromURL = searchParams.get('sort') as ArticleSortField
      const typeFromURL = searchParams.get('type') as ArticleType

      if (orderFromURL) {
        dispatch(articlesPageActions.setOrder(orderFromURL))
      }
      if (searchFromURL) {
        dispatch(articlesPageActions.setSearch(searchFromURL))
      }
      if (sortFromURL) {
        dispatch(articlesPageActions.setSort(sortFromURL))
      }
      if (typeFromURL) {
        dispatch(articlesPageActions.setType(typeFromURL))
      }

      dispatch(articlesPageActions.initState())
      dispatch(fetchArticlesList({}))
    }
  },

)
