'use client';

import React, { JSX, useState } from 'react';
import { Category } from '@/types';
import { QuestionsApi } from '@/api';

type Props = {
  categories: Category[];
};

export default function NewQuestion({ categories }: Props): JSX.Element {
  const [question, setQuestion] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(Number(categories[0]?.id) || 0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      question,
      categoryId,
      answers: answers.map((answer, index) => ({
        answer,
        correct: index === correctAnswerIndex,
      })),
    };

    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
      const api = new QuestionsApi();
      const response = await api.addQuestion(payload);
      if (response) {
        setMessage('Question added successfully!');
        setQuestion('');
        setAnswers(['', '', '', '']);
        setCorrectAnswerIndex(0);
      } else {
        setMessage('Error adding question');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      setMessage('Error adding question');
    }
  };

  return (
    <div>
      <h2>Bæta við spurningu</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Flokkur:</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <br />

        {answers.map((answer, index) => (
          <div key={index}>
            <label>Answer {index + 1}:</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
            />
            <input
              type="radio"
              name="correctAnswer"
              checked={correctAnswerIndex === index}
              onChange={() => setCorrectAnswerIndex(index)}
            />
            Correct
          </div>
        ))}
        <br />
        <button type="submit">Bæta við</button>
      </form>
    </div>
  );
}
