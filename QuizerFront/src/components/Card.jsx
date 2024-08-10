import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Card = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const activity = queryParams.get('activity');

  useEffect(() => {
    if (category && activity) {
      axios.get('https://quizermern.onrender.com/api/questions', { params: { category, activity } })
        .then(response => {
          if (Array.isArray(response.data)) {
            setQuestions(response.data);
          } else {
            console.error('Unexpected data format:', response.data);
            setQuestions([]);
          }
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [category, activity]);

  const handleAnswerClick = (questionId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (loading) {
    return <div className="p-4">Loading questions...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {submitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your Score: {score} / {questions.length}</h2>
        </div>
      ) : (
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map(question => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
                <div className="mb-4">
                  <p className="font-medium">Options:</p>
                  <div className="flex flex-col">
                    <button
                      className={`p-2 mb-2 rounded ${selectedAnswers[question.id] === question.option1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => handleAnswerClick(question.id, question.option1)}
                    >
                      {question.option1}
                    </button>
                    <button
                      className={`p-2 mb-2 rounded ${selectedAnswers[question.id] === question.option2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => handleAnswerClick(question.id, question.option2)}
                    >
                      {question.option2}
                    </button>
                    <button
                      className={`p-2 mb-2 rounded ${selectedAnswers[question.id] === question.option3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => handleAnswerClick(question.id, question.option3)}
                    >
                      {question.option3}
                    </button>
                    <button
                      className={`p-2 mb-2 rounded ${selectedAnswers[question.id] === question.option4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => handleAnswerClick(question.id, question.option4)}
                    >
                      {question.option4}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white text-2xl py-2 px-6 rounded-lg shadow-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
