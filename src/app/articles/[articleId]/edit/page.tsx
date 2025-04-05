'use client';

import { useEffect, useState } from 'react';
import { QuestionsApi } from '@/api';
import { Article } from '@/types';

export default function EditArticleForm({ articleId }: { articleId: number }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = new QuestionsApi();

    async function fetchArticle() {
      const data = await api.getArticleById(articleId);
      setArticle(data);
      setLoading(false);
    }

    fetchArticle();
  }, [articleId]);

  if (loading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <form>
      {/* Render editable fields for article.articlename and article.content */}
      <h2>Editing: {article.articlename}</h2>
      {/* Add editing form here */}
    </form>
  );
}
