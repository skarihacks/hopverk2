'use client';

import { useEffect, useState } from 'react';
import { QuestionsApi } from '@/api';
import { Category, UiState } from '@/types';
import Link from 'next/link';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');

  useEffect(() => {
    async function fetchCategories() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getCategories();

      if (!response) {
        setUiState('error');
        return;
      }

      setCategories(response);
      setUiState('data');
    }

    fetchCategories();
  }, []);

  if (uiState === 'loading') {
    return <p>Loading categories...</p>;
  }

  if (uiState === 'error') {
    return <p>Error loading categories. Please try again later.</p>;
  }

  return (
    <div>
      <h2>All Categories</h2>
      <ul>
      {categories.map((category) => (
        <li key={category.id}>
            <Link href={`/browse/category/${category.id}`}>{category.name}</Link>
        </li>
        ))}
      </ul>
    </div>
  );
}
