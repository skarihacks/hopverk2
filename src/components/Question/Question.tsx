import React, { JSX } from 'react';
import { Question as QuestionType } from '../../types';

export function Question({
  question,
}: {
  question: QuestionType;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('submit, valið svar:', answerId);
  };

  return (
    <div>
      <h2>{question.question}</h2>
      <form onSubmit={onSubmit}>
        <ul>
          {question.answers.map((answer) => {
            const isCorrect = answer.correct;
            const isSelected = answerId === answer.id;
            return (
              <li key={answer.id}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={answer.answer}
                    onChange={() => setAnswerId(answer.id)}
                    checked={isSelected}
                  />
                  {answer.answer}
                  {submitted && (
                    <span> — {isCorrect ? 'RÉTT' : 'RANGT'}</span>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
        <button type="submit">Svara</button>
      </form>
    </div>
  );
}
