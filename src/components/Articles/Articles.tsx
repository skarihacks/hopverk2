'use client';

import { QuestionsApi } from '@/api';
import { Article, UiState } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Articles.module.css';

type Props = {
  title: string;
};

export default function Articles({ title }: Props) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const articlesResponse = await api.getArticles();

      if (!articlesResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setArticles(articlesResponse.slice((page - 1) * 10, page * 10));
      }
    }
    fetchData();
  }, [page]);

  console.log(articles);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={styles.articles}>
      <h2 className={styles.h2}>{title}</h2>

      {uiState === 'loading' && <p>Loading articles...</p>}
      {uiState === 'error' && <p>Error loading articles</p>}
      {uiState === 'data' && (
        <>
          <ul className={styles.ul}>
            {articles?.map((article, index) => (
              <li className={styles.li} key={index}>
                <Link href={`/articles/${article.id}`}>{article.articlename}</Link>
              </li>
            ))}
          </ul>

          <div className={styles.pagination}>
            <button className={styles.button} onClick={handlePrevious} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button className={styles.button} onClick={handleNext}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
