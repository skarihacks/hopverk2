'use client';

import { useEffect, useState } from 'react';
import { QuestionsApi } from '@/api';
import { Article, UiState } from '@/types';
import Link from 'next/link';

type Props = {
  tagName: string;
};

export default function TagArticles({ tagName }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');
  const api = new QuestionsApi();

  useEffect(() => {
    async function fetchArticles() {
      setUiState('loading');

      try {
        const response = await api.getArticlesByTag(tagName);
        console.log('Fetched articles:', response); // Check the response format
        if (!response || response.length === 0) {
          setUiState('empty');
          return;
        }

        setArticles(response);
        setUiState('data');
      } catch (error) {
        console.error('Error fetching articles:', error);
        setUiState('error');
      }
    }

    fetchArticles();
  }, [tagName]);

  if (uiState === 'loading') {
    return <p>Loading articles...</p>;
  }

  if (uiState === 'error') {
    return <p>Error loading articles. Please try again later.</p>;
  }

  if (uiState === 'empty') {
    return <p>No articles found for this tag.</p>;
  }

  return (
    <div>
      <h2>Articles for Tag: {tagName}</h2>
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
