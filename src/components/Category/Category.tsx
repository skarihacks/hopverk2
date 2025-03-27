'use client';

import { QuestionsApi } from '@/api';
import { Question as TQuestion, UiState } from '@/types';
import { JSX, useEffect, useState } from 'react';
import { Question } from '../Question/Question';

export function Category({ slug }: { slug: string }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [questions, setQuestions] = useState<TQuestion[]>([]);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getQuestions(slug);

      if (!response) {
        setUiState('error');
        return;
      }
      console.log('Fetched questions:', response);

      const filteredQuestions = Array.isArray(response)
        ? response.filter((question) => question.category.slug === slug)
        : [];

      if (filteredQuestions.length === 0) {
        setUiState('empty');
      } else {
        setUiState('data');
        setQuestions(filteredQuestions);
      }
    }
    fetchData();
  }, [slug]);

  switch (uiState) {
    case 'loading':
      return <p>Sæki gögn...</p>;
    case 'error':
      return <p>Villa við að sækja gögn</p>;
    case 'empty':
      return <p>Engar spurningar fundust fyrir þennan flokk.</p>;
    case 'data':
      return (
        <div>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      );
    case 'initial':
      return <p>Þú hefur ekki valið flokk</p>;
  }
}
