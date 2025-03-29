'use client';

import { useEffect, useState } from 'react';
import { QuestionsApi } from '@/api';
import { Tag, UiState } from '@/types';
import Link from 'next/link';

export default function TagList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');

  useEffect(() => {
    async function fetchTags() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getTags();

      if (!response) {
        setUiState('error');
        return;
      }

      setTags(response);
      setUiState('data');
    }

    fetchTags();
  }, []);

  if (uiState === 'loading') {
    return <p>Loading tags...</p>;
  }

  if (uiState === 'error') {
    return <p>Error loading tags. Please try again later.</p>;
  }

  return (
    <div>
      <h2>All Tags</h2>
      <ul>
      {tags.map((tag) => (
        <li key={tag.name}>
            <Link href={`/browse/tag/${tag.name}`}>{tag.name}</Link>
        </li>
        ))}
      </ul>
    </div>
  );
}
