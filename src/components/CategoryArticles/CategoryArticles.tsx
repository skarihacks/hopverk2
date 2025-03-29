'use client';

import { useEffect, useState } from 'react';
import { QuestionsApi } from '@/api';
import { Article, UiState } from '@/types';
import Link from 'next/link';

type Props = {
  categoryId: number;
};

export default function CategoryArticles({ categoryId }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');
  const api = new QuestionsApi();

  useEffect(() => {
    async function fetchArticles() {
      setUiState('loading');

      const response = await api.getArticleByCategory(categoryId);
      if (!response) {
        setUiState('error');
        return;
      }

      setArticles(response);
      setUiState('data');
    }

    fetchArticles();
  }, [categoryId]);

  if (uiState === 'loading') {
    return <p>Loading articles...</p>;
  }

  if (uiState === 'error') {
    return <p>Error loading articles. Please try again later.</p>;
  }

  return (
    <div>
      <h2>Articles in Category {categoryId}</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.articlename}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
