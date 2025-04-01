export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';
export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  created: string;
  updated: string;
};

export type Article = {
  id: number;
  articlename: string;
  content: string;
  img?: string;
  date: string;
  userId: number;
  categoryId?: number;
  comments: Comment[];
  tags: Tag[];
  user?: {
    id: number;
    username: string;
  }
};

export interface Comment {
  id: number;
  content: string;
  date: string;
  articleId: number;
  userId?: number;
  article?: {
    id: number;
    articlename: string;
  };
  user?: {
    id: number;
    username: string;
  };
}


export type Category = {
  id: number;
  name: string;
  description?: string;
};

export type Tag = {
  tag: any;
  id: number;
  name: string;
};

export type ArticleTag = {
  articleId: number;
  tagId: number;
};

export type Paginated<T> = {
  items: T[];
  total: number;
};

export type CategoryPayload = {
  name: string;
  description?: string;
}; 

export type QuestionPayload = {
  articlename: string;
  content: string;
  img?: string;
  categoryId?: number;
};

export type CommentPayload = {
  articleId: number;
  content: string;
}

export type Registerpayload = {
  username: string;
  email: string;
  password: string;
}