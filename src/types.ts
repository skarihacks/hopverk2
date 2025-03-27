export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';

export type Category = {
  id: string;
  slug: string;
  title: string;
};

export type Answer = {
  answer: string;
  id: number;
  text: string;
  correct: boolean;
};

export type Question = {
  question: string;
  id: number;
  text: string;
  answers: Answer[];
  category: Category;
};

export type CategoryPayload = {
  title: string;
};

export type QuestionPayload = {
  question: string;
  answers: { answer: string; correct: boolean }[];
};

export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};
