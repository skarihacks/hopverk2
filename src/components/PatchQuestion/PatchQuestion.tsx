"use client";

import React, { useState, useEffect } from "react";
import { QuestionsApi } from "@/api";
import { Question } from "@/types";

export default function QuestionUpdater() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(0);
  const [updatedQuestion, setUpdatedQuestion] = useState<string>("");
  const [updatedAnswers, setUpdatedAnswers] = useState<string[]>(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  // Fetch all questions on component mount
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const api = new QuestionsApi();
        const response = await api.getAllQuestions();
        if (Array.isArray(response)) {
          setQuestions(response);
        } else {
          console.error("Error fetching questions:", response);
        }
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  // Handle question selection change
  const handleQuestionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const questionId = Number(e.target.value);
    const selectedQuestion = questions.find((q) => q.id === questionId);
    if (selectedQuestion) {
      setSelectedQuestionId(questionId);
      setUpdatedQuestion(selectedQuestion.question);
      setUpdatedAnswers(selectedQuestion.answers.map((ans) => ans.answer));
      const correctIndex = selectedQuestion.answers.findIndex((ans) => ans.correct);
      setCorrectAnswerIndex(correctIndex);
    }
  };

  // Handle answer change
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...updatedAnswers];
    newAnswers[index] = value;
    setUpdatedAnswers(newAnswers);
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      const api = new QuestionsApi();
      const payload = {
        question: updatedQuestion,
        answers: updatedAnswers.map((answer, index) => ({
          answer,
          correct: index === correctAnswerIndex,
        })),
      };

      const response = await api.updateQuestion(selectedQuestionId, payload);
      if (response) {
        setMessage("Question updated successfully!");
      } else {
        setMessage("Error updating question.");
      }
    } catch (error) {
      console.error("Error updating question:", error);
      setMessage("An error occurred while updating the question.");
    }
  };

  return (
    <div>
      <h2>Breyta spurningu</h2>

      <select onChange={handleQuestionChange} value={selectedQuestionId}>
        <option value={0} disabled>Veldu spurningu</option>
        {questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.question}
          </option>
        ))}
      </select>

      {selectedQuestionId > 0 && (
        <div>
          <label>Question Text:</label>
          <input
            type="text"
            value={updatedQuestion}
            onChange={(e) => setUpdatedQuestion(e.target.value)}
          />

          <h3>Answers:</h3>
          {updatedAnswers.map((answer, index) => (
            <div key={index}>
              <input
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswerIndex === index}
                onChange={() => setCorrectAnswerIndex(index)}
              /> Correct
            </div>
          ))}

          <button onClick={handleSubmit}>Update Question</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
}
