'use client';

import { QuestionsApi } from '@/api';
import { Article, Comment, UiState } from '@/types';
import { JSX, useEffect, useState } from 'react';

export function ArticleView({ id }: { id: number }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getArticleById(id);

      if (!response) {
        setUiState('error');
        return;
      }

      setArticle(response);
      setUiState('data');

      const commentsResponse = await api.getComments(id);
      if (commentsResponse) {
        setComments(commentsResponse);
      }
    }

    fetchData();
  }, [id]);

  switch (uiState) {
    case 'loading':
      return <p>Loading article...</p>;
    case 'error':
      return <p>Could not load the article.</p>;
    case 'data':
      if (!article) return <p>No article found.</p>;
      return (
        <div>
          <h1>{article.articlename}</h1>
          <h2>Posted by User {article.userId}</h2>
          {article.img && <img src={article.img} alt={article.articlename} />}
          <p>{article.content}</p>

          <h3>Comments:</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.content}</p>
                  <small>by {comment.userId ? `User ${comment.userId}` : 'Anonymous'}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      );
    case 'initial':
      return <p>Select an article to view details.</p>;
    default:
      return <p>Unexpected</p>
  }
}
