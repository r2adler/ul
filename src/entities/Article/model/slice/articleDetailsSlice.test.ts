import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from './articleDetailsSlice';

const data = {
  id: '1',
  title: 'title',
  subtitle: 'subtitle',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 34,
  createdAt: '26.02.2022',
  type: ['IT'],
  blocks: [],
};

describe('articleDetailsSlice.test', () => {
  test('test fetchArticleById pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: false,
    };

    expect(articleDetailsReducer(
      state as ArticleDetailsSchema,
      fetchArticleById.pending,
    )).toEqual({
      isLoading: true,

    });
  });
});
