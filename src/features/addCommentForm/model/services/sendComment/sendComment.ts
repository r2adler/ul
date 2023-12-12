import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { addCommentFormActions } from 'features/addCommentForm/model/slices/addCommentFormSlice';
import { getAddCommentFormText } from '../../../model/selectors/addCommentFormSelectors';

export const sendComment = createAsyncThunk<
  Comment,
  void,
  ThunkConfig<string>
>(
  'addCommentForm/sendComment',
  async (authData, thunkApi) => {
    const {
      extra, rejectWithValue, getState, dispatch,
    } = thunkApi;

    const userData = getUserAuthData(getState())
    const text = getAddCommentFormText(getState())
    const article = getArticleDetailsData(getState())

    if (!userData || !text || !article) {
      return rejectWithValue('no data')
    }

    try {
      const response = await extra.api.post<Comment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text,
      });

      if (!response.data) {
        throw new Error();
      }
      dispatch(addCommentFormActions.setText(''))
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
