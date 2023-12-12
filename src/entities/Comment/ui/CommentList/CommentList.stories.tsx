import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
  title: 'entities/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comments: [
    {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'User' },
    },
    {
      id: '2',
      text: 'Comment',
      user: { id: '1', username: 'Petya' },
    },
  ],
};

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
};

export const withoutComments = Template.bind({});
withoutComments.args = {
  comments: [],
};
